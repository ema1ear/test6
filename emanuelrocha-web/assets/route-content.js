function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function renderInline(source, intent) {
    const lineBreak = "__NARRATIVE_LINE_BREAK__";
    let html = escapeHtml(
        source.trim()
            .replace(/ {2}\r?\n/g, lineBreak)
            .replace(/\r?\n/g, " ")
    );
    html = html
        .replaceAll(lineBreak, "<br>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/\[\[ACTION:(.+?)\]\]/g, (_match, label) => (
            `<button type="button" class="btn-inline-option" data-action="contact-from-narrative" data-intent="${intent}">${label}</button>`
        ));
    return html;
}

function renderSources(sources, label, intent) {
    if (!sources?.length) return "";
    return `<aside class="scrolling-p narrative-sources" data-narrative-unit="${intent.toLowerCase()}-sources" aria-label="${escapeHtml(label)}"><span>${escapeHtml(label)}</span><ul>${sources.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`).join("")}</ul></aside>`;
}

function renderRoute(source, intent, sources, sourcesLabel) {
    const paragraphs = source.trim().split(/\r?\n\s*\r?\n/);
    return paragraphs
        .map((paragraph, index) => `<p class="scrolling-p" data-narrative-unit="${intent.toLowerCase()}-${String(index + 1).padStart(2, "0")}">${renderInline(paragraph, intent)}</p>`)
        .join("") + renderSources(sources, sourcesLabel, intent);
}

const commonSources = {
    es: [
        { label: "Time, France: Bank Heist of the Century", url: "https://time.com/archive/6848187/france-bank-heist-of-the-century/" },
        { label: "Dailymotion, material documental sobre el robo de Société Générale en Niza", url: "https://www.dailymotion.com/video/xa2m00s" },
        { label: "The Guardian, cobertura sobre el robo y sus responsables", url: "https://www.theguardian.com/world/2018/feb/12/jacques-cassandri-suspected-mastermind-societe-generale-france-heist-trial" },
        { label: "The Guardian, referencia a la frase dejada en la cámara", url: "https://www.theguardian.com/world/2010/mar/30/paris-robbers-dig-bank" },
        { label: "The Independent, reconstrucción del robo de 1976", url: "https://www.independent.co.uk/news/world/europe/who-really-masterminded-france-s-crime-of-the-century-2058069.html" }
    ],
    ca: [
        { label: "Time, France: Bank Heist of the Century", url: "https://time.com/archive/6848187/france-bank-heist-of-the-century/" },
        { label: "Dailymotion, material documental sobre el robatori de Société Générale a Niça", url: "https://www.dailymotion.com/video/xa2m00s" },
        { label: "The Guardian, cobertura sobre el robatori i els seus responsables", url: "https://www.theguardian.com/world/2018/feb/12/jacques-cassandri-suspected-mastermind-societe-generale-france-heist-trial" },
        { label: "The Guardian, referència a la frase deixada a la cambra", url: "https://www.theguardian.com/world/2010/mar/30/paris-robbers-dig-bank" },
        { label: "The Independent, reconstrucció del robatori de 1976", url: "https://www.independent.co.uk/news/world/europe/who-really-masterminded-france-s-crime-of-the-century-2058069.html" }
    ]
};

const fastEs = `Hay encargos que llegan demasiado bien formulados.

Una web. Una campaña. Formación en IA. Un sistema que ahorre tiempo.

Cuanto más concreta parece la solución, más fácil es empezar a ejecutarla. Y más caro puede resultar descubrir después que respondía a la pregunta equivocada.

Si ya sabes qué quieres poner en marcha, podemos ir al punto. Si solo sabes que algo no puede seguir igual, también podemos empezar por ahí.

[[ACTION:Pasar a la acción.]]

A veces el problema está antes de cualquier texto: no está claro qué cambiar, para quién ni con qué prioridad. Ahí trabajo en **análisis, investigación y posicionamiento** hasta convertir la incertidumbre en una decisión.

