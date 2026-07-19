import assert from "node:assert/strict";
import { contactForms } from "../assets/form-content.js";
import { POST } from "../api/contact.js";
import { onRequestPost } from "../functions/api/contact.js";

for (const [lang, form] of Object.entries(contactForms)) {
    assert.ok(form.intentLead, `${lang}: falta intentLead`);
    assert.ok(form.A.project.label && form.A.startingPoint.label && form.A.success.label);
    assert.ok(form.B.situation.label && form.B.attempts.label && form.B.success.label);
    assert.ok(form.common.nameLabel && form.common.emailLabel && form.common.promise);
    assert.ok(form.common.privacy && form.common.privacyLink);
}

process.env.RESEND_API_KEY = "test-key";
process.env.CONTACT_TO_EMAIL = "hola@emanuelrocha.cat";
process.env.CONTACT_FROM_EMAIL = "Web Emanuel Rocha <web@emanuelrocha.cat>";

const sent = [];
let nextFetchError = null;
globalThis.fetch = async (_url, options) => {
    if (nextFetchError) {
        const error = nextFetchError;
        nextFetchError = null;
        throw error;
    }
    sent.push(JSON.parse(options.body));
    return new Response(null, { status: 200 });
};

const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

function request(payload, ip) {
    return new Request("https://emanuelrocha.cat/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": ip },
        body: JSON.stringify({
            name: "Emanuel",
            email: "test@example.com",
            language: "es",
            website: "",
            sourceUrl: "https://emanuelrocha.cat/es/contacto/",
            ...payload
        })
    });
}

const actionResponse = await POST(request({
    intent: "A",
    details: {
        project: "Una nueva página de servicio",
        startingPoint: "Existe una web anterior",
        success: "La propuesta se entiende",
        urgency: "date",
        targetDate: futureDate
    }
}, "198.51.100.1"));
assert.equal(actionResponse.status, 200);
assert.match(sent.at(-1).text, new RegExp(`Fecha límite: ${futureDate}`));

const narrativeResponse = await POST(request({
    intent: "B",
    details: {
        situation: "La comunicación ya no representa al negocio",
        attempts: "Se modificó el inicio",
        success: "El equipo comparte un criterio"
    }
}, "198.51.100.2"));
assert.equal(narrativeResponse.status, 200);
assert.match(sent.at(-1).text, /Entender qué debería cambiar/);

const cloudflareResponse = await onRequestPost({
    request: request({
        intent: "B",
        details: {
            situation: "La función se ejecuta en Cloudflare",
            attempts: "Adaptador compartido",
            success: "El correo se entrega"
        }
    }, "198.51.100.20"),
    env: {
        RESEND_API_KEY: "cloudflare-test-key",
        CONTACT_TO_EMAIL: "hola@emanuelrocha.cat",
        CONTACT_FROM_EMAIL: "Web Emanuel Rocha <web@emanuelrocha.cat>"
    }
});
assert.equal(cloudflareResponse.status, 200);
assert.match(sent.at(-1).text, /La función se ejecuta en Cloudflare/);

const missingDate = await POST(request({
    intent: "A",
    details: {
        project: "Proyecto",
        startingPoint: "Punto de partida",
        success: "Resultado",
        urgency: "date",
        targetDate: ""
    }
}, "198.51.100.3"));
assert.equal(missingDate.status, 400);

const pastDate = await POST(request({
    intent: "A",
    details: {
        project: "Proyecto",
        startingPoint: "Punto de partida",
        success: "Resultado",
        urgency: "date",
        targetDate: "2000-01-01"
    }
}, "198.51.100.4"));
assert.equal(pastDate.status, 400);

const nullPayload = await POST(new Request("https://emanuelrocha.cat/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.5" },
    body: "null"
}));
assert.equal(nullPayload.status, 400);

nextFetchError = new TypeError("network unavailable");
const originalConsoleError = console.error;
let loggedNetworkFailure = "";
console.error = (...values) => { loggedNetworkFailure = values.join(" "); };
const networkFailure = await POST(request({
    intent: "B",
    details: {
        situation: "Situación válida",
        attempts: "",
        success: "Resultado válido"
    }
}, "198.51.100.6"));
console.error = originalConsoleError;
assert.equal(networkFailure.status, 502);
assert.match(loggedNetworkFailure, /Resend request failed/);

assert.equal(contactForms.ca.common.submit, "Enviar");
assert.equal(contactForms.es.common.submit, "Enviar");

console.log("Contact form checks passed.");
