import { routeContent } from "./route-content.js";

export const routes = {
    ca: {
        home: "/ca/",
        A: "/ca/accio/",
        B: "/ca/cosmovisio/",
        contact: "/ca/contacte/",
        operations: "/ca/operacions/",
        legal: "/ca/legal/"
    },
    es: {
        home: "/es/",
        A: "/es/accion/",
        B: "/es/cosmovision/",
        contact: "/es/contacto/",
        operations: "/es/operaciones/",
        legal: "/es/legal/"
    }
};

export const copies = {
    ca: {
        tag: "Consultoria de comunicació",
        title: "Benvingut",
        back: "← Tornar",
        contact: "Contacte",
        cancel: "Cancel·lar",
        langActive: "Català",
        btnOperations: "Operacions",
        homeAria: "Anar a la pàgina d'inici",
        languageAria: "Canviar idioma",
        contactAria: "Obrir contacte",
        operationsAria: "Obrir operacions",
        proseHTML: `Al punt on eliminem el soroll de la teva comunicació comercial. Si la situació no pot continuar així, pots <button type="button" class="btn-inline-option" data-action="narrative" data-intent="A">passar a l’acció ara mateix</button>; si intueixes que alguna cosa falla però encara no veus què, et convido a <button type="button" class="btn-inline-option" data-action="narrative" data-intent="B">veure com enfoco la meva feina</button>.`,
        A: routeContent.ca.A,
        B: routeContent.ca.B
    },
    es: {
        tag: "Consultoría de comunicación",
        title: "Bienvenido",
        back: "← Volver",
        contact: "Contacto",
        cancel: "Cancelar",
        langActive: "Castellano",
        btnOperations: "Operaciones",
        homeAria: "Ir a la página de inicio",
        languageAria: "Cambiar idioma",
        contactAria: "Abrir contacto",
        operationsAria: "Abrir operaciones",
        proseHTML: `Al punto donde eliminamos el ruido de tu comunicación comercial. Si la situación no puede seguir así, puedes <button type="button" class="btn-inline-option" data-action="narrative" data-intent="A">pasar a la acción ahora mismo</button>; si intuyes que algo falla pero todavía no ves qué, te invito a <button type="button" class="btn-inline-option" data-action="narrative" data-intent="B">ver cómo enfoco mi trabajo</button>.`,
        A: routeContent.es.A,
        B: routeContent.es.B
    }
};

export const routePages = [
    { lang: "ca", key: "home", state: "welcome-ready", heading: "Consultor de comunicació a la Cerdanya", title: "Emanuel Rocha — Consultor de comunicació a la Cerdanya", description: "Consultoria de comunicació per a negocis que necessiten revisar una decisió, explicar millor el seu valor o convertir criteri en un sistema.", index: true },
    { lang: "ca", key: "A", state: "narrative", heading: "Passar a l’acció", title: "Passar a l’acció — Consultoria de comunicació | Emanuel Rocha", description: "Una ruta directa per revisar l’encàrrec, entendre què ha de canviar i decidir si cal anàlisi, comunicació o un sistema operatiu.", index: true },
    { lang: "ca", key: "B", state: "narrative", heading: "Com treballo", title: "Com treballo — Mètode i projectes | Emanuel Rocha", description: "Una història sobre preguntes que canvien, tres projectes reals i el criteri que Emanuel Rocha aplica abans de construir una solució.", index: true },
    { lang: "ca", key: "contact", state: "contact", heading: "Contacte", title: "Contacte — Explica què ha de canviar | Emanuel Rocha", description: "Explica a Emanuel Rocha què vols posar en marxa o quina situació necessita canviar per valorar el següent pas.", index: false },
    { lang: "ca", key: "operations", state: "operations", heading: "Operacions", title: "Operacions — Mètode, proves i límits | Emanuel Rocha", description: "Sis arxius oberts sobre com Emanuel Rocha reformula, investiga, decideix, construeix, comprova i lliura una solució.", index: true },
    { lang: "es", key: "home", state: "welcome-ready", heading: "Consultor de comunicación en La Cerdanya", title: "Emanuel Rocha — Consultor de comunicación en La Cerdanya", description: "Consultoría de comunicación para negocios que necesitan revisar una decisión, explicar mejor su valor o convertir criterio en un sistema.", index: true },
    { lang: "es", key: "A", state: "narrative", heading: "Pasar a la acción", title: "Pasar a la acción — Consultoría de comunicación | Emanuel Rocha", description: "Una ruta directa para revisar el encargo, entender qué debe cambiar y decidir si hace falta análisis, comunicación o un sistema operativo.", index: true },
    { lang: "es", key: "B", state: "narrative", heading: "Cómo trabajo", title: "Cómo trabajo — Método y proyectos | Emanuel Rocha", description: "Una historia sobre preguntas que cambian, tres proyectos reales y el criterio que Emanuel Rocha aplica antes de construir una solución.", index: true },
    { lang: "es", key: "contact", state: "contact", heading: "Contacto", title: "Contacto — Explica qué debe cambiar | Emanuel Rocha", description: "Cuéntale a Emanuel Rocha qué quieres poner en marcha o qué situación necesita cambiar para valorar el siguiente paso.", index: false },
    { lang: "es", key: "operations", state: "operations", heading: "Operaciones", title: "Operaciones — Método, pruebas y límites | Emanuel Rocha", description: "Seis archivos abiertos sobre cómo Emanuel Rocha reformula, investiga, decide, construye, comprueba y entrega una solución.", index: true }
];

export function equivalentRoute(page, lang) {
    return routes[lang][page.key];
}
