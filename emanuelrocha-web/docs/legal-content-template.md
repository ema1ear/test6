# Plantilla legal bilingüe e integración compacta

> Documento de trabajo y trazabilidad. La versión integrada se encuentra en
> `assets/legal-content.js`. Los datos identificativos se inyectan durante el
> build mediante variables de Cloudflare y no se guardan en GitHub.

## Decisión de integración

La solución más compacta es crear una sola página por idioma:

- `/ca/legal/`
- `/es/legal/`

Cada página agrupará **aviso legal**, **privacidad** y **cookies**. Se añadirá
un único enlace visible `Legal` en el footer y un enlace contextual bajo el
formulario. Las páginas podrán usar `noindex, follow`: serán accesibles sin
competir con las rutas comerciales en buscadores.

La información básica de privacidad debe aparecer en el propio formulario y
enlazar a la información completa. No hace falta una casilla de consentimiento
para responder una consulta cuando la base jurídica sea la aplicación de
medidas precontractuales solicitadas por la propia persona. Cualquier envío
publicitario posterior necesitaría una base y un mecanismo independientes.

## Estado de los datos

Confirmado:

- Titular: Emanuel Rocha Torrico.
- Actividad ejercida como autónomo persona física. Los datos registrales,
  colegiales y de profesión regulada no resultan aplicables con la actividad
  declarada de consultoría de comunicación.
- Conservación de consultas sin contratación: tres meses desde la última
  comunicación.
- Alojamiento definitivo: Cloudflare Pages y Pages Functions, plan Free, con
  migración prevista para el 19 de julio de 2026.
- Entrega del formulario: Resend.
- Buzón receptor: Hostinger Email.
- Los DPA de Cloudflare, Resend y Hostinger forman parte de sus respectivos
  acuerdos de servicio o se aceptan electrónicamente.

La publicación requiere estas variables de Cloudflare:

1. `LEGAL_PUBLISH=true`.
2. `LEGAL_NIF`.
3. `LEGAL_ADDRESS_CA`.
4. `LEGAL_ADDRESS_ES`.

El build se detiene si se activa la publicación y falta alguna. Los valores no
forman parte del repositorio, aunque serán visibles en el HTML público.

## Primera capa del formulario — castellano

**Responsable:** Emanuel Rocha Torrico. **Finalidad:** atender tu consulta, valorar
si puedo ayudarte y gestionar los pasos previos a una posible relación
profesional. **Legitimación:** aplicación de medidas precontractuales que
solicitas y, para proteger el formulario frente a usos abusivos, interés
legítimo. **Destinatarios:** proveedores técnicos de alojamiento y entrega de
correo; pueden existir transferencias internacionales con las garantías
indicadas en la información completa. **Derechos:** puedes solicitar acceso,
rectificación, supresión, oposición, limitación y portabilidad escribiendo a
hola@emanuelrocha.cat. [Más información sobre privacidad].

## Primera capa del formulario — català

**Responsable:** Emanuel Rocha Torrico. **Finalitat:** atendre la teva consulta, valorar
si et puc ajudar i gestionar els passos previs a una possible relació
professional. **Legitimació:** aplicació de mesures precontractuals que
sol·licites i, per protegir el formulari davant d’usos abusius, interès legítim.
**Destinataris:** proveïdors tècnics d’allotjament i lliurament de correu; poden
existir transferències internacionals amb les garanties indicades en la
informació completa. **Drets:** pots sol·licitar accés, rectificació, supressió,
oposició, limitació i portabilitat escrivint a hola@emanuelrocha.cat. [Més
informació sobre privacitat].

---

# Texto base — castellano

## Aviso legal

### Titular

Este sitio web, disponible en `emanuelrocha.cat`, es titularidad de:

- Titular: Emanuel Rocha Torrico
- NIF/NIE: [NIF/NIE]
- Domicilio profesional: [DIRECCIÓN, CÓDIGO POSTAL, LOCALIDAD, PROVINCIA, ESPAÑA]
- Correo electrónico: hola@emanuelrocha.cat

### Finalidad y condiciones de uso

