import { copies, routePages, routes } from "./content.js";
import { contactForms } from "./form-content.js";
import { operationsCatalog } from "./operations-content.js";
import { applyOperationsState, operationIdFromHash, renderOperationsArchive } from "./operations-workspace.js";

document.documentElement.classList.add("js");
const body = document.body;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const elements = {
    main: document.getElementById("main-content"),
    header: document.querySelector(".main-header"),
    footer: document.querySelector(".main-footer"),
    brandHome: document.getElementById("brand-home"),
    pageHeading: document.getElementById("page-heading"),
    brandTag: document.getElementById("brand-tag"),
    welcomeTitle: document.getElementById("node-welcome"),
    welcomeProse: document.getElementById("prose-text"),
    teleprompter: document.getElementById("teleprompter"),
    narrative: document.getElementById("narrative-content"),
    contactForm: document.getElementById("contact-form"),
    contactButton: document.getElementById("btn-contact"),
    backButton: document.getElementById("btn-back"),
    cancelButton: document.getElementById("btn-cancel-contact"),
    operationsButton: document.getElementById("btn-operations-footer"),
    operationsView: document.getElementById("operations-view"),
    operationsIntro: document.getElementById("operations-intro"),
    cabinet: document.getElementById("cabinet-container"),
    operationLeft: document.getElementById("btn-operation-left"),
    operationProgress: document.getElementById("operation-progress"),
    operationRight: document.getElementById("btn-operation-right"),
    languageContainer: document.getElementById("lang-inline-container"),
    languageToggle: document.getElementById("lang-toggle"),
    languageOptions: document.getElementById("language-options"),
    name: document.getElementById("form-name"),
    email: document.getElementById("form-email"),
    honeypot: document.getElementById("website"),
    intentA: document.getElementById("choice-intent-A"),
    intentB: document.getElementById("choice-intent-B"),
    fieldsA: document.getElementById("form-fields-A"),
    fieldsB: document.getElementById("form-fields-B"),
    dateField: document.getElementById("form-date-field"),
    targetDate: document.getElementById("form-target-date"),
    language: document.getElementById("form-language"),
    formStatus: document.getElementById("form-status"),
    formPrivacy: document.getElementById("form-privacy"),
    formPrivacyLink: document.getElementById("form-privacy-link"),
    legalLink: document.getElementById("legal-link")
};

let currentLang = document.documentElement.lang === "es" ? "es" : "ca";
let preferredLang = currentLang;
let currentPage = routeFromPath(location.pathname) ?? pageFor(currentLang, "home");
let currentIntent = new URLSearchParams(location.search).get("intent") === "B" ? "B" : "A";
let narrativeObserver = null;
let introTimers = [];
let submitting = false;
let languageTransitioning = false;
let operationTransitioning = false;

