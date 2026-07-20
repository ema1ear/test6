import { copies, routePages, routes } from "./content.js";
import { contactForms } from "./form-content.js";
import { operationsCatalog } from "./operations-content.js";
import {
    applyOperationsState,
    operationHistoryAction,
    operationIdFromHash,
    renderOperationsArchive
} from "./operations-workspace.js";

document.documentElement.classList.add("js");
const body = document.body;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const INTRO_NAME_MS = 2000;
const INTRO_WELCOME_MS = 2000;
const INTRO_MOVE_MS = 1800;
const INTRO_TOTAL_MS = INTRO_NAME_MS + INTRO_WELCOME_MS + INTRO_MOVE_MS;
const FOCUS_TRAVEL_PX = 104;
const elements = {
    main: document.getElementById("main-content"),
    header: document.querySelector(".main-header"),
    footer: document.querySelector(".main-footer"),
    brandHome: document.getElementById("brand-home"),
    pageHeading: document.getElementById("page-heading"),
    brandTag: document.getElementById("brand-tag"),
    welcomeTitle: document.getElementById("node-welcome"),
    welcomeProse: document.getElementById("prose-text"),
    focusCompanion: document.getElementById("focus-companion"),
    focusTicks: document.getElementById("focus-ticks"),
    teleprompter: document.getElementById("teleprompter"),
    narrative: document.getElementById("narrative-content"),
    contactForm: document.getElementById("contact-form"),
    contactButton: document.getElementById("btn-contact"),
    backButton: document.getElementById("btn-back"),
    cancelButton: document.getElementById("btn-cancel-contact"),
    formPrevious: document.getElementById("btn-form-previous"),
    formProgress: document.getElementById("form-progress"),
    formNext: document.getElementById("btn-form-next"),
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
let currentFormStep = 0;
let narrativeObserver = null;
let narrativeFrame = null;
let introTimers = [];
let introRunning = false;
let focusPulseTimer = null;
let focusSignature = "";
let focusTicksSignature = "";
let operationIndexFrame = null;
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
    elements.formPrevious.textContent = form.common.previous;
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
    document.getElementById("form-project-hint").textContent = form.A.project.placeholder;
    document.getElementById("form-starting-point-label").textContent = form.A.startingPoint.label;
    document.getElementById("form-starting-point-hint").textContent = form.A.startingPoint.placeholder;
    document.getElementById("form-success-A-label").textContent = form.A.success.label;
    document.getElementById("form-success-A-hint").textContent = form.A.success.placeholder;
    document.getElementById("form-urgency-label").textContent = form.A.urgency.label;
    document.getElementById("urgency-asap-label").textContent = form.A.urgency.asap;
    document.getElementById("urgency-date-label").textContent = form.A.urgency.date;
    document.getElementById("urgency-open-label").textContent = form.A.urgency.open;
    document.getElementById("form-target-date-label").textContent = form.A.urgency.dateLabel;

    document.getElementById("form-situation-label").textContent = form.B.situation.label;
    document.getElementById("form-situation-hint").textContent = form.B.situation.placeholder;
    document.getElementById("form-attempts-label").innerHTML = `${form.B.attempts.label} <small>(${form.B.attempts.optional})</small>`;
    document.getElementById("form-attempts-hint").textContent = form.B.attempts.placeholder;
    document.getElementById("form-success-B-label").textContent = form.B.success.label;
    document.getElementById("form-success-B-hint").textContent = form.B.success.placeholder;

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
    syncFormStep();
}

function operationsFiles() {
    return operationsCatalog[currentLang].files;
}

function currentOperationId() {
    if (currentPage.key !== "operations") return null;
    return operationIdFromHash(location.hash, operationsFiles());
}

function operationIndexProgress() {
    const maximumScroll = Math.max(0, elements.operationsView.scrollHeight - elements.operationsView.clientHeight);
    return maximumScroll ? elements.operationsView.scrollTop / maximumScroll : 0;
}

