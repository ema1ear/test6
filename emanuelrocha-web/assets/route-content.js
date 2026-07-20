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

function renderRoute(source, intent) {
    const paragraphs = source.trim().split(/\r?\n\s*\r?\n/);
    return paragraphs
        .map((paragraph, index) => `<p class="scrolling-p" data-narrative-unit="${intent.toLowerCase()}-${String(index + 1).padStart(2, "0")}">${renderInline(paragraph, intent)}</p>`)
        .join("");
}

const fastEs = `Hay encargos que llegan demasiado bien formulados.

Una web. Una campaña. Formación en IA. Un sistema que ahorre tiempo.

Cuanto más concreta parece la solución, más fácil es empezar a ejecutarla. Y más caro puede resultar descubrir después que respondía a la pregunta equivocada.

Si ya sabes qué quieres poner en marcha, podemos ir al punto. Si solo sabes que algo no puede seguir igual, también podemos empezar por ahí.

[[ACTION:Pasar a la acción.]]

A veces no está claro qué cambiar ni con qué prioridad. Ahí trabajo en **análisis, investigación y posicionamiento** hasta convertir la incertidumbre en una decisión.

Cuando la decisión ya está tomada, pero su valor cuesta de ver, trabajo en **comunicación y copy**: webs, páginas de servicio, propuestas y piezas comerciales.

Si una solución depende de que alguien recuerde qué hacer, diseño **sistemas, protocolos y automatizaciones** para reducir esa dependencia y dejar un proceso estable.

Una decisión, un mensaje y un proceso pueden fallar de maneras muy distintas. Aun así, antes de cambiar nada conviene hacer la misma pregunta:

¿La solución sigue respondiendo al problema que debía resolver?

Las soluciones no suelen dejar de funcionar de golpe. Envejecen.

No empiezo por ejecutar lo que me piden. Empiezo por comprobar qué tendría que cambiar.

Un responsable operativo pidió formación en *prompt engineering*. Perdía tiempo buscando información. Construí para él un sistema privado, replicable por otros profesionales.

BAMODOG pensaba fidelizar con regalos. Revisé la experiencia y estructuré los reportes por WhatsApp. Las pruebas dejaron señales de más facilidad y tranquilidad.

Una promotora quiso corregir una noticia tras protestas. El conflicto era la pérdida cultural. Entregué un plan bien recibido, sin confirmar su aplicación ni atribuirle resultados.

Soy Emanuel Rocha. He trabajado en editoriales, comercio, inmobiliario y negocios locales. Por eso no separo un texto de la decisión ni del proceso que debe sostenerlo.

No todo necesita una intervención amplia. A veces basta una decisión, una pieza o un ajuste. Prefiero decirlo, igual que cuando no puedo resolver el problema.

Puedes llegar con un encargo concreto o únicamente con la sensación de que algo no puede seguir igual.

Te diré si puedo ayudarte, qué profundidad merece y cuándo una solución más sencilla sería suficiente.

[[ACTION:Pasar a la acción.]]`;