Otras veces, la decisión ya está tomada y el valor existe, pero cuesta verlo desde fuera. Entonces trabajo en **comunicación y copy**: webs, páginas de servicio, propuestas y piezas comerciales que expliquen qué cambia y por qué importa.

También hay soluciones que funcionan mientras alguien recuerda qué hacer, en qué orden y con qué criterio. Cuando la memoria sostiene el proceso, diseño **sistemas, protocolos y automatizaciones** para que el trabajo no dependa de estar siempre ahí.

Una decisión, un mensaje y un proceso pueden fallar de maneras muy distintas. Aun así, antes de cambiar nada conviene hacer la misma pregunta:

¿La solución sigue respondiendo al problema que debía resolver?

Las soluciones no suelen dejar de funcionar de golpe. Envejecen.

No empiezo por ejecutar lo que me piden. Empiezo por comprobar qué tendría que cambiar.

Un responsable operativo me pidió formación en *prompt engineering*. La petición tenía sentido. Pero, al revisar el proceso, el tiempo no se perdía por falta de instrucciones: se perdía buscando información y preparando documentos. Por eso desarrollé un sistema privado de investigación y automatización documental que podía utilizarse y replicarse sin depender de mí. El trabajo repetitivo disminuyó; la preparación ganó rapidez y consistencia.

BAMODOG pensaba mejorar la fidelización con regalos para sus clientes y sus perros. El cuidado ya era bueno, pero no siempre se transmitía igual cuando el cliente estaba de viaje. En lugar de añadir otro detalle, estructuré los reportes por WhatsApp. Hubo menos improvisación y más consistencia. Un cliente lo resumió así: «con vosotros todo muy fácil».

Una promotora de La Cerdanya quería corregir la noticia que había desencadenado protestas y presión política. Pero el conflicto no estaba solo en el artículo: una institución histórica iba a desaparecer y nadie había explicado cómo conservar parte de su valor. Analicé el rechazo y entregué un plan de respuesta, sin intervenir en su ejecución. Después cesaron las publicaciones y protestas, y la obra continuó sin retrasos por esta causa.

Soy Emanuel Rocha. He trabajado entre editoriales, comercio, inmobiliario y negocios locales. Quizá por eso me cuesta tratar un texto como si no dependiera de la decisión que lo precede o del proceso que tendrá que sostenerlo.

No todo necesita una intervención amplia. A veces basta una decisión, una pieza o un ajuste. Prefiero decirlo antes que convertir un problema pequeño en un proyecto grande. Y si no puedo resolverlo, también.

Puedes llegar con un encargo concreto o únicamente con la sensación de que algo no puede seguir igual.

Te diré si puedo ayudarte, qué profundidad merece y cuándo una solución más sencilla sería suficiente.

[[ACTION:Pasar a la acción.]]`;

const fastCa = `Hi ha encàrrecs que arriben massa ben formulats.

Un web. Una campanya. Formació en IA. Un sistema que estalviï temps.

Com més concreta sembla la solució, més fàcil és començar a executar-la. I més car pot resultar descobrir després que responia a la pregunta equivocada.

Si ja saps què vols posar en marxa, podem anar al gra. Si només saps que alguna cosa no pot continuar igual, també podem començar per aquí.

[[ACTION:Passar a l’acció.]]

De vegades el problema és abans de qualsevol text: no queda clar què ha de canviar, per a qui ni amb quina prioritat. Aquí treballo en **anàlisi, investigació i posicionament** fins a convertir la incertesa en una decisió.

Altres vegades, la decisió ja està presa i el valor existeix, però costa veure’l des de fora. Aleshores treballo en **comunicació i copy**: webs, pàgines de servei, propostes i peces comercials que expliquin què canvia i per què importa.

També hi ha solucions que funcionen mentre algú recorda què cal fer, en quin ordre i amb quin criteri. Quan la memòria sosté el procés, dissenyo **sistemes, protocols i automatitzacions** perquè la feina no depengui de ser-hi sempre.

