# Registro interno de proveedores y conservación

Última revisión: 19 de julio de 2026.

Este documento es interno. Sirve para mantener alineados la infraestructura
real, los contratos aceptados y la política de privacidad publicada.

## Tratamiento del formulario

- Responsable: Emanuel Rocha Torrico.
- Finalidad: recibir y responder consultas y valorar una posible relación
  profesional.
- Base principal: medidas precontractuales solicitadas por la persona.
- Datos: nombre, correo, respuestas del formulario, URL de origen y datos
  técnicos mínimos necesarios para seguridad y entrega.
- Consultas sin contratación: eliminación o anonimización a los tres meses
  desde la última comunicación, salvo bloqueo exigible por obligaciones o
  responsabilidades legales.
- Consultas con contratación: conservación durante la relación y los plazos
  fiscales, mercantiles o de responsabilidad que resulten aplicables.

## Encargados activos desde la migración

### Cloudflare

- Servicio: Cloudflare Pages y Pages Functions.
- Plan: Free.
- Función: alojamiento, seguridad, entrega del sitio y ejecución de
  `/api/contact`.
- Inicio previsto: 19 de julio de 2026; confirmar aquí la finalización efectiva
  de la migración.
- Acuerdo principal: Self-Serve Subscription Agreement.
- DPA: https://www.cloudflare.com/cloudflare-customer-dpa/
- Acción interna: guardar una copia del acuerdo y del DPA vigentes en la fecha
  de activación.

### Resend

- Servicio: API de correo transaccional.
- Función: convertir la solicitud validada en un mensaje dirigido a
  `hola@emanuelrocha.cat`.
- DPA: https://resend.com/legal/dpa
- Acción interna: descargar la copia ejecutada desde `Settings > Documents`.

### Hostinger

- Servicio: Hostinger Email.
- Función: recepción y almacenamiento de las consultas en el buzón
  `hola@emanuelrocha.cat`.
- Entidad indicada en el DPA: Hostinger International Ltd., Chipre.
- DPA: https://www.hostinger.com/es/legal/dpa
- Acción interna: guardar la versión incorporada a las condiciones del servicio
  y aplicar la supresión trimestral en el buzón.

## Proveedores fuera de este tratamiento

- GitHub aloja el código fuente y no recibe el contenido del formulario.
- El registrador del dominio no recibe el contenido del formulario por esa sola
  función.
- n8n y otras herramientas de trabajo solo deberán incorporarse a este registro
  si en el futuro reciben o almacenan datos procedentes del formulario.

## Control de publicación de las páginas legales

- El NIF/NIE y el domicilio no se guardan en este repositorio.
- Cloudflare Production debe definir `LEGAL_PUBLISH=true`, `LEGAL_NIF`,
  `LEGAL_ADDRESS_CA` y `LEGAL_ADDRESS_ES`.
- El build falla si se activa la publicación sin completar los tres datos.
- Confirmar después de cada cambio de infraestructura que el dominio y el
  formulario siguen sirviéndose desde los proveedores declarados.
