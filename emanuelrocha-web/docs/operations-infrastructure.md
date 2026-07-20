# Operaciones — infraestructura y contrato de merge

## Alcance de esta fase

Esta versión implementa únicamente la infraestructura del **archivador focal con unidades operativas calibradas**. Los textos de `assets/operations-content.js` son muestras de calibración y no constituyen el copy editorial final.

La implementación conserva:

- la vista `.view-operations` y el escenario de `38rem`;
- un único scroll interno en Operaciones;
- la identidad tipográfica, el color y los fundidos existentes;
- las rutas `/ca/operacions/` y `/es/operaciones/`;
- el formulario compartido y el cambio de idioma;
- el sitio estático, sin framework ni dependencia nueva.

Retira del patrón de Operaciones:

- acordeones y `aria-expanded`;
- contenido extenso dentro de una fila;
- modales, drawers y scrolls anidados;
- una tercera ruta visual ajena al resto de la web.

## Estados

### Índice

La introducción y los seis archivos forman una vista general. Cada fila es un enlace normal con `href="#op-0n"`, por lo que la estructura mantiene una lectura básica sin JavaScript.

### Lectura

El archivo activo sustituye al índice en el mismo escenario. El título recibe el foco; el artículo utiliza una columna máxima de `72ch`; el footer ofrece navegación contextual.

Los hashes admitidos son:

```text
#op-01
#op-02
#op-03
#op-04
#op-05
#op-06
```

Cada apertura, avance, retroceso o vuelta al índice crea una entrada predecible en el historial. El cambio de idioma conserva el hash.

## Contrato editorial

Cada idioma debe conservar exactamente seis objetos en `operationsCatalog[lang].files`. Los campos requeridos son:

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

Asignación fija de renderizadores:

| Archivo | `evidenceType` | Datos de `evidence` |
| --- | --- | --- |
| 01 | `reframe-matrix` | `rows[]: { from, to }` |
| 02 | `research-trail` | `steps[]: { label, detail }` |
| 03 | `scenario-comparison` | `scenarios[]: { label, detail, selected }` |
| 04 | `workflow` | `steps[]: { label, detail }` |
| 05 | `claim-boundary` | `can[]`, `cannot[]` |
| 06 | `journey-map` | `steps[]: { label, detail }` |

Las unidades centrales deben mantenerse entre tres y cinco por expediente. El contenido puede cambiar; los `id`, el orden y el `evidenceType` no deben cambiar durante el merge salvo que se revise también la infraestructura.

## Secuencia de validación después del merge

### Automática

```bash
npm run check
npm run test:operations
npm run build
```

El build se detiene si falta un archivo, un campo requerido o un renderizador asignado.

### Manual

1. Abrir las dos páginas de Operaciones sin hash y comprobar los seis archivos.
2. Cargar directamente cada hash y comprobar que aparece el expediente correcto.
3. Recorrer índice, siguiente, último archivo, anterior y contacto.
4. Usar atrás/adelante del navegador entre varios archivos.
5. Cambiar de idioma desde el índice y comprobar la paridad de títulos y tesis.
6. Navegar solo con teclado y verificar que el foco llega al título del archivo.
7. Probar `prefers-reduced-motion` y confirmar que nada depende del fundido.
8. Revisar móvil estrecho, móvil ancho y escritorio; no debe aparecer un segundo scroll dentro del artículo.
9. Desactivar JavaScript y comprobar que índice y expedientes siguen presentes como documento lineal.
10. Desde el archivo 06, abrir Contacto, cancelar y confirmar el retorno al mismo hash.

## Frontera del próximo cambio

La solicitud editorial debe trabajar primero sobre una copia o propuesta de `assets/operations-content.js`. El merge posterior sustituirá únicamente ese contenido y ejecutará la secuencia anterior. `assets/operations-workspace.js`, la lógica de historial de `assets/app.js` y los estilos estructurales no deberían editarse durante esa fase salvo que un contenido real demuestre un límite de infraestructura.