function normalizePath(path) {
    const normalized = `/${path}`.replace(/\/{2,}/g, "/");
    return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

function pageFor(lang, key) {
    return routePages.find((page) => page.lang === lang && page.key === key);
}

function routeFromPath(path) {
    const normalized = normalizePath(path);
    return routePages.find((page) => routes[page.lang][page.key] === normalized);
}

function routeUrl(lang, key) {
    return routes[lang][key];
}

function setMeta(page) {
    const canonical = `https://emanuelrocha.cat${routeUrl(page.lang, page.key)}`;
    document.title = page.title;
    elements.pageHeading.textContent = page.heading;
    document.documentElement.lang = page.lang;
    document.querySelector('meta[name="description"]').content = page.description;
    document.querySelector('meta[name="robots"]').content = page.index ? "index, follow" : "noindex, follow";
    document.querySelector('link[rel="canonical"]').href = canonical;
    document.querySelector('link[hreflang="ca"]').href = `https://emanuelrocha.cat${routeUrl("ca", page.key)}`;
    document.querySelector('link[hreflang="es"]').href = `https://emanuelrocha.cat${routeUrl("es", page.key)}`;
    document.querySelector('link[hreflang="x-default"]').href = `https://emanuelrocha.cat${routeUrl("ca", page.key)}`;
    document.querySelector('meta[property="og:url"]').content = canonical;
    document.querySelector('meta[property="og:title"]').content = page.title;
    document.querySelector('meta[property="og:description"]').content = page.description;
    document.querySelector('meta[property="og:locale"]').content = page.lang === "ca" ? "ca_ES" : "es_ES";
    document.querySelector('meta[name="twitter:title"]').content = page.title;
    document.querySelector('meta[name="twitter:description"]').content = page.description;
}

function renderCabinet() {
    elements.cabinet.innerHTML = renderOperationsArchive(operationsCatalog[currentLang]);
}

function renderLanguage() {
    const copy = copies[currentLang];
    const form = contactForms[currentLang];
    elements.brandTag.textContent = copy.tag;
    elements.welcomeTitle.textContent = copy.title;
    elements.welcomeProse.innerHTML = copy.proseHTML;
    elements.backButton.textContent = copy.back;
    elements.contactButton.textContent = body.dataset.state === "contact" ? form.common.submit : copy.contact;
    elements.cancelButton.textContent = copy.cancel;
    elements.operationsButton.textContent = copy.btnOperations;
    elements.languageToggle.textContent = copy.langActive;
    elements.brandHome.setAttribute("aria-label", copy.homeAria);
    elements.contactButton.setAttribute(
        "aria-label",
        body.dataset.state === "contact" ? form.common.submit : copy.contactAria
    );
    elements.operationsButton.setAttribute("aria-label", copy.operationsAria);
    elements.languageContainer.setAttribute("aria-label", copy.languageAria);
    document.getElementById("opt-ca").classList.toggle("is-active", currentLang === "ca");
    document.getElementById("opt-es").classList.toggle("is-active", currentLang === "es");

    document.getElementById("form-intent-lead").textContent = form.intentLead;
    document.getElementById("choice-intent-A-label").textContent = form.intentA;
    document.getElementById("choice-intent-B-label").textContent = form.intentB;

    document.getElementById("form-project-label").textContent = form.A.project.label;
    document.getElementById("form-project").placeholder = form.A.project.placeholder;
    document.getElementById("form-starting-point-label").textContent = form.A.startingPoint.label;
    document.getElementById("form-starting-point").placeholder = form.A.startingPoint.placeholder;
    document.getElementById("form-success-A-label").textContent = form.A.success.label;
    document.getElementById("form-success-A").placeholder = form.A.success.placeholder;
    document.getElementById("form-urgency-label").textContent = form.A.urgency.label;
    document.getElementById("urgency-asap-label").textContent = form.A.urgency.asap;
    document.getElementById("urgency-date-label").textContent = form.A.urgency.date;
    document.getElementById("urgency-open-label").textContent = form.A.urgency.open;
    document.getElementById("form-target-date-label").textContent = form.A.urgency.dateLabel;

    document.getElementById("form-situation-label").textContent = form.B.situation.label;
    document.getElementById("form-situation").placeholder = form.B.situation.placeholder;
    document.getElementById("form-attempts-label").innerHTML = `${form.B.attempts.label} <small>(${form.B.attempts.optional})</small>`;
    document.getElementById("form-attempts").placeholder = form.B.attempts.placeholder;
    document.getElementById("form-success-B-label").textContent = form.B.success.label;
    document.getElementById("form-success-B").placeholder = form.B.success.placeholder;

    document.getElementById("form-name-label").textContent = form.common.nameLabel;
    document.getElementById("form-email-label").textContent = form.common.emailLabel;
    elements.name.placeholder = form.common.namePlaceholder;
    elements.email.placeholder = form.common.emailPlaceholder;
    document.getElementById("form-promise").textContent = form.common.promise;
    if (elements.formPrivacy) elements.formPrivacy.firstChild.textContent = `${form.common.privacy} `;
    if (elements.formPrivacyLink) {
        elements.formPrivacyLink.textContent = form.common.privacyLink;
        elements.formPrivacyLink.href = routes[currentLang].legal;
    }
    if (elements.legalLink) elements.legalLink.href = routes[currentLang].legal;
    elements.contactForm.querySelector('[type="submit"]').textContent = form.common.submit;
    elements.language.value = currentLang;

    if (currentPage.key === "A" || currentPage.key === "B") {
        elements.narrative.innerHTML = copy[currentPage.key];
    }
    elements.operationsIntro.textContent = operationsCatalog[currentLang].intro;
    renderCabinet();
    syncOperationsView({ focus: false });
    setIntent(currentIntent, false);
}

function operationsFiles() {
    return operationsCatalog[currentLang].files;
}

function currentOperationId() {
    if (currentPage.key !== "operations") return null;
    return operationIdFromHash(location.hash, operationsFiles());
}

function renderOperationsFooter(activeId) {
    const catalog = operationsCatalog[currentLang];
    const { files, labels } = catalog;
    const index = files.findIndex((file) => file.id === activeId);
    const reading = index >= 0;

    body.dataset.operationMode = reading ? "reading" : "index";
    elements.operationProgress.textContent = reading ? `${String(index + 1).padStart(2, "0")}/${String(files.length).padStart(2, "0")}` : "";
    elements.operationProgress.setAttribute(
        "aria-label",
        reading
            ? labels.progress.replace("{current}", String(index + 1)).replace("{total}", String(files.length))
            : ""
    );

    if (!reading) return;

    const last = index === files.length - 1;
    elements.operationLeft.textContent = last ? labels.previous : labels.archives;
    elements.operationLeft.dataset.action = last ? "operation-previous" : "operation-index";
    elements.operationRight.textContent = last ? labels.contact : labels.next;
    elements.operationRight.dataset.action = last ? "operation-contact" : "operation-next";
}

function syncOperationsView({ focus = false } = {}) {
    const files = operationsFiles();
    const activeId = currentOperationId();
    const result = applyOperationsState({
        root: elements.cabinet,
        intro: elements.operationsIntro,
        files,
        activeId,
        focus: focus && currentPage.key === "operations"
    });
    renderOperationsFooter(activeId);
    return result;
}

async function transitionOperation(nextId, { replace = false, focus = true } = {}) {
    if (operationTransitioning || currentPage.key !== "operations") return;
    const files = operationsFiles();
    const validId = nextId && files.some((file) => file.id === nextId) ? nextId : null;
    if (validId === currentOperationId()) return;

    operationTransitioning = true;
    const currentSurface = elements.cabinet.querySelector(validId ? "[data-operations-index]:not([hidden]), [data-operation-article]:not([hidden])" : "[data-operation-article]:not([hidden])");

    try {
        if (currentSurface && !reducedMotion.matches) {
            currentSurface.classList.add("lang-evaporating");
            await waitForAnimation(currentSurface, 260);
            currentSurface.classList.remove("lang-evaporating");
        }

        const hash = validId ? `#${validId}` : "";
        const target = `${routeUrl(currentLang, "operations")}${hash}`;
        history[replace ? "replaceState" : "pushState"](
            {
                ...history.state,
                key: "operations",
                lang: currentLang,
                intent: currentIntent,
                operationId: validId
            },
            "",
            target
        );

        const next = syncOperationsView({ focus });
        const nextSurface = validId ? next.activeArticle : next.index;
        if (nextSurface && !reducedMotion.matches) {
            nextSurface.classList.add("lang-materializing");
            await waitForAnimation(nextSurface, 520);
            nextSurface.classList.remove("lang-materializing");
        }
    } finally {
        operationTransitioning = false;
        triggerFooterLockout();
    }
}

function activeSectionForState(state) {
    if (["intro", "welcome-center", "welcome-left", "welcome-ready"].includes(state)) return "view-welcome";
    if (state === "narrative") return "teleprompter";
    if (state === "contact") return "view-contact";
    return "operations-view";
}

function syncAccessibility(state) {
    const activeId = activeSectionForState(state);
    document.querySelectorAll("main > section").forEach((section) => {
        const active = section.id === activeId;
        section.inert = !active;
        section.setAttribute("aria-hidden", String(!active));
    });

    const headerAvailable = ["narrative", "contact", "operations"].includes(state);
    elements.header.inert = !headerAvailable;
    elements.header.setAttribute("aria-hidden", String(!headerAvailable));
    elements.footer.inert = state === "intro" || state === "welcome-center" || state === "welcome-left";
    elements.footer.setAttribute("aria-hidden", String(elements.footer.inert));
    closeLanguageMenu(false);
}

function setState(state) {
    body.dataset.state = state;
    syncAccessibility(state);
    elements.operationsButton.hidden = state === "operations" || state === "contact";
    const contactLabel = state === "contact" ? contactForms[currentLang].common.submit : copies[currentLang].contact;
    elements.contactButton.textContent = contactLabel;
    elements.contactButton.setAttribute(
        "aria-label",
        state === "contact" ? contactLabel : copies[currentLang].contactAria
    );
    if (state !== "narrative") disconnectNarrativeObserver();
}

function scheduleIntro() {
    introTimers.forEach(clearTimeout);
    introTimers = [];
    if (reducedMotion.matches) {
        setState("welcome-ready");
        return;
    }
    setState("intro");
    introTimers.push(setTimeout(() => setState("welcome-center"), 2000));
    introTimers.push(setTimeout(() => setState("welcome-left"), 4000));
    introTimers.push(setTimeout(() => setState("welcome-ready"), 5800));
}

function disconnectNarrativeObserver() {
    narrativeObserver?.disconnect();
    narrativeObserver = null;
}

function initNarrativeObserver() {
    disconnectNarrativeObserver();
    const paragraphs = elements.narrative.querySelectorAll(".scrolling-p, .image-box");
    paragraphs.forEach((element) => element.classList.remove("is-reading"));
    paragraphs[0]?.classList.add("is-reading");
    narrativeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("is-reading", entry.isIntersecting));
    }, { root: elements.teleprompter, rootMargin: "-42% 0px -42% 0px", threshold: 0.05 });
    paragraphs.forEach((element) => narrativeObserver.observe(element));
}

