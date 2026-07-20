# Emanuel Rocha — web

Versión estática bilingüe preparada para GitHub y Cloudflare Pages. Conserva la experiencia narrativa original y añade rutas indexables, navegación con historial, accesibilidad, SEO técnico y contacto mediante una Pages Function. Se mantiene un adaptador compatible con Vercel para facilitar una reversión temporal.

## Rutas

| Català | Castellano | Uso |
| --- | --- | --- |
| `/ca/` | `/es/` | Entrada principal |
| `/ca/accio/` | `/es/accion/` | Ruta rápida para pasar a la acción |
| `/ca/cosmovisio/` | `/es/cosmovision/` | Ruta narrativa sobre el método de trabajo |
| `/ca/contacte/` | `/es/contacto/` | Contacto, no indexado |
| `/ca/operacions/` | `/es/operaciones/` | Operaciones |
| `/ca/legal/` | `/es/legal/` | Aviso legal, privacidad y cookies; publicación condicional y no indexada |

## Construcción local

Requiere Node.js 20 o superior.

```bash
npm run check
npm run build
npm run test:site
npm run test:operations
npm run test:contact
npm run test:legal
python3 -m http.server 4173 -d dist
```

La web quedará disponible en `http://localhost:4173/ca/`. El servidor estático permite revisar la interfaz, pero el envío de correo requiere ejecutar el entorno de Cloudflare Pages Functions.

## Contacto con Resend