Una decisió, un missatge i un procés poden fallar de maneres molt diferents. Tot i així, abans de canviar res convé fer la mateixa pregunta:

La solució continua responent al problema que havia de resoldre?

Les solucions no solen deixar de funcionar de cop. Envelleixen.

No començo executant allò que em demanen. Començo comprovant què hauria de canviar.

Un responsable d’operacions em va demanar formació en *prompt engineering*. La petició tenia sentit. Però, en revisar el procés, el temps no es perdia per manca d’instruccions: es perdia buscant informació i preparant documents. Per això vaig desenvolupar un sistema privat d’investigació i automatització documental que es podia fer servir i replicar sense dependre de mi. La feina repetitiva va disminuir; la preparació va guanyar rapidesa i consistència.

BAMODOG pensava millorar la fidelització amb regals per als seus clients i els seus gossos. La cura ja era bona, però no sempre es transmetia igual quan el client era de viatge. En lloc d’afegir un altre detall, vaig estructurar els informes per WhatsApp. Hi va haver menys improvisació i més consistència. Un client ho va resumir així: «amb vosaltres tot és molt fàcil».

Una promotora de la Cerdanya volia corregir la notícia que havia desencadenat protestes i pressió política. Però el conflicte no era només a l’article: una institució històrica havia de desaparèixer i ningú no havia explicat com conservar part del seu valor. Vaig analitzar el rebuig i vaig lliurar un pla de resposta, sense intervenir en la seva execució. Després van cessar les publicacions i les protestes, i l’obra va continuar sense retards per aquesta causa.

Soc Emanuel Rocha. He treballat entre editorials, comerç, immobiliari i negocis locals. Potser per això em costa tractar un text com si no depengués de la decisió que el precedeix o del procés que l’haurà de sostenir.

No tot necessita una intervenció àmplia. De vegades n’hi ha prou amb una decisió, una peça o un ajust. Prefereixo dir-ho abans que convertir un problema petit en un projecte gran. I si no el puc resoldre, també.

Pots arribar amb un encàrrec concret o només amb la sensació que alguna cosa no pot continuar igual.

Et diré si et puc ajudar, quin nivell de profunditat mereix i quan una solució més senzilla seria suficient.

[[ACTION:Passar a l’acció.]]`;

const narrativeEs = `¿Conoces la historia del banco que perdió 46 millones de francos sin que nadie entrara por la puerta?

Ocurrió en Niza, en 1976. El lunes 19 de julio, los empleados de Société Générale descubrieron que no podían entrar en la cámara acorazada.

Al principio debió de parecer una avería. Pero la cerradura funcionaba: la puerta había sido soldada desde dentro.

¿Cómo había entrado alguien y cerrado después el único acceso a sus espaldas?

La cámara estaba protegida por una envolvente de hormigón armado de 1,80 metros de espesor. No tenía detección acústica o sísmica porque sus muros se consideraban protección suficiente: no parecían una parte vulnerable del edificio, sino el final de cualquier intento de atravesarlo.

Cuando consiguieron acceder, encontraron cajas abiertas, armarios forzados, herramientas y escombros. Más de trescientas cajas de seguridad habían sido vaciadas. El botín se estimó en unos 46 millones de francos.

La entrada no había sido improvisada. Durante meses, la banda había descendido a las alcantarillas, recorrido varios kilómetros bajo la ciudad y excavado a mano un túnel de ocho metros hasta alcanzar el exterior del muro.

El cierre del banco durante el largo fin de semana del 14 de julio les dio el tiempo que necesitaban. Abrieron un paso a través del hormigón, desplazaron un cofre de cinco toneladas y permanecieron dos días dentro, seleccionando lo que se llevarían.

Antes de marcharse, los ladrones dejaron escrita una frase: *Sin armas, sin odio, sin violencia.*