function renderPage(page, { focus = false } = {}) {
    introTimers.forEach(clearTimeout);
    currentPage = page;
    currentLang = page.lang;
    body.dataset.routeKey = page.key;
    setMeta(page);
    renderLanguage();

    if (page.state === "narrative") {
        setState("narrative");
        elements.teleprompter.scrollTop = 0;
        requestAnimationFrame(initNarrativeObserver);
    } else if (page.state === "contact") {
        setState("contact");
    } else if (page.state === "operations") {
        setState("operations");
        syncOperationsView({ focus });
    } else if (body.dataset.initialized === "true") {
        setState("welcome-ready");
    } else {
        scheduleIntro();
    }

    body.dataset.initialized = "true";
    if (focus) {
        requestAnimationFrame(() => {
            if (page.state === "contact") {
                const activeIntent = currentIntent === "A" ? elements.intentA : elements.intentB;
                activeIntent.focus({ preventScroll: true });
            }
            else if (page.state === "operations" && currentOperationId()) return;
            else elements.main.focus({ preventScroll: true });
        });
    }
}

function navigate(key, { lang = currentLang, intent = currentIntent, replace = false, focus = true, hash = "" } = {}) {
    const page = pageFor(lang, key);
    if (!page) return;
    const query = key === "contact" ? `?intent=${intent}` : "";
    const target = `${routeUrl(lang, key)}${query}${hash}`;
    const state = { key, lang, intent, from: `${location.pathname}${location.search}${location.hash}` };
    history[replace ? "replaceState" : "pushState"](state, "", target);
    currentIntent = intent;
    renderPage(page, { focus });
}