El sitio presenta servicios profesionales de consultoría de comunicación,
expone criterios y métodos de trabajo y permite enviar consultas. El acceso es
libre y no crea por sí solo una relación contractual ni constituye una oferta
cerrada de contratación.

La persona usuaria se compromete a utilizar el sitio de forma lícita, a no
interferir con su funcionamiento y a no enviar a través del formulario
contenidos ilícitos, datos de terceras personas sin autorización ni categorías
especiales de datos personales que no sean necesarias para la consulta.

### Propiedad intelectual

Salvo indicación distinta, los textos, estructura, diseño y materiales propios
del sitio pertenecen a Emanuel Rocha Torrico o se utilizan con autorización. Pueden citarse
fragmentos breves con identificación de la fuente cuando la ley lo permita. La
reproducción, transformación o explotación sustancial del contenido requiere
autorización previa. Las marcas, tipografías y materiales de terceros se rigen
por sus respectivas licencias.

### Responsabilidad y legislación

Se procura mantener la información disponible y actualizada, pero no se
garantiza la ausencia absoluta de errores o interrupciones. El contenido tiene
carácter general y no sustituye un diagnóstico profesional adaptado a un caso
concreto. Los enlaces externos, si los hubiera, se ofrecen como referencia y
no implican control sobre sus contenidos.

Este aviso se rige por la legislación española. Cualquier controversia se
someterá a los juzgados y tribunales que resulten competentes conforme a la
normativa aplicable.

## Política de privacidad

### Responsable

Emanuel Rocha Torrico, con NIF/NIE [NIF/NIE], domicilio profesional en [DOMICILIO] y
correo de contacto hola@emanuelrocha.cat.

### Datos tratados

El formulario solicita nombre, correo electrónico y la información que la
persona decida facilitar sobre su proyecto o situación. El sistema puede tratar
datos técnicos mínimos, como dirección IP, fecha, URL de origen y registros de
seguridad, para entregar la solicitud y limitar usos abusivos.

No se solicitan categorías especiales de datos. Se recomienda no incluir
información sensible ni datos personales de terceros que no sean necesarios.

### Finalidades y bases jurídicas

- Atender y responder consultas, valorar el encaje profesional y preparar, si
  procede, una propuesta: aplicación de medidas precontractuales solicitadas
  por la persona interesada.
- Mantener la seguridad, prevenir abuso y resolver incidencias técnicas:
  interés legítimo en proteger el sitio y sus canales de contacto.
- Cumplir obligaciones legales cuando sean aplicables: cumplimiento de una
  obligación legal.

Los datos del formulario no se utilizarán para enviar publicidad sin una base
jurídica y una información específicas.

### Destinatarios y proveedores

No se venden datos ni se ceden para fines comerciales de terceros. Pueden
acceder a ellos proveedores que actúan para prestar la infraestructura:

- Cloudflare, como proveedor de alojamiento, seguridad y ejecución de la
  función que recibe el formulario, mediante Cloudflare Pages y Pages
  Functions en el plan Free.
- Resend, como proveedor de entrega del correo generado por el formulario.
- Hostinger, como proveedor del buzón `hola@emanuelrocha.cat` en el que se
  reciben y conservan las consultas.

### Transferencias internacionales

Cloudflare y Resend pueden tratar datos en Estados Unidos. Las transferencias
se apoyan en las garantías recogidas en sus DPA, incluida, según corresponda,
la participación en el Marco de Privacidad de Datos UE–EE. UU. y las cláusulas
contractuales tipo de la Comisión Europea. Hostinger International Ltd. está
establecida en Chipre; su DPA incorpora cláusulas contractuales tipo cuando
intervienen transferencias fuera del Espacio Económico Europeo. Puede solicitarse
información sobre estas garantías escribiendo a hola@emanuelrocha.cat.

### Conservación

Las consultas que no den lugar a una relación profesional se conservarán
durante tres meses desde la última comunicación y después se suprimirán o
anonimizarán, salvo que resulte necesario mantenerlas bloqueadas para atender
una obligación legal o posibles responsabilidades. Si existe contratación, los
datos se conservarán durante la relación y los plazos exigidos por la normativa
fiscal, mercantil o de responsabilidad aplicable.