const fastCa = `Hi ha encàrrecs que arriben massa ben formulats.

Un web. Una campanya. Formació en IA. Un sistema que estalviï temps.

Com més concreta sembla la solució, més fàcil és començar a executar-la. I més car pot resultar descobrir després que responia a la pregunta equivocada.

Si ja saps què vols posar en marxa, podem anar al gra. Si només saps que alguna cosa no pot continuar igual, també podem començar per aquí.

[[ACTION:Passar a l’acció.]]

De vegades no queda clar què ha de canviar ni amb quina prioritat. Treballo en **anàlisi, investigació i posicionament** fins a convertir la incertesa en una decisió.

Quan la decisió ja està presa, però costa veure’n el valor, treballo en **comunicació i copy**: webs, pàgines de servei, propostes i peces comercials.

Si una solució depèn que algú recordi què cal fer, dissenyo **sistemes, protocols i automatitzacions** per reduir aquesta dependència i deixar un procés estable.

Una decisió, un missatge i un procés poden fallar de maneres molt diferents. Tot i així, abans de canviar res convé fer la mateixa pregunta:

La solució continua responent al problema que havia de resoldre?

Les solucions no solen deixar de funcionar de cop. Envelleixen.

No començo executant allò que em demanen. Començo comprovant què hauria de canviar.

Un responsable d’operacions va demanar formació en *prompt engineering*. Perdia temps buscant informació. Li vaig construir un sistema privat, replicable per altres professionals.

BAMODOG pensava fidelitzar amb regals. Vaig revisar l’experiència i estructurar els informes per WhatsApp. Les proves van deixar senyals de més facilitat i tranquil·litat.

Una promotora volia corregir una notícia arran de protestes. El conflicte era cultural. Vaig lliurar un pla ben rebut, sense confirmar-ne l’aplicació ni atribuir-hi resultats.

Soc Emanuel Rocha. He treballat en editorials, comerç, immobiliari i negocis locals. Per això no separo un text de la decisió ni del procés que l’ha de sostenir.

No tot necessita una intervenció àmplia. De vegades n’hi ha prou amb una decisió, una peça o un ajust. Prefereixo dir-ho, igual que quan no puc resoldre el problema.

Pots arribar amb un encàrrec concret o només amb la sensació que alguna cosa no pot continuar igual.

Et diré si et puc ajudar, quin nivell de profunditat mereix i quan una solució més senzilla seria suficient.

[[ACTION:Passar a l’acció.]]`;

const narrativeEs = `¿Conoces la historia del banco que perdió 46 millones de francos sin que nadie entrara por la puerta?

Ocurrió en Niza, en 1976. El lunes 19 de julio, los empleados de Société Générale hallaron la cámara cerrada. Parecía una avería, pero la puerta había sido soldada desde dentro.

¿Cómo había entrado alguien y cerrado después el único acceso a sus espaldas?

La envolvente de hormigón armado medía 1,80 metros. No había detección acústica ni sísmica: el banco consideraba que aquellos muros ya eran protección suficiente.

Cuando consiguieron acceder, encontraron cajas abiertas, armarios forzados, herramientas y escombros. Más de trescientas cajas de seguridad habían sido vaciadas. El botín se estimó en unos 46 millones de francos.

Durante meses, la banda recorrió las alcantarillas y excavó a mano un túnel de ocho metros hasta alcanzar la cara exterior del muro.

El largo cierre del 14 de julio les dio tiempo. Abrieron el hormigón, desplazaron un cofre de cinco toneladas y pasaron dos días dentro eligiendo el botín.

Antes de marcharse, los ladrones dejaron escrita una frase: *Sin armas, sin odio, sin violencia.*

La puerta seguía cerrada. El muro, que el banco no consideraba una vía de entrada, había servido precisamente para entrar.

El banco había organizado su seguridad para responder a una pregunta:  
¿Cómo protegemos la entrada a la cámara?  
Los ladrones formularon otra:  
¿Y si entramos por otro sitio?

No encontraron una respuesta mejor: cambiaron la pregunta, y con ella volvieron prácticamente irrelevante una defensa formidable.

Ese riesgo también existe en una empresa. Puede perfeccionar su web, campañas, herramientas y procesos mientras sigue respondiendo a una pregunta que ya no es la correcta.

Y continuar, sin saberlo, reforzando una puerta que nadie intenta atravesar ya.

Porque el cliente cambia.  
El negocio cambia.  
La tecnología cambia.  
La pregunta desde la que se actúa, a veces, no.

La vulnerabilidad de Société Générale no estaba solo en un muro, una alarma o una puerta, sino en una certeza: creer que el próximo problema tendría que parecerse al anterior.

Las soluciones no suelen dejar de funcionar de golpe.  
Envejecen.  
Y el problema comienza cuando seguimos perfeccionando una respuesta para una pregunta que ya ha cambiado.

En mi trabajo, esas preguntas rara vez llegan como preguntas. Suelen llegar como una solución.

Un responsable operativo de una firma inmobiliaria de La Cerdanya quería formarse en *prompt engineering*. Su trabajo comercial aún dependía de búsquedas dispersas y tareas repetitivas.

Antes de preparar la formación, revisé dónde se perdía tiempo, qué datos podía usar la tecnología, qué límites imponía la privacidad y si el ahorro justificaba el coste. El encargo cambió.

Desarrollé para él un sistema privado de investigación y preparación documental, utilizable sin depender de mí y replicable por otros profesionales del sector.

Llegó a construirse, probarse y entregarse. Hay constancia limitada de su uso inicial, pero no permite confirmar su continuidad ni atribuirle ventas.

BAMODOG quería mejorar la fidelización con regalos para sus clientes y sus perros. Antes de añadir un coste a cada estancia, revisé la experiencia.

El cuidado presencial era bueno. Los reportes por WhatsApp podían llegar tarde, contener poca información o cambiar según la persona que atendiera.

Convertí esa comunicación en un sistema: mensaje de llegada, reporte de mediodía, cierre de jornada, plantillas y criterios de tono.

Aparecieron señales positivas: «con vosotros todo muy fácil»; «así uno puede estar más tranquilo de viaje». El negocio conservó los protocolos.

Una promotora inmobiliaria de La Cerdanya afrontaba protestas y presión política por la desaparición de una institución histórica. Su primera reacción fue intentar corregir la noticia.

El conflicto no estaba solo en el artículo. Aquel lugar tenía un significado para la comunidad y nadie había explicado cómo se conservaría parte de su valor.

Trabajé de forma confidencial con el responsable, analicé el rechazo y preparé un plan. La propuesta era apoyar actividades culturales en otra institución que ya asumía parte de esa función.

El plan fue entregado y bien recibido. No puedo confirmar que se aplicara ni convertir la evolución posterior del conflicto o de la promotora en un resultado del trabajo.

Una formación, un regalo, una rectificación. Tres soluciones razonables.

Soy Emanuel Rocha. He trabajado entre editoriales, comercio, inmobiliario y negocios locales. En los tres casos, empecé separando la solución solicitada del problema que debía resolver.

De ahí salen tres puntos de entrada. Si aún no está claro qué debe cambiar, trabajo en **análisis, investigación y posicionamiento** para decidir qué abordar y con qué prioridad.

Si el valor existe, pero cuesta explicarlo o distinguirlo, trabajo en **comunicación y copy**: webs, páginas de servicio, propuestas y piezas comerciales.

Si una solución funciona, pero depende de la memoria o el criterio de una persona, diseño **sistemas, protocolos y automatizaciones** que reduzcan la improvisación.

No hace falta que llegues sabiendo qué necesitas. [[ACTION:Cuéntame qué está ocurriendo]], qué has intentado y qué debería cambiar. Te diré si puedo ayudarte o si basta una solución más sencilla.`;