La puerta seguía cerrada. El muro, que el banco no consideraba una vía de entrada, había servido precisamente para entrar.

El banco había organizado su seguridad para responder a una pregunta:

¿Cómo protegemos la entrada a la cámara?

Los ladrones formularon otra:

¿Y si entramos por otro sitio?

No encontraron una respuesta mejor. Cambiaron la pregunta.

Esa pregunta convirtió una defensa formidable en algo prácticamente irrelevante.

Ese es también uno de los riesgos menos visibles de una empresa, aunque rara vez deje escombros.

Puede tener una web correctamente diseñada, una campaña bien ejecutada, herramientas más rápidas y procesos cada vez más perfeccionados. Puede seguir mejorando aquello que durante años le permitió vender, explicarse o tomar decisiones.

Y continuar, sin saberlo, reforzando una puerta que nadie intenta atravesar ya.

Porque el cliente cambia.  
El negocio cambia.  
La tecnología cambia.  
La pregunta desde la que se actúa, a veces, no.

La vulnerabilidad de Société Générale no estaba solo en un muro, una alarma o una puerta, sino en una certeza: creer que el próximo problema tendría que parecerse al anterior.

Las soluciones no suelen dejar de funcionar de golpe.  
Envejecen.  
Y el problema comienza cuando seguimos perfeccionando una respuesta para una pregunta que ya ha cambiado.

En mi trabajo, esas preguntas rara vez llegan formuladas como preguntas.

Suelen llegar como una solución.

Un responsable operativo de una firma inmobiliaria de La Cerdanya quería formar al equipo en *prompt engineering*. El proceso comercial funcionaba, pero todavía dependía de búsquedas dispersas y tareas repetitivas.

Antes de preparar la formación, revisé dónde se perdía tiempo, qué datos podía utilizar la tecnología, qué límites imponía la protección de datos y si el ahorro justificaba el coste.

El encargo cambió.

Desarrollé un sistema privado de investigación y automatización documental que el equipo podía utilizar sin depender de mí. Redujo el trabajo repetitivo y mejoró la rapidez y la consistencia al preparar información y documentos.

Los compradores valoraron el trato y la agilidad recibidos. Las ventas, sin embargo, no se atribuyen al sistema.

BAMODOG quería mejorar la fidelización con regalos para sus clientes y sus perros. Antes de añadir un coste a cada estancia, revisé la experiencia.

El cuidado presencial era bueno. Los reportes por WhatsApp podían llegar tarde, contener poca información o cambiar según la persona que atendiera.

Convertí esa comunicación en un sistema: mensaje de llegada, reporte de mediodía, cierre de jornada, plantillas y criterios de tono.

Se redujeron la improvisación, el tiempo de respuesta y las diferencias entre personas. Los clientes empezaron a decir: «con vosotros todo muy fácil»; «así uno puede estar más tranquilo de viaje». El negocio conservó los protocolos.

Una promotora inmobiliaria de La Cerdanya se enfrentaba a protestas y presión política por un proyecto que implicaba la desaparición de una institución histórica local.

La primera reacción fue hablar con el medio que había publicado la noticia para intentar corregirla.

El conflicto no estaba solo en el artículo. Aquel lugar tenía un significado para la comunidad y nadie había explicado cómo se conservaría parte de su valor.

Trabajé de forma confidencial con el responsable, analicé las causas del rechazo y preparé un plan de respuesta para el equipo. En lugar de pagar una compensación sin un destino claro, se propuso apoyar actividades culturales en la institución que asumiría esa función.

Tras aplicar el plan, cesaron las publicaciones y protestas relacionadas con el conflicto, terminó la presión política y la obra pudo continuar sin retrasos por esta causa. Los problemas financieros posteriores de la promotora no guardaron relación con este trabajo.

Una formación, un regalo, una rectificación.

Tres soluciones razonables.

