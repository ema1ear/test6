# Instrucción para reestructurar el contenido definitivo de Operaciones

## Prompt listo para copiar

Actúa como arquitecto editorial y adaptador de contenido estructurado. Recibirás
seis bloques de contenido en castellano correspondientes a una sección web
llamada **Operaciones**. El contenido ya existe: tu tarea no es reescribirlo
libremente ni inventar un método nuevo, sino comprobar su encaje y transformarlo
al contrato exacto de la infraestructura descrita abajo.

### Objetivo

Convertir los seis bloques en un objeto `operationsCatalog.es` válido, fiel al
contenido fuente, legible en web y preparado para una traducción posterior al
catalán.

### Regla principal

No fuerces material que no encaje. Antes de transformar, identifica cualquier
contenido que requiera enlaces, imágenes, tablas, notas al pie, más de cinco
unidades o un tipo de evidencia no admitido. Inclúyelo en
`infrastructure_gaps`; no lo elimines ni lo conviertas silenciosamente en otra
cosa.

### Contrato invariable

Debe haber exactamente seis archivos, en este orden y con esta asignación:

1. `op-01` — `reframe-matrix` — `rows[]: { from, to }`
2. `op-02` — `research-trail` — `steps[]: { label, detail }`
3. `op-03` — `scenario-comparison` — `scenarios[]: { label, detail, selected }`
4. `op-04` — `workflow` — `steps[]: { label, detail }`
5. `op-05` — `claim-boundary` — `can[]`, `cannot[]`
6. `op-06` — `journey-map` — `steps[]: { label, detail }`

No cambies `id`, orden ni `evidenceType`.

### Campos obligatorios por archivo

```js
{
  id,
  num,
  title,
  status,
  thesis,
  explanation,
  evidenceType,
  evidenceLabel,
  evidence,
  limit
}
```

### Criterios editoriales

- `num`: `01` a `06`, coherente con el `id`.
- `title`: preciso, preferentemente de 3 a 8 palabras.
- `status`: una palabra o expresión muy breve que describa la fase.
- `thesis`: una sola idea verificable, en una o dos frases breves.
- `explanation`: explica qué se hace, qué decisión permite tomar y por qué
  importa. No repitas la tesis.
- `evidenceLabel`: describe exactamente qué se está mostrando.
- `evidence`: entre tres y cinco unidades centrales, salvo que
  `claim-boundary` necesite entre tres y cinco elementos en cada lado.
- `limit`: delimita qué demuestra esa evidencia y qué no permite atribuir.
- Separa hechos, interpretación e hipótesis.
- Conserva cifras, fechas y nombres solo si aparecen en la fuente.
- No inventes resultados, causalidades, testimonios, fuentes ni métricas.
- No uses HTML ni Markdown dentro de los valores.
- No uses frases de relleno sobre la propia infraestructura.
- En `scenario-comparison` debe haber exactamente una opción con
  `selected: true` y el contenido fuente debe justificarla.
- Si el bloque original no sostiene una evidencia, indícalo en
  `open_questions` en vez de fabricarla.

### Correspondencia de cada expediente

#### OP-01 — Reformulación

Extrae de tres a cinco pares entre la petición, creencia o formulación inicial
(`from`) y la pregunta operativa o reformulación alcanzada (`to`).

#### OP-02 — Investigación

Reconstruye de tres a cinco pasos reales del recorrido: pregunta, fuentes o
materiales, contradicciones, hallazgos y cambio de tesis. Si hay URLs o citas
que la infraestructura actual no puede representar, consérvalas en
`infrastructure_gaps`.

#### OP-03 — Decisión

Presenta tres escenarios comparables. Explica las consecuencias de cada uno y
marca como seleccionado únicamente el que realmente se adoptó o se recomienda
en la fuente.

#### OP-04 — Construcción

Convierte el trabajo en una secuencia de tres a cinco pasos con entradas,
transformaciones, salidas y revisión. No conviertas una simple lista de tareas
en un proceso si el material no lo sostiene.

#### OP-05 — Comprobación

Separa en `can` lo observado o atribuible y en `cannot` los resultados no
medidos, causalidades externas o afirmaciones todavía no demostrables.

#### OP-06 — Continuidad

Representa de tres a cinco puntos del recorrido posterior a la entrega:
activación, uso, responsables, revisión y continuidad. No afirmes autonomía si
no existe documentación o evidencia que la sostenga.

### Proceso obligatorio

1. Lee los seis bloques completos antes de redactar.
2. Produce primero un informe de encaje, sin reescribir el contenido.
3. Señala lagunas, contradicciones y elementos fuera de contrato.
4. Solo después genera el catálogo en castellano.
5. Comprueba que el objeto cumple todas las restricciones.
6. No traduzcas todavía al catalán.

### Formato de salida

Entrega exactamente cuatro apartados:

1. `fit_report`: tabla con expediente, encaje, evidencia disponible y riesgo.
2. `infrastructure_gaps`: lista de elementos que no caben sin modificar código.
3. `operationsCatalog.es`: bloque JavaScript completo y directamente copiable.
4. `open_questions`: únicamente decisiones que requieren respuesta humana.

No propongas cambios visuales ni alteres el resto de la web.

### Fase catalana posterior

Cuando el catálogo castellano esté aprobado, tradúcelo al catalán conservando
exactamente ids, orden, tipos de evidencia, cantidad de unidades y relaciones
lógicas. Prioriza un catalán profesional y natural sobre la traducción literal.
Señala cualquier término técnico cuya equivalencia necesite una decisión.

## Uso recomendado

Adjunta a este prompt:

1. Los seis bloques definitivos en castellano, claramente marcados de OP-01 a
   OP-06.
2. El archivo `assets/operations-content.js` actual como referencia de sintaxis.
3. Cualquier investigación o fuente que deba conservarse.

No solicites la traducción al catalán hasta que el informe de encaje y el
catálogo castellano hayan sido revisados.