function setIntent(intent, animate = true) {
    currentIntent = intent === "B" ? "B" : "A";
    if (animate && currentPage.key === "contact") {
        history.replaceState(
            { ...history.state, key: "contact", lang: currentLang, intent: currentIntent },
            "",
            `${routeUrl(currentLang, "contact")}?intent=${currentIntent}`
        );
    }
    elements.intentA.checked = currentIntent === "A";
    elements.intentB.checked = currentIntent === "B";

    const activePanel = currentIntent === "A" ? elements.fieldsA : elements.fieldsB;
    const inactivePanel = currentIntent === "A" ? elements.fieldsB : elements.fieldsA;
    inactivePanel.hidden = true;
    inactivePanel.querySelectorAll("input, textarea, select").forEach((control) => {
        control.disabled = true;
        markInvalid(control, false);
    });
    activePanel.hidden = false;
    activePanel.querySelectorAll("input, textarea, select").forEach((control) => { control.disabled = false; });
    updateDateField();

    if (animate && !reducedMotion.matches) {
        activePanel.classList.remove("form-panel-enter");
        requestAnimationFrame(() => activePanel.classList.add("form-panel-enter"));
    }
}

function updateDateField() {
    elements.contactForm.querySelectorAll('input[name="urgency"]').forEach((control) => markInvalid(control, false));
    const urgency = elements.contactForm.querySelector('input[name="urgency"]:checked')?.value;
    const showDate = currentIntent === "A" && urgency === "date";
    elements.dateField.hidden = !showDate;
    elements.targetDate.disabled = !showDate;
    elements.targetDate.required = showDate;
    if (!showDate) markInvalid(elements.targetDate, false);
}

function goBack() {
    const fallback = routeUrl(currentLang, "home");
    if (history.state?.from?.startsWith("/")) history.back();
    else {
        history.replaceState({}, "", fallback);
        renderPage(pageFor(currentLang, "home"), { focus: true });
    }
}

