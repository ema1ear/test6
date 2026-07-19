const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 8_192;
const RESEND_TIMEOUT_MS = 10_000;
const attempts = new Map();
let lastAttemptsCleanup = 0;

function json(data, status = 200) {
    return Response.json(data, {
        status,
        headers: {
            "Cache-Control": "no-store",
            "Content-Security-Policy": "default-src 'none'"
        }
    });
}

function clean(value, maxLength) {
    return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function htmlValue(value) {
    return escapeHtml(value).replaceAll("\n", "<br>");
}

function isRateLimited(request) {
    const forwarded = request.headers.get("cf-connecting-ip")
        ?? request.headers.get("x-forwarded-for")
        ?? "unknown";
    const ip = forwarded.split(",")[0].trim();
    const now = Date.now();

    if (now - lastAttemptsCleanup >= WINDOW_MS) {
        attempts.forEach((timestamps, key) => {
            if (!timestamps.some((timestamp) => now - timestamp < WINDOW_MS)) attempts.delete(key);
        });
        lastAttemptsCleanup = now;
    }

    const recent = (attempts.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
    recent.push(now);
    attempts.set(ip, recent);
    return recent.length > MAX_REQUESTS;
}

export async function handleContact(request, env = {}) {
    if (!request.headers.get("content-type")?.includes("application/json")) {
        return json({ ok: false, error: "unsupported_media_type" }, 415);
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413);
    if (isRateLimited(request)) return json({ ok: false, error: "too_many_requests" }, 429);

    let payload;
    try {
        const rawBody = await request.text();
        if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
            return json({ ok: false, error: "payload_too_large" }, 413);
        }
        payload = JSON.parse(rawBody);
    } catch {
        return json({ ok: false, error: "invalid_json" }, 400);
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return json({ ok: false, error: "invalid_json" }, 400);
    }

    const website = clean(payload.website, 200);
    if (website) return json({ ok: true }, 200);

    const name = clean(payload.name, 100);
    const email = clean(payload.email, 254).toLowerCase();
    const intent = payload.intent === "B" ? "B" : "A";
    const language = payload.language === "es" ? "es" : "ca";
    const sourceUrl = clean(payload.sourceUrl, 500);
    const rawDetails = payload.details && typeof payload.details === "object" ? payload.details : {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !emailPattern.test(email)) {
        return json({ ok: false, error: "invalid_fields" }, 400);
    }

    let details;
    if (intent === "A") {
        const project = clean(rawDetails.project, 1500);
        const startingPoint = clean(rawDetails.startingPoint, 1500);
        const success = clean(rawDetails.success, 1500);
        const urgency = ["asap", "date", "open"].includes(rawDetails.urgency) ? rawDetails.urgency : "";
        const targetDate = clean(rawDetails.targetDate, 10);
        const parsedDate = new Date(`${targetDate}T00:00:00.000Z`);
        const today = new Date().toISOString().slice(0, 10);
        const validDate = /^\d{4}-\d{2}-\d{2}$/.test(targetDate)
            && !Number.isNaN(parsedDate.getTime())
            && parsedDate.toISOString().slice(0, 10) === targetDate
            && targetDate >= today;

        if (!project || !startingPoint || !success || !urgency || (urgency === "date" && !validDate)) {
            return json({ ok: false, error: "invalid_details" }, 400);
        }
        details = { project, startingPoint, success, urgency, targetDate: urgency === "date" ? targetDate : "" };
    } else {
        const situation = clean(rawDetails.situation, 1500);
        const priorAttempts = clean(rawDetails.attempts, 1500);
        const success = clean(rawDetails.success, 1500);
        if (!situation || !success) return json({ ok: false, error: "invalid_details" }, 400);
        details = { situation, attempts: priorAttempts, success };
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("RESEND_API_KEY is not configured");
        return json({ ok: false, error: "service_unavailable" }, 503);
    }

    const to = env.CONTACT_TO_EMAIL ?? "hola@emanuelrocha.cat";
    const from = env.CONTACT_FROM_EMAIL ?? "Web Emanuel Rocha <web@emanuelrocha.cat>";
    const intentLabel = intent === "A" ? "Pasar a la acción" : "Entender qué debería cambiar";
    const urgencyLabels = {
        asap: "Cuanto antes",
        date: "Antes de una fecha",
        open: "Sin una fecha cerrada"
    };
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSource = escapeHtml(sourceUrl || "No indicada");
    const detailRows = intent === "A"
        ? [
            ["Quiere poner en marcha", details.project],
            ["Parte de", details.startingPoint],
            ["Habrá funcionado cuando", details.success],
            ["Plazo", urgencyLabels[details.urgency]],
            ...(details.targetDate ? [["Fecha límite", details.targetDate]] : [])
        ]
        : [
            ["Lo que está ocurriendo", details.situation],
            ["Hasta ahora ha intentado", details.attempts || "No indicado"],
            ["Considerará que ha cambiado cuando", details.success]
        ];
    const detailText = detailRows.map(([label, value]) => `${label}: ${value}`).join("\n\n");
    const detailHtml = detailRows
        .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br>${htmlValue(value)}</p>`)
        .join("");

    let resendResponse;
    try {
        resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from,
                to: [to],
                reply_to: email,
                subject: `Nuevo contacto web — ${intentLabel}`,
                text: `Nombre: ${name}\nCorreo: ${email}\nIntención: ${intentLabel}\nIdioma: ${language}\nOrigen: ${sourceUrl || "No indicado"}\n\n${detailText}`,
                html: `<h1>Nuevo contacto web</h1><p><strong>Nombre:</strong> ${safeName}</p><p><strong>Correo:</strong> ${safeEmail}</p><p><strong>Intención:</strong> ${escapeHtml(intentLabel)}</p><p><strong>Idioma:</strong> ${language}</p><p><strong>Origen:</strong> ${safeSource}</p><hr>${detailHtml}`
            }),
            signal: AbortSignal.timeout(RESEND_TIMEOUT_MS)
        });
    } catch (error) {
        console.error("Resend request failed", error instanceof Error ? error.name : "network_error");
        return json({ ok: false, error: "delivery_failed" }, 502);
    }

    if (!resendResponse.ok) {
        console.error("Resend request failed", resendResponse.status, await resendResponse.text());
        return json({ ok: false, error: "delivery_failed" }, 502);
    }

    return json({ ok: true }, 200);
}
