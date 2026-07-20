import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { equivalentRoute, routePages, routes } from "../assets/content.js";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(projectRoot, "dist");
const titles = new Set();
const descriptions = new Set();
const narrativeUnits = { ca: {}, es: {} };

assert.equal(routePages.length, 10, "Deben generarse cinco rutas por idioma.");

for (const page of routePages) {
    const html = await readFile(join(distRoot, routes[page.lang][page.key], "index.html"), "utf8");
    const canonical = `https://emanuelrocha.cat${routes[page.lang][page.key]}`;
    const xDefault = `https://emanuelrocha.cat${equivalentRoute(page, "ca")}`;

    assert.ok(page.heading.trim(), `Falta el H1 de ${page.lang}/${page.key}.`);
    assert.ok(page.title.trim(), `Falta el title de ${page.lang}/${page.key}.`);
    assert.ok(page.description.trim(), `Falta la description de ${page.lang}/${page.key}.`);
    assert.equal(titles.has(page.title), false, `Title duplicado: ${page.title}`);
    assert.equal(descriptions.has(page.description), false, `Description duplicada: ${page.description}`);
    titles.add(page.title);
    descriptions.add(page.description);

    assert.ok(html.includes(`<title>${page.title}</title>`));
    assert.ok(html.includes(`<meta name="description" content="${page.description}">`));
    assert.ok(html.includes(`<h1 class="visually-hidden" id="page-heading">${page.heading}</h1>`));
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="x-default" href="${xDefault}">`));
    assert.match(html, new RegExp(`<meta name="robots" content="${page.index ? "index, follow" : "noindex, follow"}">`));
    assert.doesNotMatch(html, /\{\{[A-Z0-9_]+\}\}/);
    assert.doesNotMatch(html, /TEXT GUIA|TEXTO GUÍA|BORRADOR|ESBORRANY/i);

    if (page.key === "home") {
        assert.equal((html.match(/data-action="narrative"/g) ?? []).length, 2);
    }

    if (page.key === "operations") {
        assert.match(html, /id="focus-companion"[^>]*data-mode="operations-scroll"/, "El índice debe iniciar con su guía continua.");
    }

    if (page.key === "A" || page.key === "B") {
        const paragraphs = (html.match(/class="scrolling-p"/g) ?? []).length;
        assert.ok(paragraphs >= (page.key === "A" ? 20 : 45), `Contenido incompleto: ${page.lang}/${page.key}.`);
        assert.equal(
            (html.match(new RegExp(`data-action="contact-from-narrative" data-intent="${page.key}"`, "g")) ?? []).length,
            page.key === "A" ? 2 : 1,
            `CTA incorrectos: ${page.lang}/${page.key}.`
        );
        assert.doesNotMatch(html, /narrative-sources|data-narrative-unit="[ab]-sources"/, `Las fuentes no deben publicarse en ${page.lang}/${page.key}.`);
        const units = [...html.matchAll(/data-narrative-unit="([^"]+)"/g)].map((match) => match[1]);
        assert.equal(new Set(units).size, units.length, `Unidades narrativas duplicadas: ${page.lang}/${page.key}.`);
        narrativeUnits[page.lang][page.key] = units;
    }
}

assert.deepEqual(narrativeUnits.ca.A, narrativeUnits.es.A, "La ruta rápida debe conservar anclas bilingües equivalentes.");
assert.deepEqual(narrativeUnits.ca.B, narrativeUnits.es.B, "La ruta narrativa debe conservar anclas bilingües equivalentes.");

const robots = await readFile(join(distRoot, "robots.txt"), "utf8");
assert.doesNotMatch(robots, /Disallow:\s*\/(?:ca\/contacte|es\/contacto)/);

const template = await readFile(join(projectRoot, "src/template.html"), "utf8");
assert.doesNotMatch(template, /intro-counter|skip-intro/, "La entrada no debe recuperar el contador 0–100.");
assert.match(template, /id="focus-companion"[^>]*data-mode="\{\{FOCUS_MODE\}\}"[^>]*aria-hidden="true"/);
assert.match(template, /class="focus-mark"[^>]*viewBox="0 0 24 24"/);
assert.doesNotMatch(template, /focus-progress-dot/, "La marca focal debe moverse como una sola unidad.");
assert.ok(
    template.indexOf('id="form-fields-A"') < template.indexOf('class="form-common-fields"'),
    "Los campos dinámicos deben aparecer antes de nombre y correo."
);
assert.equal(
    (template.match(/class="form-option-divider"/g) ?? []).length,
    2,
    "Las opciones de plazo deben conservar los dos separadores editoriales."
);
assert.equal((template.match(/data-form-step=/g) ?? []).length, 9, "El formulario debe conservar nueve unidades posibles.");
assert.equal((template.match(/class="form-field-hint"/g) ?? []).length, 6, "Cada respuesta abierta debe mostrar su instrucción fuera del campo.");
assert.equal((template.match(/<textarea[^>]*placeholder=/g) ?? []).length, 0, "Las instrucciones largas no deben quedar recortadas como placeholder.");
assert.match(template, /id="btn-form-previous"[^>]*data-action="form-previous"[^>]*hidden/);
assert.match(template, /id="btn-form-next"[^>]*data-action="form-next"/);
assert.ok(
    template.indexOf('id="btn-cancel-contact"') < template.indexOf('class="footer-col-center"'),
    "Cancelar debe pertenecer a la columna izquierda del footer."
);
assert.ok(
    template.indexOf('data-form-step="identity"') < template.indexOf("{{FORM_PRIVACY_HTML}}"),
    "La privacidad debe estar integrada en el último paso."
);
const jsonLd = template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
assert.ok(jsonLd, "No se ha encontrado el bloque JSON-LD.");
const structuredData = JSON.parse(jsonLd);
assert.equal(structuredData["@context"], "https://schema.org");
assert.ok(structuredData["@graph"].some((item) => item["@type"] === "WebSite"));
assert.ok(structuredData["@graph"].some((item) => item["@type"] === "Person"));
const expectedHash = `sha256-${createHash("sha256").update(jsonLd).digest("base64")}`;
const vercel = JSON.parse(await readFile(join(projectRoot, "vercel.json"), "utf8"));
const csp = vercel.headers.flatMap((rule) => rule.headers).find((header) => header.key === "Content-Security-Policy")?.value;
assert.ok(csp?.includes(`'${expectedHash}'`), "El hash CSP del JSON-LD no coincide con la plantilla.");

const cloudflareHeaders = await readFile(join(distRoot, "_headers"), "utf8");
assert.ok(cloudflareHeaders.includes(`'${expectedHash}'`), "El hash CSP de Cloudflare no coincide con la plantilla.");
assert.match(cloudflareHeaders, /Strict-Transport-Security: max-age=31536000; includeSubDomains/);

const cloudflareRedirects = await readFile(join(distRoot, "_redirects"), "utf8");
assert.match(cloudflareRedirects, /^\/ \/ca\/ 302\s*$/);

const notFound = await readFile(join(distRoot, "404.html"), "utf8");
assert.match(notFound, /<meta name="robots" content="noindex, follow">/);
assert.match(notFound, /\/assets\/styles\.css\?v=[a-f0-9]{12}/);

const defaultContact = await readFile(join(distRoot, "ca/contacte/index.html"), "utf8");
assert.doesNotMatch(defaultContact, /id="form-privacy"/);
assert.doesNotMatch(defaultContact, /id="legal-link"/);

const sitemap = await readFile(join(distRoot, "sitemap.xml"), "utf8");
assert.equal((sitemap.match(/<url>/g) ?? []).length, routePages.filter((page) => page.index).length);
for (const page of routePages.filter((candidate) => candidate.index)) {
    assert.ok(sitemap.includes(`<loc>https://emanuelrocha.cat${routes[page.lang][page.key]}</loc>`));
}