### Derechos

Puedes solicitar acceso, rectificación, supresión, oposición, limitación del
tratamiento y portabilidad escribiendo a hola@emanuelrocha.cat. La solicitud
debe permitir verificar razonablemente la identidad y concretar el derecho que
se desea ejercer. También puedes presentar una reclamación ante la Agencia
Española de Protección de Datos (`aepd.es`).

### Seguridad y actualización

Se aplican medidas técnicas y organizativas proporcionadas al riesgo. Esta
política se revisará cuando cambien el formulario, los proveedores, las
finalidades o la normativa. Última actualización: 19 de julio de 2026.

## Cookies y tecnologías similares

La versión actual no instala desde su propio código cookies analíticas,
publicitarias ni de personalización, ni almacena preferencias en el navegador.
Por ello no necesita un banner de consentimiento mientras se mantenga esta
configuración.

El sitio carga una tipografía desde Fontshare. Esa petición técnica comunica al
servidor externo datos de conexión necesarios para entregar el recurso. Como
alternativa de minimización, la tipografía puede alojarse localmente si su
licencia lo permite.

Si en el futuro se incorporan analítica, publicidad, vídeos embebidos, mapas u
otras tecnologías no necesarias, habrá que revisar esta sección y bloquearlas
hasta obtener el consentimiento cuando sea exigible.

---

# Text base — català

## Avís legal

### Titular

Aquest lloc web, disponible a `emanuelrocha.cat`, és titularitat de:

- Titular: Emanuel Rocha Torrico
- NIF/NIE: [NIF/NIE]
- Domicili professional: [ADREÇA, CODI POSTAL, LOCALITAT, PROVÍNCIA, ESPANYA]
- Correu electrònic: hola@emanuelrocha.cat

### Finalitat i condicions d’ús

El lloc presenta serveis professionals de consultoria de comunicació, exposa
criteris i mètodes de treball i permet enviar consultes. L’accés és lliure i no
crea per si mateix una relació contractual ni constitueix una oferta tancada de
contractació.

La persona usuària es compromet a utilitzar el lloc de manera lícita, a no
interferir en el seu funcionament i a no enviar a través del formulari
continguts il·lícits, dades de terceres persones sense autorització ni
categories especials de dades personals que no siguin necessàries.

### Propietat intel·lectual

Llevat que s’indiqui el contrari, els textos, l’estructura, el disseny i els
materials propis del lloc pertanyen a Emanuel Rocha Torrico o s’utilitzen amb autorització.
Es poden citar fragments breus identificant-ne la font quan la llei ho permeti.
La reproducció, transformació o explotació substancial del contingut requereix
autorització prèvia. Les marques, tipografies i materials de tercers es regeixen
per les seves llicències respectives.

### Responsabilitat i legislació

Es procura mantenir la informació disponible i actualitzada, però no es
garanteix l’absència absoluta d’errors o interrupcions. El contingut té caràcter
general i no substitueix un diagnòstic professional adaptat a un cas concret.
Els enllaços externs, si n’hi ha, s’ofereixen com a referència i no impliquen
control sobre els seus continguts.

Aquest avís es regeix per la legislació espanyola. Qualsevol controvèrsia se
sotmetrà als jutjats i tribunals que siguin competents d’acord amb la normativa
aplicable.

## Política de privacitat

### Responsable

Emanuel Rocha Torrico, amb NIF/NIE [NIF/NIE], domicili professional a [DOMICILI] i correu
de contacte hola@emanuelrocha.cat.

### Dades tractades

El formulari sol·licita nom, correu electrònic i la informació que la persona
decideixi facilitar sobre el seu projecte o situació. El sistema pot tractar
dades tècniques mínimes, com l’adreça IP, la data, l’URL d’origen i registres de
seguretat, per lliurar la sol·licitud i limitar usos abusius.

No se sol·liciten categories especials de dades. Es recomana no incloure
informació sensible ni dades personals de tercers que no siguin necessàries.

### Finalitats i bases jurídiques

- Atendre i respondre consultes, valorar l’encaix professional i preparar, si
  escau, una proposta: aplicació de mesures precontractuals sol·licitades per la
  persona interessada.