function updateOperationIndexFocus() {
    operationIndexFrame = null;
    if (body.dataset.state !== "operations" || currentOperationId()) return;
    setFocusCompanion({
        mode: "operations-scroll",
        progress: operationIndexProgress(),
        pulse: false
    });
}

function scheduleOperationIndexFocus() {
    if (operationIndexFrame !== null) return;
    operationIndexFrame = requestAnimationFrame(updateOperationIndexFocus);
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

    if (body.dataset.state === "operations" && reading) {
        setFocusCompanion({
            mode: "operations",
            progress: files.length > 1 ? index / (files.length - 1) : 1,
            steps: files.length,
            activeIndex: index
        });
    } else if (body.dataset.state === "operations") {
        scheduleOperationIndexFocus();
    }

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

async function transitionOperation(nextId, { focus = true } = {}) {
    if (operationTransitioning || currentPage.key !== "operations") return;
    const files = operationsFiles();
    const validId = nextId && files.some((file) => file.id === nextId) ? nextId : null;
    const activeId = currentOperationId();
    if (validId === activeId) return;

    const historyAction = operationHistoryAction({
        activeId,
        nextId: validId,
        hasParent: history.state?.operationParent === true
    });
    if (historyAction === "back") {
        history.back();
        triggerFooterLockout();
        return;
    }

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
        const operationParent = Boolean(
            validId && (historyAction === "push" || history.state?.operationParent === true)
        );
        history[historyAction === "replace" ? "replaceState" : "pushState"](
            {
                ...history.state,
                key: "operations",
                lang: currentLang,
                intent: currentIntent,
                operationId: validId,
                operationParent
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
    elements.footer.inert = ["intro", "welcome-center", "welcome-left"].includes(state);
    elements.footer.setAttribute("aria-hidden", String(elements.footer.inert));
    closeLanguageMenu(false);
}

function renderFocusTicks(steps, activeIndex) {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < steps; index += 1) {
        const tick = document.createElement("span");
        tick.className = "focus-tick";
        if (activeIndex !== null && index < activeIndex) tick.classList.add("is-passed");
        if (index === activeIndex) tick.classList.add("is-current");
        fragment.append(tick);
    }
    elements.focusTicks.replaceChildren(fragment);
}

function pulseFocusCompanion() {
    if (reducedMotion.matches) return;
    if (focusPulseTimer !== null) clearTimeout(focusPulseTimer);
    elements.focusCompanion.classList.remove("is-updating");
    requestAnimationFrame(() => elements.focusCompanion.classList.add("is-updating"));
    focusPulseTimer = setTimeout(() => {
        elements.focusCompanion.classList.remove("is-updating");
        focusPulseTimer = null;
    }, 620);
}

function setFocusCompanion({ mode, progress = 0.5, steps = 0, activeIndex = null, pulse = true }) {
    const normalizedProgress = Math.min(1, Math.max(0, progress));
    const normalizedSteps = Math.max(0, Math.round(steps));
    const normalizedActive = Number.isInteger(activeIndex)
        ? Math.min(normalizedSteps - 1, Math.max(0, activeIndex))
        : null;
    const signature = `${mode}:${normalizedProgress.toFixed(4)}:${normalizedSteps}:${normalizedActive ?? "none"}`;
    if (signature === focusSignature) return;

    focusSignature = signature;
    elements.focusCompanion.dataset.mode = mode;
    elements.focusCompanion.dataset.active = String(normalizedActive !== null);
    elements.focusCompanion.style.setProperty("--focus-progress", normalizedProgress.toFixed(4));
    elements.focusCompanion.style.setProperty("--focus-offset", `${(normalizedProgress * FOCUS_TRAVEL_PX).toFixed(2)}px`);
    const ticksSignature = `${normalizedSteps}:${normalizedActive ?? "none"}`;
    if (ticksSignature !== focusTicksSignature) {
        focusTicksSignature = ticksSignature;
        renderFocusTicks(normalizedSteps, normalizedActive);
    }
    if (mode !== "hidden" && pulse) pulseFocusCompanion();
}

function syncContactFocus() {
    const steps = formSteps();
    const activeIndex = Math.min(Math.max(0, currentFormStep), Math.max(0, steps.length - 1));
    setFocusCompanion({
        mode: "contact",
        progress: steps.length > 1 ? activeIndex / (steps.length - 1) : 1,
        steps: steps.length,
        activeIndex
    });
}

function syncOperationsFocus() {
    const files = operationsFiles();
    const index = files.findIndex((file) => file.id === currentOperationId());
    if (index < 0) {
        scheduleOperationIndexFocus();
        return;
    }
    setFocusCompanion({
        mode: "operations",
        progress: files.length > 1 ? index / (files.length - 1) : 1,
        steps: files.length,
        activeIndex: index
    });
}

function syncFocusState(state) {
    if (["intro", "welcome-center", "welcome-left"].includes(state)) {
        setFocusCompanion({ mode: "hidden" });
    } else if (state === "welcome-ready") {
        setFocusCompanion({ mode: "welcome" });
    } else if (state === "narrative") {
        const units = narrativeUnits();
        const active = elements.narrative.querySelector(".is-reading");
        const index = active ? units.indexOf(active) : 0;
        setFocusCompanion({
            mode: "narrative",
            progress: units.length > 1 ? Math.max(0, index) / (units.length - 1) : 0
        });
    } else if (state === "contact") {
        syncContactFocus();
    } else if (state === "operations") {
        syncOperationsFocus();
    }
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
    syncFocusState(state);
    if (state !== "narrative") disconnectNarrativeObserver();
}

function scheduleIntro() {
    cancelIntro();
    if (reducedMotion.matches) {
        setState("welcome-ready");
        return;
    }

    introRunning = true;
    setState("intro");
    introTimers.push(setTimeout(() => setState("welcome-center"), INTRO_NAME_MS));
    introTimers.push(setTimeout(() => setState("welcome-left"), INTRO_NAME_MS + INTRO_WELCOME_MS));
    introTimers.push(setTimeout(finishIntro, INTRO_TOTAL_MS));
}

function cancelIntro() {
    introTimers.forEach(clearTimeout);
    introTimers = [];
    introRunning = false;
}

function finishIntro() {
    if (!introRunning) return;
    introRunning = false;
    introTimers.forEach(clearTimeout);
    introTimers = [];
    setState("welcome-ready");
}

function disconnectNarrativeObserver() {
    narrativeObserver?.disconnect();
    narrativeObserver = null;
    if (narrativeFrame !== null) cancelAnimationFrame(narrativeFrame);
    narrativeFrame = null;
}

function narrativeUnits() {
    return [...elements.narrative.querySelectorAll(".scrolling-p, .image-box")];
}

function closestNarrativeUnit() {
    const center = elements.teleprompter.getBoundingClientRect().top + elements.teleprompter.clientHeight / 2;
    return narrativeUnits().reduce((closest, unit) => {
        const rect = unit.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        return !closest || distance < closest.distance ? { unit, distance } : closest;
    }, null)?.unit ?? null;
}

function updateNarrativeFocus() {
    narrativeFrame = null;
    if (body.dataset.state !== "narrative") return;
    const active = closestNarrativeUnit();
    const units = narrativeUnits();
    units.forEach((unit) => unit.classList.toggle("is-reading", unit === active));
    const index = units.indexOf(active);
    if (index >= 0) {
        setFocusCompanion({
            mode: "narrative",
            progress: units.length > 1 ? index / (units.length - 1) : 0
        });
    }
}

function scheduleNarrativeFocus() {
    if (narrativeFrame !== null) return;
    narrativeFrame = requestAnimationFrame(updateNarrativeFocus);
}

function captureNarrativePosition() {
    const unit = elements.narrative.querySelector(".is-reading") ?? closestNarrativeUnit();
    const maxScroll = Math.max(0, elements.teleprompter.scrollHeight - elements.teleprompter.clientHeight);
    return {
        unit: unit?.dataset.narrativeUnit ?? null,
        ratio: maxScroll ? elements.teleprompter.scrollTop / maxScroll : 0
    };
}

function restoreNarrativePosition(position) {
    if (!position) {
        elements.teleprompter.scrollTop = 0;
        return;
    }
    const unit = position.unit
        ? elements.narrative.querySelector(`[data-narrative-unit="${position.unit}"]`)
        : null;
    if (unit) {
        const viewport = elements.teleprompter.getBoundingClientRect();
        const rect = unit.getBoundingClientRect();
        elements.teleprompter.scrollTop += rect.top + rect.height / 2 - (viewport.top + viewport.height / 2);
    } else {
        const maxScroll = Math.max(0, elements.teleprompter.scrollHeight - elements.teleprompter.clientHeight);
        elements.teleprompter.scrollTop = maxScroll * Math.min(1, Math.max(0, position.ratio ?? 0));
    }
}

function initNarrativeObserver() {
    disconnectNarrativeObserver();
    narrativeUnits().forEach((unit) => unit.classList.remove("is-reading"));
    narrativeObserver = new IntersectionObserver(scheduleNarrativeFocus, {
        root: elements.teleprompter,
        rootMargin: "-34% 0px -34% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    narrativeUnits().forEach((unit) => narrativeObserver.observe(unit));
    scheduleNarrativeFocus();
}

function renderPage(page, { focus = false, narrativePosition = null } = {}) {
    cancelIntro();
    currentPage = page;
    currentLang = page.lang;
    body.dataset.routeKey = page.key;
    setMeta(page);
    renderLanguage();

    if (page.state === "narrative") {
        setState("narrative");
        requestAnimationFrame(() => {
            restoreNarrativePosition(narrativePosition);
            initNarrativeObserver();
        });
    } else if (page.state === "contact") {
        setState("contact");
        syncFormStep();
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
                focusFormStep();
            }
            else if (page.state === "operations" && currentOperationId()) return;
            else elements.main.focus({ preventScroll: true });
        });
    }
}

function navigate(key, { lang = currentLang, intent = currentIntent, replace = false, focus = true, hash = "", narrativePosition = null } = {}) {
    const page = pageFor(lang, key);
    if (!page) return;
    if (key === "contact" && currentPage.key !== "contact") currentFormStep = 0;
    const query = key === "contact" ? `?intent=${intent}` : "";
    const target = `${routeUrl(lang, key)}${query}${hash}`;
    const previousState = history.state ?? {};
    const state = { ...(replace ? previousState : {}), key, lang, intent };
    if (replace) {
        if (!previousState.from?.startsWith("/")) delete state.from;
    } else {
        state.from = `${location.pathname}${location.search}${location.hash}`;
    }
    if (key === "operations") {
        state.operationId = operationIdFromHash(hash, operationsCatalog[lang].files);
        state.operationParent = Boolean(state.operationId && previousState.operationParent === true);
    } else {
        delete state.operationId;
        delete state.operationParent;
    }
    history[replace ? "replaceState" : "pushState"](state, "", target);
    currentIntent = intent;
    renderPage(page, { focus, narrativePosition });
}

function setIntent(intent, animate = true, resetStep = false) {
    currentIntent = intent === "B" ? "B" : "A";
    if (resetStep) currentFormStep = 0;
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
    syncFormStep({ animate: animate && currentPage.key === "contact" });
}

function formSteps() {
    const intent = elements.contactForm.querySelector('[data-form-step="intent"]');
    const panel = currentIntent === "A" ? elements.fieldsA : elements.fieldsB;
    const conditional = [...panel.children].filter((child) => child.matches("[data-form-step]"));
    const identity = elements.contactForm.querySelector('[data-form-step="identity"]');
    return [intent, ...conditional, identity].filter(Boolean);
}

function renderFormFooter() {
    const form = contactForms[currentLang];
    const steps = formSteps();
    const total = steps.length;
    const current = Math.min(total, currentFormStep + 1);
    const last = currentFormStep === total - 1;
    elements.cancelButton.hidden = currentFormStep !== 0;
    elements.formPrevious.hidden = currentFormStep === 0;
    elements.formPrevious.disabled = currentFormStep === 0 || submitting;
    elements.formNext.textContent = submitting
        ? form.common.sending
        : last ? form.common.submit : form.common.continue;
    elements.formNext.setAttribute(
        "aria-label",
        last ? form.common.submit : form.common.continue.replace("→", "").trim()
    );
    elements.formNext.disabled = submitting;
    elements.formProgress.textContent = `${String(current).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
    elements.formProgress.setAttribute(
        "aria-label",
        form.common.step.replace("{current}", String(current)).replace("{total}", String(total))
    );
}

function activeFormStep() {
    return formSteps()[currentFormStep] ?? null;
}

function focusFormStep() {
    const step = activeFormStep();
    if (!step) return;
    const control = step.querySelector("input:checked")
        ?? step.querySelector("textarea:not(:disabled), input:not([type=hidden]):not(:disabled), button:not(:disabled)");
    control?.focus({ preventScroll: true });
}

function syncFormStep({ animate = false, focus = false } = {}) {
    const steps = formSteps();
    currentFormStep = Math.min(Math.max(0, currentFormStep), Math.max(0, steps.length - 1));
    elements.contactForm.querySelectorAll("[data-form-step]").forEach((step) => { step.hidden = true; });
    const active = steps[currentFormStep];
    if (active) {
        active.hidden = false;
        if (animate && !reducedMotion.matches) {
            active.classList.remove("form-panel-enter");
            requestAnimationFrame(() => active.classList.add("form-panel-enter"));
        }
    }
    body.dataset.formStep = String(currentFormStep + 1);
    elements.contactForm.closest(".view-contact").scrollTop = 0;
    renderFormFooter();
    if (body.dataset.state === "contact") syncContactFocus();
    if (focus) requestAnimationFrame(focusFormStep);
}

function validateControls(controls) {
    controls.forEach((control) => {
        control.setCustomValidity("");
        const textControl = control instanceof HTMLTextAreaElement
            || ["text", "email"].includes(control.type);
        if (control.required && textControl && !control.value.trim()) {
            control.setCustomValidity(contactForms[currentLang].validationError);
        }
    });
    const invalid = controls.filter((control) => !control.validity.valid);
    controls.forEach((control) => markInvalid(control, invalid.includes(control)));
    return invalid;
}

function controlsForStep(step) {
    if (!step) return [];
    return [...step.querySelectorAll("input, textarea, select")]
        .filter((control) => !control.disabled && control.willValidate);
}

function showValidationError(invalid) {
    elements.formStatus.dataset.kind = "error";
    elements.formStatus.textContent = contactForms[currentLang].validationError;
    invalid[0]?.focus();
}

function advanceForm() {
    if (submitting) return;
    elements.formStatus.textContent = "";
    const invalid = validateControls(controlsForStep(activeFormStep()));
    if (invalid.length) {
        showValidationError(invalid);
        return;
    }
    const steps = formSteps();
    if (currentFormStep === steps.length - 1) {
        submitContact();
        return;
    }
    currentFormStep += 1;
    syncFormStep({ animate: true, focus: true });
}

function previousFormStep() {
    if (submitting || currentFormStep === 0) return;
    elements.formStatus.textContent = "";
    currentFormStep -= 1;
    syncFormStep({ animate: true, focus: true });
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

    const narrativePosition = currentPage.state === "narrative" ? captureNarrativePosition() : null;
    const targets = [
        elements.brandTag,
        elements.welcomeProse,
        elements.backButton,
        elements.contactButton,
        elements.formPrevious,
        elements.formProgress,
        elements.formNext,
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
            hash: currentPage.key === "operations" ? location.hash : "",
            narrativePosition
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
    const invalidControls = validateControls(controls);

    if (invalidControls.length) {
        const invalidStep = invalidControls[0].closest("[data-form-step]");
        const invalidIndex = formSteps().indexOf(invalidStep);
        if (invalidIndex >= 0) {
            currentFormStep = invalidIndex;
            syncFormStep();
        }
        showValidationError(invalidControls);
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
    renderFormFooter();
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
        currentFormStep = formSteps().length - 1;
        syncFormStep();
        elements.contactForm.querySelectorAll("textarea").forEach(resizeTextarea);
        elements.formStatus.dataset.kind = "success";
        elements.formStatus.textContent = `${contactForms[currentLang].successTitle} ${contactForms[currentLang].successText}`;
        setFocusCompanion({ mode: "complete", progress: 1 });
    } catch {
        elements.formStatus.dataset.kind = "error";
        elements.formStatus.textContent = contactForms[currentLang].networkError;
    } finally {
        submitting = false;
        renderFormFooter();
    }
}

function resizeTextarea(textarea) {
    if (!(textarea instanceof HTMLTextAreaElement)) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
    textarea.style.overflowY = textarea.scrollHeight > 180 ? "auto" : "hidden";
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
        navigate("contact", { intent: currentIntent });
    }
    if (action === "form-next") advanceForm();
    if (action === "form-previous") previousFormStep();
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
    advanceForm();
});
elements.contactForm.addEventListener("change", (event) => {
    if (event.target.name === "intent") setIntent(event.target.value, true, true);
    if (event.target.name === "urgency") updateDateField();
});
elements.contactForm.addEventListener("input", (event) => {
    const control = event.target;
    if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
        control.setCustomValidity("");
        markInvalid(control, false);
    }
    if (body.dataset.state === "contact" && elements.focusCompanion.dataset.mode === "complete") syncContactFocus();
    resizeTextarea(control);
});

window.addEventListener("popstate", () => {
    let page = routeFromPath(location.pathname) ?? pageFor(preferredLang, "home");
    if (page.key === "contact" && currentPage.key !== "contact") currentFormStep = 0;
    currentIntent = new URLSearchParams(location.search).get("intent") === "B" ? "B" : "A";
    if (page.lang !== preferredLang) {
        page = pageFor(preferredLang, page.key) ?? pageFor(preferredLang, "home");
        const query = page.key === "contact" ? `?intent=${currentIntent}` : "";
        const hash = page.key === "operations" ? location.hash : "";
        const state = { ...(history.state ?? {}), key: page.key, lang: preferredLang, intent: currentIntent };
        if (page.key === "operations") {
            state.operationId = operationIdFromHash(hash, operationsCatalog[preferredLang].files);
            state.operationParent = Boolean(state.operationId && state.operationParent === true);
        } else {
            delete state.operationId;
            delete state.operationParent;
        }
        history.replaceState(state, "", `${routeUrl(preferredLang, page.key)}${query}${hash}`);
    }
    renderPage(page, { focus: true });
});

window.addEventListener("hashchange", () => {
    if (currentPage.key === "operations") syncOperationsView({ focus: true });
});

reducedMotion.addEventListener("change", () => {
    if (currentPage.key === "home") {
        cancelIntro();
        setState("welcome-ready");
    }
    if (currentPage.state === "narrative") initNarrativeObserver();
});

const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
elements.targetDate.min = today.toISOString().slice(0, 10);
elements.contactForm.querySelectorAll("textarea").forEach(resizeTextarea);
elements.teleprompter.addEventListener("scroll", scheduleNarrativeFocus, { passive: true });
elements.operationsView.addEventListener("scroll", scheduleOperationIndexFocus, { passive: true });

history.replaceState(
    { key: currentPage.key, lang: currentPage.lang, intent: currentIntent, operationId: currentOperationId() },
    "",
    `${location.pathname}${location.search}${location.hash}`
);
renderPage(currentPage);