Soy Emanuel Rocha. He trabajado entre editoriales, comercio, inmobiliario y negocios locales. En los tres casos, mi trabajo empezó antes de ejecutar nada: separando la solución solicitada del problema que debía resolver.

De ahí salen tres puntos de entrada.

Si todavía no está claro qué debe cambiar, trabajo en **análisis, investigación y posicionamiento** para definir qué problema abordar, para quién y con qué prioridad.

Si el valor existe, pero cuesta explicarlo o distinguirlo, trabajo en **comunicación y copy**: webs, páginas de servicio, propuestas y piezas comerciales.

Si una solución funciona, pero depende de la memoria o el criterio de una persona, diseño **sistemas, protocolos y automatizaciones** que reduzcan la improvisación.

No hace falta que llegues sabiendo qué necesitas. A veces, empezar por una solución demasiado pronto es precisamente el problema.

[[ACTION:Cuéntame qué está ocurriendo]], qué has intentado y qué debería cambiar. Te diré si puedo ayudarte, qué profundidad merece y también cuándo otra solución sería más adecuada.`;

const narrativeCa = `Coneixes la història del banc que va perdre 46 milions de francs sense que ningú hi entrés per la porta?

Va passar a Niça, el 1976. El dilluns 19 de juliol, els empleats de Société Générale van descobrir que no podien entrar a la cambra cuirassada.

Al principi devia semblar una avaria. Però el pany funcionava: la porta havia estat soldada des de dins.

Com havia entrat algú i tancat després l’únic accés a la seva esquena?

La cambra estava protegida per una envolupant de formigó armat d’1,80 metres de gruix. No tenia detecció acústica ni sísmica perquè els seus murs es consideraven protecció suficient: no semblaven una part vulnerable de l’edifici, sinó el final de qualsevol intent de travessar-los.

Quan van aconseguir accedir-hi, van trobar caixes obertes, armaris forçats, eines i runa. Més de tres-centes caixes de seguretat havien estat buidades. El botí es va estimar en uns 46 milions de francs.

L’entrada no havia estat improvisada. Durant mesos, la banda havia baixat a les clavegueres, recorregut diversos quilòmetres sota la ciutat i excavat a mà un túnel de vuit metres fins a arribar a la cara exterior del mur.

El tancament del banc durant el llarg cap de setmana del 14 de juliol els va donar el temps que necessitaven. Van obrir un pas a través del formigó, van desplaçar una caixa forta de cinc tones i van romandre dos dies a dins, seleccionant què s’endurien.

Abans de marxar, els lladres van deixar escrita una frase: *Sense armes, sense odi, sense violència.*

La porta continuava tancada. El mur, que el banc no considerava una via d’entrada, havia servit precisament per entrar.

El banc havia organitzat la seva seguretat per respondre una pregunta:

Com protegim l’entrada a la cambra?

Els lladres en van formular una altra:

I si entrem per un altre lloc?

No van trobar una resposta millor. Van canviar la pregunta.

Aquesta pregunta va convertir una defensa formidable en una cosa pràcticament irrellevant.

Aquest és també un dels riscos menys visibles d’una empresa, encara que rarament deixi runa.

Pot tenir un web ben dissenyat, una campanya ben executada, eines més ràpides i processos cada vegada més perfeccionats. Pot continuar millorant allò que durant anys li va permetre vendre, explicar-se o prendre decisions.

I continuar, sense saber-ho, reforçant una porta que ningú ja no intenta travessar.

Perquè el client canvia.  
El negoci canvia.  
La tecnologia canvia.  
La pregunta des de la qual s’actua, de vegades, no.

La vulnerabilitat de Société Générale no era només en un mur, una alarma o una porta, sinó en una certesa: creure que el problema següent s’hauria d’assemblar a l’anterior.

Les solucions no solen deixar de funcionar de cop.  
Envelleixen.  
I el problema comença quan continuem perfeccionant una resposta per a una pregunta que ja ha canviat.