- Mantenir la seguretat, prevenir abusos i resoldre incidències tècniques:
  interès legítim a protegir el lloc i els canals de contacte.
- Complir obligacions legals quan siguin aplicables: compliment d’una obligació
  legal.

Les dades del formulari no s’utilitzaran per enviar publicitat sense una base
jurídica i una informació específiques.

### Destinataris i proveïdors

No es venen dades ni se cedeixen per a finalitats comercials de tercers. Hi
poden accedir proveïdors que actuen per prestar la infraestructura:

- Cloudflare, com a proveïdor d’allotjament, seguretat i execució de la funció
  que rep el formulari, mitjançant Cloudflare Pages i Pages Functions en el pla
  Free.
- Resend, com a proveïdor de lliurament del correu generat pel formulari.
- Hostinger, com a proveïdor de la bústia `hola@emanuelrocha.cat` on es reben i
  es conserven les consultes.

### Transferències internacionals

Cloudflare i Resend poden tractar dades als Estats Units. Les transferències es
basen en les garanties recollides als seus DPA, inclosa, segons correspongui,
la participació en el Marc de Privacitat de Dades UE–EUA i les clàusules
contractuals tipus de la Comissió Europea. Hostinger International Ltd. està
establerta a Xipre; el seu DPA incorpora clàusules contractuals tipus quan hi
ha transferències fora de l’Espai Econòmic Europeu. Es pot sol·licitar
informació sobre aquestes garanties escrivint a hola@emanuelrocha.cat.

### Conservació

Les consultes que no donin lloc a una relació professional es conservaran
durant tres mesos des de l’última comunicació i després se suprimiran o
s’anonimitzaran, llevat que sigui necessari mantenir-les bloquejades per
atendre una obligació legal o possibles responsabilitats. Si hi ha
contractació, les dades es conservaran durant la relació i els terminis exigits
per la normativa fiscal, mercantil o de responsabilitat aplicable.

### Drets

Pots sol·licitar accés, rectificació, supressió, oposició, limitació del
tractament i portabilitat escrivint a hola@emanuelrocha.cat. La sol·licitud ha
de permetre verificar raonablement la identitat i concretar el dret que es vol
exercir. També pots presentar una reclamació davant l’Agència Espanyola de
Protecció de Dades (`aepd.es`).

### Seguretat i actualització

S’apliquen mesures tècniques i organitzatives proporcionades al risc. Aquesta
política es revisarà quan canviïn el formulari, els proveïdors, les finalitats o
la normativa. Darrera actualització: 19 de juliol de 2026.

## Galetes i tecnologies similars

La versió actual no instal·la des del seu propi codi galetes analítiques,
publicitàries ni de personalització, ni desa preferències al navegador. Per
això no necessita un bàner de consentiment mentre es mantingui aquesta
configuració.

El lloc carrega una tipografia des de Fontshare. Aquesta petició tècnica
comunica al servidor extern dades de connexió necessàries per lliurar el recurs.
Es manté l’API oficial perquè la llicència de Fontshare restringeix servir els
fitxers des d’infraestructura pròpia sense autorització prèvia.

Si en el futur s’incorporen analítica, publicitat, vídeos incrustats, mapes o
altres tecnologies no necessàries, caldrà revisar aquesta secció i bloquejar-les
fins a obtenir el consentiment quan sigui exigible.

## Fuentes oficiales utilizadas

- LSSI, artículo 10: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- RGPD, artículos 6, 12, 13 y 15–22: https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=es
- LOPDGDD: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- AEPD, deber de información por capas: https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/6-el-deber-de-informacion/FAQ-0217-que-informacion-debe-facilitarse-cuando-los-datos-se-obtengan-directamente-del-afectado
- AEPD, guía de cookies: https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/aepd-actualiza-guia-cookies-para-adaptarla-a-nuevas-directrices-cepd
- Comisión Europea, transferencias UE–EE. UU.: https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en
- Cloudflare, DPA: https://www.cloudflare.com/cloudflare-customer-dpa/
- Resend, DPA: https://resend.com/legal/dpa
- Hostinger, DPA: https://www.hostinger.com/es/legal/dpa