const wrangler = JSON.parse(await readFile(join(projectRoot, "wrangler.jsonc"), "utf8"));
assert.equal(wrangler.pages_build_output_dir, "./dist");
assert.equal(wrangler.compatibility_date, "2026-07-19");

const appScript = await readFile(join(projectRoot, "assets/app.js"), "utf8");
assert.match(appScript, /const INTRO_NAME_MS = 2000;/, "El nombre debe permanecer dos segundos.");
assert.match(appScript, /const INTRO_WELCOME_MS = 2000;/, "La bienvenida debe permanecer dos segundos.");
assert.match(appScript, /const INTRO_MOVE_MS = 1800;/, "El desplazamiento final debe disponer de 1,8 segundos.");
assert.doesNotMatch(appScript, /welcome-settle|skip-intro|introCounter/, "No deben quedar estados ni procesos del contador retirado.");
assert.match(appScript, /function setFocusCompanion\(/);
assert.match(appScript, /mode: "narrative"/);
assert.match(appScript, /mode: "operations"/);
assert.match(appScript, /mode: "operations-scroll"/);
assert.match(appScript, /mode: "contact"/);
assert.match(appScript, /mode: "complete"/);
assert.match(appScript, /function operationIndexProgress\(/);
assert.match(appScript, /function scheduleOperationIndexFocus\(/);
assert.match(appScript, /mode: "operations-scroll",[\s\S]*?pulse: false/, "El índice debe seguir el scroll sin pulsar en cada píxel.");
assert.equal(
    (appScript.match(/elements\.operationsView\.addEventListener\("scroll"/g) ?? []).length,
    1,
    "Operaciones debe registrar un solo listener de scroll."
);
assert.doesNotMatch(appScript, /setOperationIndexFocus|previewOperationLink|classList\.toggle\("is-focal"/, "El índice no debe conservar el modelo focal discreto anterior.");
assert.doesNotMatch(appScript, /function scheduleFocusAlignment\(/, "La marca no debe recalcular un centro distinto en cada pantalla.");

const introStyles = await readFile(join(projectRoot, "assets/styles.css"), "utf8");
assert.doesNotMatch(introStyles, /\.intro-counter/, "Los estilos del contador retirado no deben permanecer.");
assert.match(introStyles, /\.axis-box\s*\{[\s\S]*?transition: var\(--transition-apple\);/, "La entrada debe recuperar la inercia original.");
assert.match(introStyles, /\.welcome-fade-block\s*\{[\s\S]*?position: relative;[\s\S]*?padding-top: 36px;/, "La bienvenida debe centrarse con su altura real.");
assert.doesNotMatch(introStyles, /\.content-viewport\s*\{\s*max-height:/, "Las rutas de escritorio deben usar toda la altura central disponible.");
assert.match(
    introStyles,
    /@media \(max-width: 767px\)[\s\S]*?\.view-welcome,[\s\S]*?\.view-narrative,[\s\S]*?\.view-contact,[\s\S]*?\.view-operations\s*\{[\s\S]*?padding-right: 20px;/,
    "Las superficies móviles deben reservar un carril propio para la marca focal."
);
assert.match(introStyles, /\.focus-companion\s*\{[\s\S]*?position: absolute;/, "La marca focal no debe participar en el layout.");
assert.match(introStyles, /\.focus-companion\s*\{[\s\S]*?pointer-events: none;/, "La marca focal no debe competir con la navegación.");
assert.match(introStyles, /@media \(min-width: 768px\)[\s\S]*?\.focus-companion \{ right: -48px; \}/, "La marca debe ocupar el margen exterior en escritorio.");
assert.match(introStyles, /\.focus-mark\s*\{[\s\S]*?translateY\(var\(--focus-offset\)\)/, "La marca completa debe desplazarse con el progreso.");
assert.doesNotMatch(introStyles, /focus-progress-dot|operations-index/, "No deben coexistir los dos modelos focales anteriores.");

const app = await readFile(join(projectRoot, "assets/app.js"), "utf8");
assert.match(app, /function captureNarrativePosition\(\)/);
assert.match(app, /function restoreNarrativePosition\(position\)/);
assert.match(app, /narrativePosition/);
assert.match(app, /function advanceForm\(\)/);
assert.match(app, /function previousFormStep\(\)/);

const styles = await readFile(join(projectRoot, "assets/styles.css"), "utf8");
assert.match(styles, /scroll-snap-type:\s*y proximity/);
assert.match(styles, /scroll-snap-stop:\s*normal/);
assert.doesNotMatch(styles, /scroll-snap-type:\s*y mandatory/);
assert.match(styles, /body\[data-state="contact"\] \.main-footer \{ opacity: 1; \}/);
assert.match(styles, /body\[data-state="contact"\] #btn-operations-footer \{ display: none; \}/);
assert.doesNotMatch(styles, /body\[data-state="contact"\][^}]*display:\s*contents/);
assert.doesNotMatch(styles, /\.form-choice-input:checked \+ \.form-choice-btn\s*\{[^}]*text-decoration:\s*underline/);
assert.doesNotMatch(styles, /\.form-option-input:checked \+ \.form-option-label\s*\{[^}]*text-decoration:\s*underline/);

console.log("Generated site checks passed.");