function openLanguageMenu() {
    elements.languageContainer.classList.add("is-open");
    elements.languageToggle.setAttribute("aria-expanded", "true");
    elements.languageOptions.setAttribute("aria-hidden", "false");
    elements.languageOptions.querySelectorAll("button").forEach((button) => { button.tabIndex = 0; });
    elements.languageOptions.querySelector(`[data-lang="${currentLang}"]`)?.focus();
}

function closeLanguageMenu(returnFocus = false) {
    elements.languageContainer.classList.remove("is-open");
    elements.languageToggle.setAttribute("aria-expanded", "false");
    elements.languageOptions.setAttribute("aria-hidden", "true");
    elements.languageOptions.querySelectorAll("button").forEach((button) => { button.tabIndex = -1; });
    if (returnFocus) elements.languageToggle.focus();
}

function toggleLanguageMenu() {
    if (elements.languageContainer.classList.contains("is-open")) closeLanguageMenu(true);
    else openLanguageMenu();
}

function triggerFooterLockout() {
    elements.footer.classList.add("footer-resting");
    setTimeout(() => elements.footer.classList.remove("footer-resting"), 400);
}

function waitForAnimation(element, fallbackMs) {
    return new Promise((resolve) => {
        let settled = false;
        const finish = () => {
            if (settled) return;
            settled = true;
            element.removeEventListener("animationend", finish);
            clearTimeout(fallback);
            resolve();
        };
        const fallback = setTimeout(finish, fallbackMs);
        element.addEventListener("animationend", finish, { once: true });
    });
}

async function switchLanguage(lang) {
    if (languageTransitioning) return;
    if (lang === currentLang) {
        closeLanguageMenu(true);
        return;
    }

    const targets = [
        elements.brandTag,
        elements.welcomeProse,
        elements.backButton,
        elements.contactButton,
        elements.welcomeTitle,
        elements.cancelButton,
        elements.contactForm,
        elements.operationsIntro,
        elements.cabinet,
        elements.languageToggle,
        elements.operationsButton,
        elements.narrative
    ];

    preferredLang = lang;
    languageTransitioning = true;
    closeLanguageMenu(false);
    targets.forEach((element) => {
        element.classList.remove("lang-materializing");
        element.classList.add("lang-evaporating");
    });

    try {
        await waitForAnimation(elements.brandTag, 260);
        navigate(currentPage.key, {
            lang,
            intent: currentIntent,
            replace: true,
            focus: false,
            hash: currentPage.key === "operations" ? location.hash : ""
        });
        targets.forEach((element) => {
            element.classList.remove("lang-evaporating");
            element.classList.add("lang-materializing");
        });

        await waitForAnimation(elements.brandTag, 520);
    } finally {
        targets.forEach((element) => {
            element.classList.remove("lang-evaporating");
            element.classList.remove("lang-materializing");
        });
        languageTransitioning = false;
        triggerFooterLockout();
    }
}

function markInvalid(input, invalid) {
    input.classList.toggle("input-error", invalid);
    input.setAttribute("aria-invalid", String(invalid));
}

async function submitContact() {
    if (submitting) return;
    const controls = [...elements.contactForm.elements].filter((control) => !control.disabled && control.willValidate);
    controls.forEach((control) => {
        if (control.required && (control instanceof HTMLTextAreaElement || control.type === "text")) {
            control.setCustomValidity(control.value.trim() ? "" : contactForms[currentLang].validationError);
        }
    });
    const invalidControls = controls.filter((control) => !control.validity.valid);
    controls.forEach((control) => markInvalid(control, invalidControls.includes(control)));

    if (invalidControls.length) {
        elements.formStatus.dataset.kind = "error";
        elements.formStatus.textContent = contactForms[currentLang].validationError;
        invalidControls[0].focus();
        return;
    }

    const data = new FormData(elements.contactForm);
    const details = currentIntent === "A"
        ? {
            project: String(data.get("project") ?? "").trim(),
            startingPoint: String(data.get("startingPoint") ?? "").trim(),
            success: String(data.get("successA") ?? "").trim(),
            urgency: String(data.get("urgency") ?? ""),
            targetDate: String(data.get("targetDate") ?? "")
        }
        : {
            situation: String(data.get("situation") ?? "").trim(),
            attempts: String(data.get("attempts") ?? "").trim(),
            success: String(data.get("successB") ?? "").trim()
        };

    submitting = true;
    elements.contactButton.disabled = true;
    elements.contactButton.textContent = contactForms[currentLang].common.sending;
    elements.formStatus.textContent = "";
    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: elements.name.value.trim(),
                email: elements.email.value.trim(),
                intent: currentIntent,
                language: currentLang,
                details,
                website: elements.honeypot.value,
                sourceUrl: location.href
            })
        });
        if (!response.ok) throw new Error("contact_request_failed");
        const submittedIntent = currentIntent;
        elements.contactForm.reset();
        setIntent(submittedIntent, false);
        elements.contactForm.querySelectorAll("textarea").forEach(resizeTextarea);
        elements.formStatus.dataset.kind = "success";
        elements.formStatus.textContent = `${contactForms[currentLang].successTitle} ${contactForms[currentLang].successText}`;
    } catch {
        elements.formStatus.dataset.kind = "error";
        elements.formStatus.textContent = contactForms[currentLang].networkError;
    } finally {
        submitting = false;
        elements.contactButton.disabled = false;
        elements.contactButton.textContent = contactForms[currentLang].common.submit;
    }
}