En la meva feina, aquestes preguntes poques vegades arriben formulades com a preguntes.

Solen arribar com una solució.

Un responsable d’operacions d’una immobiliària de la Cerdanya volia formar l’equip en *prompt engineering*. El procés comercial funcionava, però encara depenia de cerques disperses i tasques repetitives.

Abans de preparar la formació, vaig revisar en quins punts es perdia temps, quines dades podia fer servir la tecnologia, quins límits imposava la protecció de dades i si l’estalvi justificava el cost.

L’encàrrec va canviar.

Vaig desenvolupar un sistema privat d’investigació i automatització documental que l’equip podia fer servir sense dependre de mi. Va reduir la feina repetitiva i va millorar la rapidesa i la consistència a l’hora de preparar informació i documents.

Els compradors van valorar el tracte i l’agilitat rebuts. Tanmateix, les vendes no s’atribueixen al sistema.

BAMODOG volia millorar la fidelització amb regals per als seus clients i els seus gossos. Abans d’afegir un cost a cada estada, vaig revisar l’experiència.

L’atenció presencial era bona. Els informes per WhatsApp podien arribar tard, contenir poca informació o variar segons la persona que atenia.

Vaig convertir aquesta comunicació en un sistema: missatge d’arribada, informe de migdia, tancament de jornada, plantilles i criteris de to.

Es van reduir la improvisació, el temps de resposta i les diferències entre persones. Els clients van començar a dir: «amb vosaltres tot és molt fàcil»; «així un pot estar més tranquil quan viatja». El negoci va conservar els protocols.

Una promotora immobiliària de la Cerdanya s’enfrontava a protestes i pressió política per un projecte que implicava la desaparició d’una institució històrica local.

La primera reacció va ser parlar amb el mitjà que havia publicat la notícia per intentar corregir-la.

El conflicte no era només a l’article. Aquell lloc tenia un significat per a la comunitat i ningú no havia explicat com se’n conservaria part del valor.

Vaig treballar de manera confidencial amb el responsable, vaig analitzar les causes del rebuig i vaig preparar un pla de resposta per a l’equip. En lloc de pagar una compensació sense una destinació clara, es va proposar donar suport a activitats culturals a la institució que assumiria aquesta funció.

Després d’aplicar el pla, van cessar les publicacions i protestes relacionades amb el conflicte, va acabar la pressió política i l’obra va poder continuar sense retards per aquesta causa. Els problemes financers posteriors de la promotora no tenien relació amb aquesta feina.

Una formació, un regal, una rectificació.

Tres solucions raonables.

Soc Emanuel Rocha. He treballat entre editorials, comerç, immobiliari i negocis locals. En els tres casos, la meva feina va començar abans d’executar res: separant la solució sol·licitada del problema que havia de resoldre.

D’aquí en surten tres punts d’entrada.

Si encara no queda clar què ha de canviar, treballo en **anàlisi, investigació i posicionament** per definir quin problema abordar, per a qui i amb quina prioritat.

Si el valor existeix, però costa explicar-lo o distingir-lo, treballo en **comunicació i copy**: webs, pàgines de servei, propostes i peces comercials.

Si una solució funciona, però depèn de la memòria o del criteri d’una persona, dissenyo **sistemes, protocols i automatitzacions** que redueixin la improvisació.

No cal que sàpigues què necessites. De vegades, començar massa aviat per una solució és precisament el problema.

[[ACTION:Explica’m què està passant]], què has intentat i què hauria de canviar. Et diré si et puc ajudar, quin nivell de profunditat mereix i també quan una altra solució seria més adequada.`;

export const routeContent = {
    ca: {
        A: renderRoute(fastCa, "A"),
        B: renderRoute(narrativeCa, "B", commonSources.ca, "Fonts")
    },
    es: {
        A: renderRoute(fastEs, "A"),
        B: renderRoute(narrativeEs, "B", commonSources.es, "Fuentes")
    }
};