1. Añadir y verificar `emanuelrocha.cat` en Resend.
2. Crear una API key.
3. Configurar estas variables en Cloudflare para Production y Preview:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL=hola@emanuelrocha.cat
CONTACT_FROM_EMAIL=Web Emanuel Rocha <web@emanuelrocha.cat>
```

`web@emanuelrocha.cat` se utiliza como remitente técnico; las respuestas se dirigen automáticamente al correo introducido por el visitante.

La protección incluida limita tamaño y frecuencia por instancia y añade un honeypot. Antes de una campaña de tráfico alto conviene añadir Cloudflare Turnstile o un control de frecuencia persistente.

## Despliegue principal en Cloudflare Pages

1. Subir esta carpeta a un repositorio de GitHub.
2. En Cloudflare, abrir `Workers & Pages`, crear una aplicación de Pages y
   conectar el repositorio de GitHub. No usar Direct Upload: Cloudflare no lo
   admite para proyectos con una carpeta `functions`.
3. Seleccionar `main` como rama de producción y `None` como framework preset.
4. Usar `npm run build` como Build command y `dist` como Build output directory.
5. Dejar Root directory vacío si `package.json` está en la raíz del repositorio.
   Si el repositorio contiene esta carpeta dentro de otra, usar
   `emanuelrocha-web`.
6. Añadir `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` en los
   entornos Production y Preview. En `Settings > Environment variables`, añadir
   también las variables legales descritas a continuación para Production.
7. Desplegar y comprobar que Cloudflare detecta `functions/api/contact.js`.
8. Asociar `emanuelrocha.cat`, aplicar los DNS indicados por Cloudflare y esperar
   a que el certificado figure como activo.
9. Verificar `/ca/`, `/es/`, `/api/contact`, el formulario, `robots.txt`,
   `sitemap.xml`, las cabeceras de seguridad y la redirección `/` → `/ca/`.

`wrangler.jsonc` declara `dist` como salida. `public/_headers` y
`public/_redirects` trasladan a Cloudflare las cabeceras y la redirección que
antes estaban definidas solo en `vercel.json`.

## Publicación legal sin guardar datos personales en GitHub

El NIF/NIE y el domicilio no están escritos en el repositorio. El build solo
genera `/ca/legal/` y `/es/legal/`, el enlace mínimo `Legal` y la primera capa
del formulario cuando Cloudflare recibe estas cuatro variables:

```text
LEGAL_PUBLISH=true
LEGAL_NIF=<valor completo>
LEGAL_ADDRESS_CA=<domicilio completo en catalán>
LEGAL_ADDRESS_ES=<domicilio completo en castellano>
```

Configúralas en los ajustes del proyecto de Cloudflare Pages para el entorno
Production y lanza un nuevo despliegue. Si `LEGAL_PUBLISH=true` y falta algún
dato, el build se detiene en lugar de publicar una política incompleta. En la
rama de producción `main`, también se detiene si `LEGAL_PUBLISH` no vale
exactamente `true`; así Cloudflare Pages no puede sustituir la versión pública
por otra que haya perdido el legal. En local y en ramas de preview la web sí
puede construirse sin esas páginas. Aunque estos datos no quedan en GitHub, sí
serán públicos en el HTML generado, como exige la finalidad de la página legal.

El log de un despliegue completo debe terminar con `Built 10 localized pages
plus 2 legal pages`. Si muestra `legal pages disabled`, ese build no corresponde
a producción.

`.env.example` documenta los nombres sin contener ningún dato real. Para una
prueba local se pueden definir variables ficticias y ejecutar
`npm run test:legal`.

## Caché y tipografía

Cada build calcula una huella del directorio `assets` y la incorpora a las URL
de `styles.css`, `app.js` y `legal.js`. Un cambio real de CSS o JavaScript genera
una URL distinta y evita que un despliegue nuevo reutilice una versión visual
anterior. No debe añadirse una regla de Cloudflare `Cache Everything` sobre el
HTML: Pages ya revalida sus archivos publicados.

Switzer se conserva mediante la API oficial de Fontshare. No se autoalojan sus
archivos porque la licencia de distribución de Fontshare restringe servirlos
desde infraestructura propia sin autorización previa. La conexión técnica se
explica en la política de cookies y tecnologías similares.

## Contenido

La bienvenida, las etiquetas de navegación y los metadatos SEO se concentran en `assets/content.js`. Las dos rutas extensas de cada idioma se mantienen en `assets/route-content.js`, el formulario bilingüe en `assets/form-content.js` y los seis archivos definitivos de Operaciones en `assets/operations-content.js`. Cada modificación debe ir seguida de `npm run build`; el sitemap y todas las páginas localizadas se regeneran automáticamente.

Las rutas narrativas admiten negrita, cursiva, saltos deliberados y CTA internos mediante el renderizador incluido en `assets/route-content.js`. Los títulos visibles de los documentos originales, su número de versión, las fuentes de trabajo y las notas editoriales no se publican.

## Formulario dinámico

La pantalla de contacto presenta una unidad cada vez y conserva las respuestas
al avanzar, retroceder o cambiar de idioma. La ruta directa tiene seis pasos y
la exploratoria cinco; el footer indica el progreso y solo convierte
`Continuar` en `Enviar` en el último paso. Los campos que no pertenecen a la
modalidad activa quedan ocultos y deshabilitados, por lo que no se validan ni se
envían. La opción de plazo `antes de una fecha` activa un campo de fecha
obligatorio.

La presentación mantiene el formulario editorial: las modalidades y los plazos
funcionan como expresiones seleccionables y distinguen el estado activo por
peso y contraste, sin añadir subrayados. Las instrucciones de las respuestas
abiertas se muestran completas como ayuda asociada al campo, en lugar de quedar
recortadas dentro de un `placeholder`. Nombre y correo cierran el recorrido
como una sola frase. La lógica sigue siendo un formulario HTML accesible; el
recorrido progresivo no modifica los nombres internos, la validación ni la
carga enviada al servidor.

## Lectura y cambio de idioma

Las unidades de las dos rutas tienen anclas bilingües equivalentes. Al cambiar
de idioma, la interfaz localiza la unidad centrada y restaura su equivalente en
vez de reiniciar el teleprompter. El desplazamiento usa `scroll-snap` de
proximidad, por lo que orienta la lectura sin obligar a detenerse en todos los
párrafos.

## Entrada y marca focal

La entrada inicial recupera la coreografía original de 5,8 segundos: el nombre
permanece dos segundos, la bienvenida otros dos y el desplazamiento final
dispone de 1,8 segundos. Los nodos conservan la inercia de 1,25 segundos de la
interfaz original. No se muestra un contador, y tampoco queda un proceso de
actualización asociado a él. Si el sistema solicita movimiento reducido, la
coreografía se omite y se presenta directamente la bienvenida.

Al terminar la entrada aparece una marca focal abstracta. La marca completa se
desplaza por su guía: en las rutas señala la unidad narrativa activa; en el
índice de Operaciones avanza de forma continua con el scroll y, al abrir un
archivo, cambia a seis puntos discretos; en Contacto refleja los pasos reales de
cada modalidad y se cierra al completar el envío. La marca es
decorativa para tecnologías de asistencia porque la misma información ya está
expresada en texto, no acepta clics y permanece fuera de la columna de lectura.
En móvil ocupa el margen derecho interior y, desde 768 px, se desplaza al margen
exterior. Con movimiento reducido conserva el estado sin interpolación.

`server/contact-handler.js` valida de nuevo todos los campos en el servidor y añade las respuestas estructuradas al correo enviado por Resend. `functions/api/contact.js` es el adaptador de Cloudflare y `api/contact.js` conserva la compatibilidad con Vercel. Después de modificar campos o nombres internos hay que actualizar conjuntamente `src/template.html`, `assets/app.js`, `assets/form-content.js`, `server/contact-handler.js` y `scripts/test-contact-form.mjs`.

## Archivador focal de Operaciones

La infraestructura de Operaciones está separada en tres capas:

- `assets/operations-content.js`: catálogo editorial bilingüe definitivo con los seis archivos, pruebas y límites de atribución.
- `assets/operations-workspace.js`: renderizadores, validación del contrato y cambio entre índice y lectura.
- `assets/app.js`: integración con historial, idioma, foco, footer y formulario.

Los seis archivos utilizan enlaces profundos `#op-01` a `#op-06`. El historial
mantiene dos niveles reales: índice y lectura. Abrir un archivo añade el nivel
de lectura; avanzar entre archivos reemplaza ese nivel; volver al archivador lo
consume. Así, el siguiente `Volver` sale de Operaciones sin alternar de nuevo
con el archivo. Al cambiar de idioma se mantienen tanto el archivo activo como
esta jerarquía. La superficie admite estos tipos de evidencia, uno por archivo:

```text
reframe-matrix
research-trail
scenario-comparison
workflow
claim-boundary
journey-map
```

Para cambiar el contenido sin reabrir la infraestructura, hay que conservar los seis `id`, el orden, el `evidenceType` asignado y los campos que valida `validateOperationsCatalog()`. Los renderizadores admiten entre tres y cinco unidades de evidencia y se adaptan a móvil sin acordeones, modales ni scrolls anidados. `npm run test:operations` también comprueba que los seis títulos definitivos sigan presentes.

La plantilla de encaje para el contenido definitivo se encuentra en `docs/operations-content-restructure-prompt.md`. La base legal bilingüe está implementada en `assets/legal-content.js`; `docs/legal-content-template.md` conserva el razonamiento y la copia de trabajo, y `docs/compliance-register.md` mantiene el registro interno de proveedores. La publicación queda bloqueada automáticamente mientras falten el NIF/NIE o cualquiera de las dos versiones del domicilio profesional.
