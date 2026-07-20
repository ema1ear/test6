import assert from "node:assert/strict";
import { operationsCatalog, operationEvidenceTypes } from "../assets/operations-content.js";
import {
    operationHistoryAction,
    operationIdFromHash,
    renderOperationsArchive,
    validateOperationsCatalog
} from "../assets/operations-workspace.js";

const expectedTitles = {
    ca: [
        "Abans d’acceptar la solució",
        "Investigar per decidir",
        "Decidir també és descartar",
        "Construir per poder provar",
        "Comprovar allò que es pot sostenir",
        "Lliurar perquè continuï"
    ],
    es: [
        "Antes de aceptar la solución",
        "Investigar para decidir",
        "Decidir también es descartar",
        "Construir para poder probar",
        "Comprobar lo que puede sostenerse",
        "Entregar para que continúe"
    ]
};

for (const [lang, catalog] of Object.entries(operationsCatalog)) {
    assert.deepEqual(validateOperationsCatalog(catalog), [], `Catálogo inválido: ${lang}`);
    assert.equal(catalog.files.length, 6);
    assert.ok(catalog.intro.length > 250, `Introducción incompleta: ${lang}`);
    assert.deepEqual(catalog.files.map((file) => file.title), expectedTitles[lang]);
    assert.deepEqual(catalog.files.map((file) => file.evidenceType), operationEvidenceTypes);
    assert.equal(operationIdFromHash("#op-01", catalog.files), "op-01");
    assert.equal(operationIdFromHash("#op-06", catalog.files), "op-06");
    assert.equal(operationIdFromHash("#op-07", catalog.files), null);

    const html = renderOperationsArchive(catalog);
    assert.equal((html.match(/data-action="operation-open"/g) ?? []).length, 6);
    assert.equal((html.match(/data-operation-article="op-/g) ?? []).length, 6);
    assert.equal(html.includes("aria-expanded"), false);
    assert.equal(html.includes("folder-drawer"), false);
}

assert.equal(
    operationHistoryAction({ activeId: null, nextId: "op-01", hasParent: false }),
    "push",
    "Abrir un archivo desde el índice debe crear un único nivel de lectura."
);
assert.equal(
    operationHistoryAction({ activeId: "op-01", nextId: "op-02", hasParent: true }),
    "replace",
    "Avanzar entre archivos no debe apilar entradas adicionales."
);
assert.equal(
    operationHistoryAction({ activeId: "op-02", nextId: null, hasParent: true }),
    "back",
    "Volver al índice debe consumir la entrada de lectura."
);
assert.equal(
    operationHistoryAction({ activeId: "op-02", nextId: null, hasParent: false }),
    "replace",
    "Un enlace profundo debe poder volver al índice sin crear historial."
);

console.log("Operations infrastructure checks passed.");
