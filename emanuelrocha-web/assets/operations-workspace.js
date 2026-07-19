const VALID_OPERATION_ID = /^op-0[1-6]$/;

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function renderSequence(items, variant) {
    return `
        <ol class="evidence-sequence evidence-sequence--${variant}">
            ${items.map((item, index) => `
                <li class="evidence-step">
                    <span class="evidence-step-num">${String(index + 1).padStart(2, "0")}</span>
                    <span class="evidence-step-copy">
                        <strong>${escapeHtml(item.label)}</strong>
                        <span>${escapeHtml(item.detail)}</span>
                    </span>
                </li>
            `).join("")}
        </ol>
    `;
}

function renderEvidence(file, labels) {
    const evidence = file.evidence ?? {};

    if (file.evidenceType === "reframe-matrix") {
        return `
            <div class="evidence-reframe">
                ${(evidence.rows ?? []).map((row) => `
                    <div class="evidence-reframe-row">
                        <p>${escapeHtml(row.from)}</p>
                        <span class="evidence-arrow" aria-hidden="true">→</span>
                        <p>${escapeHtml(row.to)}</p>
                    </div>
                `).join("")}
            </div>
        `;
    }

    if (file.evidenceType === "research-trail" || file.evidenceType === "workflow" || file.evidenceType === "journey-map") {
        return renderSequence(evidence.steps ?? [], file.evidenceType);
    }

    if (file.evidenceType === "scenario-comparison") {
        return `
            <div class="evidence-scenarios">
                ${(evidence.scenarios ?? []).map((scenario) => `
                    <section class="evidence-scenario${scenario.selected ? " is-selected" : ""}">
                        <div class="evidence-scenario-heading">
                            <h5>${escapeHtml(scenario.label)}</h5>
                            ${scenario.selected ? `<span>${escapeHtml(labels.selected)}</span>` : ""}
                        </div>
                        <p>${escapeHtml(scenario.detail)}</p>
                    </section>
                `).join("")}
            </div>
        `;
    }

    if (file.evidenceType === "claim-boundary") {
        const renderClaims = (title, claims, modifier) => `
            <section class="evidence-claims evidence-claims--${modifier}">
                <h5>${escapeHtml(title)}</h5>
                <ul>${claims.map((claim) => `<li>${escapeHtml(claim)}</li>`).join("")}</ul>
            </section>
        `;
        return `
            <div class="evidence-boundary">
                ${renderClaims(labels.can, evidence.can ?? [], "can")}
                ${renderClaims(labels.cannot, evidence.cannot ?? [], "cannot")}
            </div>
        `;
    }

    return "";
}

function renderOperationArticle(file, labels) {
    return `
        <article class="operation-article" id="${escapeHtml(file.id)}" data-operation-article="${escapeHtml(file.id)}" tabindex="-1">
            <header class="operation-article-header">
                <p class="operation-kicker"><span>${escapeHtml(file.num)}/</span> ${escapeHtml(file.status)}</p>
                <h3 id="${escapeHtml(file.id)}-title" tabindex="-1">${escapeHtml(file.title)}</h3>
            </header>

            <section class="operation-section operation-thesis" aria-labelledby="${escapeHtml(file.id)}-thesis-label">
                <h4 id="${escapeHtml(file.id)}-thesis-label">${escapeHtml(labels.thesis)}</h4>
                <p>${escapeHtml(file.thesis)}</p>
            </section>

            <p class="operation-explanation">${escapeHtml(file.explanation)}</p>

            <section class="operation-section operation-evidence" aria-labelledby="${escapeHtml(file.id)}-proof-label">
                <div class="operation-section-heading">
                    <h4 id="${escapeHtml(file.id)}-proof-label">${escapeHtml(labels.proof)}</h4>
                    <p>${escapeHtml(file.evidenceLabel)}</p>
                </div>
                ${renderEvidence(file, labels)}
            </section>

            <aside class="operation-section operation-limit" aria-labelledby="${escapeHtml(file.id)}-limit-label">
                <h4 id="${escapeHtml(file.id)}-limit-label">${escapeHtml(labels.limit)}</h4>
                <p>${escapeHtml(file.limit)}</p>
            </aside>
        </article>
    `;
}