function resizeTextarea(textarea) {
    if (!(textarea instanceof HTMLTextAreaElement)) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
}

document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) {
        if (!elements.languageContainer.contains(event.target)) closeLanguageMenu(false);
        return;
    }
    const { action, intent, lang } = target.dataset;
    if (action === "operation-open") {
        event.preventDefault();
        transitionOperation(target.dataset.operationId);
    }
    if (action === "operation-index") transitionOperation(null);
    if (action === "operation-next") {
        const files = operationsFiles();
        const index = files.findIndex((file) => file.id === currentOperationId());
        if (index >= 0 && index < files.length - 1) transitionOperation(files[index + 1].id);
    }
    if (action === "operation-previous") {
        const files = operationsFiles();
        const index = files.findIndex((file) => file.id === currentOperationId());
        if (index > 0) transitionOperation(files[index - 1].id);
    }
    if (action === "operation-contact") navigate("contact", { intent: currentIntent });
    if (action === "narrative") navigate(intent, { intent });
    if (action === "contact-from-narrative") navigate("contact", { intent });
    if (action === "intent") setIntent(intent);
    if (action === "contact") {
        if (body.dataset.state === "contact") submitContact();
        else navigate("contact", { intent: currentIntent });
    }
    if (action === "operations") navigate("operations");
    if (action === "back" || action === "cancel") goBack();
    if (action === "language-menu") toggleLanguageMenu();
    if (action === "language") {
        switchLanguage(lang);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.languageContainer.classList.contains("is-open")) closeLanguageMenu(true);
});

elements.brandHome.addEventListener("click", () => navigate("home"));
elements.contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitContact();
});
elements.contactForm.addEventListener("change", (event) => {
    if (event.target.name === "intent") setIntent(event.target.value);
    if (event.target.name === "urgency") updateDateField();
});
elements.contactForm.addEventListener("input", (event) => {
    const control = event.target;
    if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
        control.setCustomValidity("");
        markInvalid(control, false);
    }
    resizeTextarea(control);
});

window.addEventListener("popstate", () => {
    let page = routeFromPath(location.pathname) ?? pageFor(preferredLang, "home");
    currentIntent = new URLSearchParams(location.search).get("intent") === "B" ? "B" : "A";
    if (page.lang !== preferredLang) {
        page = pageFor(preferredLang, page.key) ?? pageFor(preferredLang, "home");
        const query = page.key === "contact" ? `?intent=${currentIntent}` : "";
        const hash = page.key === "operations" ? location.hash : "";
        history.replaceState(
            { key: page.key, lang: preferredLang, intent: currentIntent },
            "",
            `${routeUrl(preferredLang, page.key)}${query}${hash}`
        );
    }
    renderPage(page, { focus: true });
});

window.addEventListener("hashchange", () => {
    if (currentPage.key === "operations") syncOperationsView({ focus: true });
});

reducedMotion.addEventListener("change", () => {
    if (currentPage.key === "home") setState("welcome-ready");
    if (currentPage.state === "narrative") initNarrativeObserver();
});

const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
elements.targetDate.min = today.toISOString().slice(0, 10);
elements.contactForm.querySelectorAll("textarea").forEach(resizeTextarea);

history.replaceState(
    { key: currentPage.key, lang: currentPage.lang, intent: currentIntent, operationId: currentOperationId() },
    "",
    `${location.pathname}${location.search}${location.hash}`
);
renderPage(currentPage);