const narrativeCa = `Coneixes la història del banc que va perdre 46 milions de francs sense que ningú hi entrés per la porta?

Va passar a Niça, el 1976. El dilluns 19 de juliol, els empleats de Société Générale van trobar la cambra tancada. Semblava una avaria, però la porta havia estat soldada des de dins.

Com hi havia entrat algú i havia tancat després l’únic accés?

L’envolupant de formigó armat feia 1,80 metres. No hi havia detecció acústica ni sísmica: el banc considerava que aquells murs ja eren una protecció suficient.

Quan van aconseguir accedir-hi, van trobar caixes obertes, armaris forçats, eines i runa. Més de tres-centes caixes de seguretat havien estat buidades. El botí es va estimar en uns 46 milions de francs.

Durant mesos, la banda va recórrer les clavegueres i va excavar a mà un túnel de vuit metres fins a arribar a la cara exterior del mur.

El llarg tancament del 14 de juliol els va donar temps. Van obrir el formigó, van moure una caixa forta de cinc tones i van passar dos dies a dins triant el botí.

Abans de marxar, els lladres van deixar escrita una frase: *Sense armes, sense odi, sense violència.*

La porta continuava tancada. El mur, que el banc no considerava una via d’entrada, havia servit precisament per entrar.

El banc havia organitzat la seguretat per respondre una pregunta:  
Com protegim l’entrada a la cambra?  
Els lladres en van formular una altra:  
I si entrem per un altre lloc?

No van trobar una resposta millor: van canviar la pregunta i, amb ella, van tornar pràcticament irrellevant una defensa formidable.

Aquest risc també existeix en una empresa. Pot perfeccionar el web, les campanyes, les eines i els processos mentre continua responent una pregunta que ja no és la correcta.

I continuar, sense saber-ho, reforçant una porta que ningú ja no intenta travessar.

Perquè el client canvia.  
El negoci canvia.  
La tecnologia canvia.  
La pregunta des de la qual s’actua, de vegades, no.

La vulnerabilitat de Société Générale no era només en un mur, una alarma o una porta, sinó en una certesa: creure que el problema següent s’hauria d’assemblar a l’anterior.

Les solucions no solen deixar de funcionar de cop.  
Envelleixen.  
I el problema comença quan continuem perfeccionant una resposta per a una pregunta que ja ha canviat.

En la meva feina, aquestes preguntes poques vegades arriben com a preguntes. Solen arribar com una solució.

Un responsable d’operacions d’una immobiliària de la Cerdanya es volia formar en *prompt engineering*. La seva feina comercial encara depenia de cerques disperses i tasques repetitives.

Abans de preparar la formació, vaig revisar on es perdia temps, quines dades podia fer servir la tecnologia, quins límits imposava la privacitat i si l’estalvi justificava el cost. L’encàrrec va canviar.

Vaig desenvolupar per a ell un sistema privat d’investigació i preparació documental, utilitzable sense dependre de mi i replicable per altres professionals del sector.

Es va arribar a construir, provar i lliurar. Hi ha constància limitada de l’ús inicial, però no permet confirmar-ne la continuïtat ni atribuir-li vendes.

BAMODOG volia millorar la fidelització amb regals per als seus clients i els seus gossos. Abans d’afegir un cost a cada estada, vaig revisar l’experiència.

L’atenció presencial era bona. Els informes per WhatsApp podien arribar tard, contenir poca informació o variar segons la persona que atenia.

Vaig convertir aquella comunicació en un sistema: missatge d’arribada, informe de migdia, tancament de jornada, plantilles i criteris de to.

Van aparèixer senyals positius: «amb vosaltres tot és molt fàcil»; «així un pot estar més tranquil quan viatja». El negoci va conservar els protocols.

Una promotora immobiliària de la Cerdanya afrontava protestes i pressió política per la desaparició d’una institució històrica. La primera reacció va ser intentar corregir la notícia.

El conflicte no era només a l’article. Aquell lloc tenia un significat per a la comunitat i ningú no havia explicat com se’n conservaria part del valor.

Vaig treballar de manera confidencial amb el responsable, vaig analitzar el rebuig i vaig preparar un pla. La proposta era donar suport a activitats culturals en una altra institució que ja assumia part d’aquella funció.

El pla es va lliurar i va ser ben rebut. No puc confirmar que s’apliqués ni convertir l’evolució posterior del conflicte o de la promotora en un resultat de la feina.

Una formació, un regal, una rectificació. Tres solucions raonables.

Soc Emanuel Rocha. He treballat entre editorials, comerç, immobiliari i negocis locals. En els tres casos, vaig començar separant la solució demanada del problema que havia de resoldre.

D’aquí en surten tres punts d’entrada. Si encara no queda clar què ha de canviar, treballo en **anàlisi, investigació i posicionament** per decidir què cal abordar i amb quina prioritat.

Si el valor existeix, però costa explicar-lo o distingir-lo, treballo en **comunicació i copy**: webs, pàgines de servei, propostes i peces comercials.

Si una solució funciona, però depèn de la memòria o del criteri d’una persona, dissenyo **sistemes, protocols i automatitzacions** que redueixin la improvisació.

No cal que arribis sabent què necessites. [[ACTION:Explica’m què està passant]], què has intentat i què hauria de canviar. Et diré si et puc ajudar o si n’hi ha prou amb una solució més senzilla.`;

export const routeContent = {
    ca: {
        A: renderRoute(fastCa, "A"),
        B: renderRoute(narrativeCa, "B")
    },
    es: {
        A: renderRoute(fastEs, "A"),
        B: renderRoute(narrativeEs, "B")
    }
};
