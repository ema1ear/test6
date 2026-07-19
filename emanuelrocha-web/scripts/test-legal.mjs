import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = await mkdtemp(join(tmpdir(), "emanuelrocha-legal-"));
const baseEnv = { ...process.env };
delete baseEnv.LEGAL_NIF;
delete baseEnv.LEGAL_ADDRESS_CA;
delete baseEnv.LEGAL_ADDRESS_ES;

try {
    const missingVariables = spawnSync(process.execPath, ["scripts/build.mjs"], {
        cwd: projectRoot,
        encoding: "utf8",
        env: { ...baseEnv, LEGAL_PUBLISH: "true", BUILD_OUTPUT_DIR: outputRoot }
    });
    assert.notEqual(missingVariables.status, 0, "El build legal debe fallar si faltan datos obligatorios.");
    assert.match(missingVariables.stderr, /LEGAL_NIF, LEGAL_ADDRESS_CA, LEGAL_ADDRESS_ES/);

    const legalBuild = spawnSync(process.execPath, ["scripts/build.mjs"], {
        cwd: projectRoot,
        encoding: "utf8",
        env: {
            ...baseEnv,
            LEGAL_PUBLISH: "true",
            LEGAL_NIF: "X0000000X",
            LEGAL_ADDRESS_CA: "Adreça de prova & despatx, Catalunya, Espanya",
            LEGAL_ADDRESS_ES: "Dirección de prueba & despacho, Cataluña, España",
            BUILD_OUTPUT_DIR: outputRoot
        }
    });
    assert.equal(legalBuild.status, 0, legalBuild.stderr);

    const caLegal = await readFile(join(outputRoot, "ca/legal/index.html"), "utf8");
    const esLegal = await readFile(join(outputRoot, "es/legal/index.html"), "utf8");
    const caContact = await readFile(join(outputRoot, "ca/contacte/index.html"), "utf8");
    const esContact = await readFile(join(outputRoot, "es/contacto/index.html"), "utf8");
    const notFound = await readFile(join(outputRoot, "404.html"), "utf8");

    for (const html of [caLegal, esLegal]) {
        assert.match(html, /<meta name="robots" content="noindex, follow">/);
        assert.match(html, /X0000000X/);
        assert.match(html, /Cloudflare/);
        assert.match(html, /Resend/);
        assert.match(html, /Hostinger/);
        assert.match(html, /styles\.css\?v=[a-f0-9]{12}/);
        assert.doesNotMatch(html, /\{\{[A-Z0-9_]+\}\}/);
    }
    assert.match(caLegal, /Adreça de prova &amp; despatx/);
    assert.match(esLegal, /Dirección de prueba &amp; despacho/);
    assert.match(caContact, /id="form-privacy"/);
    assert.match(caContact, /href="\/ca\/legal\/"/);
    assert.match(esContact, /href="\/es\/legal\/"/);
    assert.match(caContact, /id="legal-link"/);
    assert.match(notFound, /noindex, follow/);
    assert.match(notFound, /styles\.css\?v=[a-f0-9]{12}/);

    console.log("Conditional legal publication checks passed.");
} finally {
    await rm(outputRoot, { recursive: true, force: true });
}