export function renderOperationsArchive(catalog) {
    const { files, labels } = catalog;
    return `
        <div class="operations-index" data-operations-index>
            <h3 class="visually-hidden">${escapeHtml(labels.index)}</h3>
            <ol class="operations-file-list">
                ${files.map((file) => `
                    <li class="operation-file-row">
                        <a class="operation-file-link" href="#${escapeHtml(file.id)}" data-action="operation-open" data-operation-id="${escapeHtml(file.id)}">
                            <span class="operation-file-num">${escapeHtml(file.num)}/</span>
                            <span class="operation-file-copy">
                                <strong>${escapeHtml(file.title)}</strong>
                                <span>${escapeHtml(file.thesis)}</span>
                            </span>
                            <span class="operation-file-status">${escapeHtml(file.status)}</span>
                            <span class="visually-hidden"> — ${escapeHtml(labels.open)}</span>
                        </a>
                    </li>
                `).join("")}
            </ol>
        </div>
        <div class="operations-reading" data-operations-reading>
            ${files.map((file) => renderOperationArticle(file, labels)).join("")}
        </div>
    `;
}

export function operationIdFromHash(hash, files) {
    const id = String(hash ?? "").replace(/^#/, "").toLowerCase();
    if (!VALID_OPERATION_ID.test(id)) return null;
    return files.some((file) => file.id === id) ? id : null;
}

export function applyOperationsState({ root, intro, files, activeId, focus = false }) {
    const index = root.querySelector("[data-operations-index]");
    const reading = root.querySelector("[data-operations-reading]");
    const articles = [...root.querySelectorAll("[data-operation-article]")];
    const links = [...root.querySelectorAll("[data-operation-id]")];
    const activeArticle = activeId ? root.querySelector(`[data-operation-article="${activeId}"]`) : null;
    const readingMode = Boolean(activeArticle);

    root.dataset.operationMode = readingMode ? "reading" : "index";
    intro.hidden = readingMode;
    index.hidden = readingMode;
    reading.hidden = !readingMode;

    articles.forEach((article) => {
        article.hidden = article !== activeArticle;
        article.setAttribute("aria-hidden", String(article !== activeArticle));
    });

    links.forEach((link) => {
        const active = link.dataset.operationId === activeId;
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });

    root.closest(".view-operations")?.scrollTo({ top: 0, behavior: "auto" });

    if (focus) {
        requestAnimationFrame(() => {
            if (activeArticle) activeArticle.querySelector("h3")?.focus({ preventScroll: true });
            else index.querySelector("a")?.focus({ preventScroll: true });
        });
    }

    return { activeArticle, index, reading, readingMode };
}

export function validateOperationsCatalog(catalog) {
    const errors = [];
    const expectedTypes = [
        "reframe-matrix",
        "research-trail",
        "scenario-comparison",
        "workflow",
        "claim-boundary",
        "journey-map"
    ];

    if (!catalog || !Array.isArray(catalog.files)) return ["El catálogo no contiene un array files."];
    if (catalog.files.length !== 6) errors.push("El archivador debe contener exactamente seis archivos.");

    catalog.files.forEach((file, index) => {
        const expectedId = `op-${String(index + 1).padStart(2, "0")}`;
        if (file.id !== expectedId) errors.push(`El archivo ${index + 1} debe usar el id ${expectedId}.`);
        if (file.evidenceType !== expectedTypes[index]) errors.push(`${expectedId} debe usar ${expectedTypes[index]}.`);
        ["title", "status", "thesis", "explanation", "evidenceLabel", "limit"].forEach((field) => {
            if (!String(file[field] ?? "").trim()) errors.push(`${expectedId} no contiene ${field}.`);
        });
    });

    return errors;
}
