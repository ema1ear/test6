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

    if (page.key === "A" || page.key === "B") {
        const paragraphs = (html.match(/class="scrolling-p"/g) ?? []).length;
        assert.ok(paragraphs >= (page.key === "A" ? 20 : 45), `Contenido incompleto: ${page.lang}/${page.key}.`);
        assert.equal(
            (html.match(new RegExp(`data-action="contact-from-narrative" data-intent="${page.key}"`, "g")) ?? []).length,
            page.key === "A" ? 2 : 1,
            `CTA incorrectos: ${page.lang}/${page.key}.`
        );
        assert.equal(html.includes("narrative-sources"), page.key === "B");
    }
}

const robots = await readFile(join(distRoot, "robots.txt"), "utf8");
assert.doesNotMatch(robots, /Disallow:\s*\/(?:ca\/contacte|es\/contacto)/);

const template = await readFile(join(projectRoot, "src/template.html"), "utf8");
assert.ok(
    template.indexOf('id="form-fields-A"') < template.indexOf('class="form-common-fields"'),
    "Los campos dinámicos deben aparecer antes de nombre y correo."
);
assert.equal(
    (template.match(/class="form-option-divider"/g) ?? []).length,
    2,
    "Las opciones de plazo deben conservar los dos separadores editoriales."
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

for (const lang of ["ca", "es"]) {
    const narrative = await readFile(join(distRoot, routes[lang].B, "index.html"), "utf8");
    assert.equal((narrative.match(/target="_blank" rel="noopener noreferrer"/g) ?? []).length, 5);
}

const sitemap = await readFile(join(distRoot, "sitemap.xml"), "utf8");
assert.equal((sitemap.match(/<url>/g) ?? []).length, routePages.filter((page) => page.index).length);
for (const page of routePages.filter((candidate) => candidate.index)) {
    assert.ok(sitemap.includes(`<loc>https://emanuelrocha.cat${routes[page.lang][page.key]}</loc>`));
}

const wrangler = JSON.parse(await readFile(join(projectRoot, "wrangler.jsonc"), "utf8"));
assert.equal(wrangler.pages_build_output_dir, "./dist");
assert.equal(wrangler.compatibility_date, "2026-07-19");

console.log("Generated site checks passed.");
