/*
 * Catálogo editorial bilingüe para el archivador focal de Operaciones.
 *
 * Las versiones catalana y castellana comparten la misma estructura,
 * evidencias y límites de atribución.
 */

export const operationsCatalog = {
    "ca": {
        "intro": "Aquests sis arxius mostren com treballo entre una petició i un lliurament: què comprovo, descarto i construeixo, i fins on permet arribar l’evidència. El resultat importa, però també el criteri que el sosté.",
        "labels": {
            "index": "Arxius d’operacions",
            "open": "Obre l’arxiu",
            "thesis": "Tesi",
            "proof": "Prova",
            "limit": "Límit",
            "reconstruction": "Reconstrucció",
            "can": "Es pot sostenir",
            "cannot": "No es pot sostenir",
            "selected": "Opció recomanada",
            "archives": "← Arxius",
            "previous": "← Anterior",
            "next": "Següent →",
            "contact": "Obre una conversa →",
            "progress": "Arxiu {current} de {total}",
            "operations": "Operacions"
        },
        "files": [
            {
                "id": "op-01",
                "num": "01",
                "title": "Abans d’acceptar la solució",
                "status": "Entrada",
                "thesis": "La solució sol·licitada continua sent una hipòtesi. Abans d’acceptar-la, la converteixo en una pregunta operativa.",
                "explanation": "Reconstrueixo què passa, què ha de canviar, qui farà servir el resultat i quins límits hi ha. Així puc confirmar, reduir o substituir la petició sense perdre’n la intenció.",
                "evidenceType": "reframe-matrix",
                "evidenceLabel": "Tres peticions reals i les seves reformulacions retrospectives",
                "evidence": {
                    "rows": [
                        {
                            "from": "Aprendre a fer servir prompts per millorar la feina comercial.",
                            "to": "Determinar on la intel·ligència artificial podia aportar valor operatiu, en quines condicions i amb quins límits."
                        },
                        {
                            "from": "Afegir regals i petits detalls per millorar la satisfacció.",
                            "to": "Aconseguir que l’experiència no depengués de qui atenia ni del criteri disponible en aquell moment."
                        },
                        {
                            "from": "Corregir una notícia abans que el conflicte creixés.",
                            "to": "Respondre a la pèrdua cultural que havia activat la reacció, no només a la manera com s’havia explicat."
                        }
                    ]
                },
                "limit": "Les peticions són reals, però les reformulacions es van reconstruir després. No es presenten com a documents utilitzats aleshores."
            },
            {
                "id": "op-02",
                "num": "02",
                "title": "Investigar per decidir",
                "status": "Investigació",
                "thesis": "Una font només importa si pot confirmar una via, corregir-la o descartar-la.",
                "explanation": "Separo informació interna, evidència externa, interpretació i dubtes oberts. La cerca s’amplia quan la primera resposta no basta, però la decisió continua exigint criteri.",
                "evidenceType": "research-trail",
                "evidenceLabel": "Recorregut reconstruït de la investigació del conflicte cultural",
                "evidence": {
                    "steps": [
                        {
                            "label": "Propagació",
                            "detail": "Vaig localitzar la notícia original i les rèpliques per observar quins arguments persistien quan altres mitjans els reorganitzaven."
                        },
                        {
                            "label": "Antecedents",
                            "detail": "Vaig buscar notícies anteriors, conflictes relacionats i casos comparables per comprovar precedents i la seva evolució."
                        },
                        {
                            "label": "Conversa social",
                            "detail": "Vaig rastrejar perfils culturals de la zona i paraules clau a les xarxes per reconèixer sensibilitats i possibles focus de mobilització."
                        },
                        {
                            "label": "Substitució cultural",
                            "detail": "Vaig estudiar casos en què una activitat cultural havia perdut l’espai o traslladat la funció quan la infraestructura anterior deixava de ser sostenible."
                        },
                        {
                            "label": "Canvi de tesi",
                            "detail": "Una altra institució ja acollia activitats semblants. Corregir l’article no restituïa la funció cultural; calia atendre aquella pèrdua."
                        }
                    ]
                },
                "limit": "La mostra acredita el recorregut i el canvi de tesi, no una traçabilitat històrica completa de consultes, fonts i versions."
            },
            {
                "id": "op-03",
                "num": "03",
                "title": "Decidir també és descartar",
                "status": "Decisió",
                "thesis": "Una possibilitat no es converteix en una bona decisió només perquè es pugui executar.",
                "explanation": "Comparo alternatives pel canvi que poden produir, el cost, el manteniment, la verificabilitat i la dependència. La recomanació ha d’aclarir què es tria i què queda fora.",
                "evidenceType": "scenario-comparison",
                "evidenceLabel": "Tres escenaris comparats per respondre al conflicte cultural",
                "evidence": {
                    "scenarios": [
                        {
                            "label": "Continuar sense actuar",
                            "detail": "Requeria menys intervenció immediata, però deixava oberta la possibilitat que l’oposició adquirís dimensió social o política.",
                            "selected": false
                        },
                        {
                            "label": "Crear una programació paral·lela",
                            "detail": "Les sessions a l’aire lliure oferien una resposta visible, però exigien finançar espais, equipament i una operativa nova difícil de sostenir.",
                            "selected": false
                        },
                        {
                            "label": "Reforçar una capacitat existent",
                            "detail": "Una altra institució ja acollia activitats semblants. Una aportació acotada podia sostenir part d’aquella funció amb menys cost i càrrega operativa.",
                            "selected": true
                        }
                    ]
                },
                "limit": "La selecció recull la via recomanada i desenvolupada, no una aplicació confirmada ni la continuïtat posterior de les activitats."
            },
            {
                "id": "op-04",
                "num": "04",
                "title": "Construir per poder provar",
                "status": "Construcció",
                "thesis": "Encara que una part de la feina s’automatitzi, l’activació i el criteri continuen sent humans.",
                "explanation": "Defineixo què entra, què transforma el sistema, què retorna i on intervé una persona. Així puc provar el recorregut abans de valorar només el resultat final.",
                "evidenceType": "workflow",
                "evidenceLabel": "Flux reconstruït per preparar el contacte següent",
                "evidence": {
                    "steps": [
                        {
                            "label": "Entrada",
                            "detail": "El professional carregava una nota de veu o enganxava una nota escrita procedent d’una conversa."
                        },
                        {
                            "label": "Transcripció i estructura",
                            "detail": "El model transcrivia quan calia i separava fets coneguts, informació pendent i supòsits que s’havien d’evitar."
                        },
                        {
                            "label": "Investigació",
                            "detail": "El sistema generava consultes, buscava fonts citades i ampliava la profunditat quan la primera tesi no era suficient."
                        },
                        {
                            "label": "Síntesi",
                            "detail": "La sortida reunia fets, informació pendent, línies de conversa i preguntes per al contacte següent en una fitxa breu."
                        },
                        {
                            "label": "Revisió humana",
                            "detail": "El professional valorava les fonts, descartava interpretacions inadequades i decidia què utilitzar. El sistema preparava l’atenció, no la relació."
                        }
                    ]
                },
                "limit": "La demostració reconstrueix el flux. El sistema es va lliurar a un professional i era replicable, però només consta un ús inicial limitat."
            },
            {
                "id": "op-05",
                "num": "05",
                "title": "Comprovar allò que es pot sostenir",
                "status": "Comprovació",
                "thesis": "Comprovar també consisteix a reduir una afirmació fins allò que l’evidència permet defensar.",
                "explanation": "Reviso precisió, fonts, privacitat, funcionament, comprensió i capacitat d’ús. Després separo el lliurament dels resultats que depenen d’altres persones o decisions.",
                "evidenceType": "claim-boundary",
                "evidenceLabel": "Fets sostenibles i límits d’atribució dels tres projectes",
                "evidence": {
                    "can": [
                        "El sistema immobiliari es va construir, provar i lliurar al seu destinatari.",
                        "El disseny es podia replicar per a altres professionals del sector.",
                        "El sistema d’experiència es va provar amb clients reals abans de convertir-se en una instrucció operativa.",
                        "Després d’implantar-lo van aparèixer senyals positius sobre facilitat, atenció i tranquil·litat.",
                        "El pla cultural es va investigar, formular, lliurar i rebre positivament."
                    ],
                    "cannot": [
                        "No es pot confirmar un ús continuat del sistema immobiliari.",
                        "No es poden atribuir vendes ni altres resultats comercials al sistema immobiliari.",
                        "No es pot atribuir tota la satisfacció o la retenció al sistema d’experiència.",
                        "No es pot afirmar una absència total d’errors sense un registre formal d’incidències.",
                        "No es pot confirmar l’aplicació ni el finançament posterior del pla cultural."
                    ]
                },
                "limit": "La comparació delimita què es pot defensar amb la documentació disponible; no aporta mètriques causals ni converteix una seqüència temporal en impacte."
            },
            {
                "id": "op-06",
                "num": "06",
                "title": "Lliurar perquè continuï",
                "status": "Continuïtat",
                "thesis": "La continuïtat depèn que el criteri es pugui utilitzar i revisar sense reconstruir-lo en cada interacció.",
                "explanation": "Un lliurament ha de definir activació, ús, excepcions i revisió. El meu suport posterior pot ajudar, però no ha d’ocultar què necessita el sistema per mantenir-se.",
                "evidenceType": "journey-map",
                "evidenceLabel": "Activació i continuïtat del sistema d’experiència de client",
                "evidence": {
                    "steps": [
                        {
                            "label": "Activació",
                            "detail": "Vaig provar el sistema en interaccions reals i el vaig ajustar abans de convertir-lo en una instrucció directa de funcionament."
                        },
                        {
                            "label": "Ús transversal",
                            "detail": "Com que era un micronegoci, s’havia d’aplicar en tots els punts de contacte i per totes les persones implicades."
                        },
                        {
                            "label": "Revisió informal",
                            "detail": "La continuïtat es comprovava mitjançant missatges, reconstrucció de trucades i preguntes recurrents sobre el seguiment del mètode."
                        },
                        {
                            "label": "Punt de fuga",
                            "detail": "Durant la saturació, una persona aliena al projecte podia respondre des del seu criteri, fora de les línies compartides."
                        },
                        {
                            "label": "Continuïtat i millora",
                            "detail": "El sistema continua present segons el seguiment disponible. El mètode actual afegeix incorporació per a reforços, revisió periòdica i registre de desviacions."
                        }
                    ]
                },
                "limit": "No hi ha una mesura diària ni es pot garantir una autonomia completa. La continuïtat depèn del servei, les persones i la revisió."
            }
        ]
    },
    "es": {
        "intro": "Estos seis archivos muestran cómo trabajo entre una petición y una entrega: qué compruebo, descarto y construyo, y hasta dónde permite llegar la evidencia. El resultado importa, pero también el criterio que lo sostiene.",
        "labels": {
            "index": "Archivos de operaciones",
            "open": "Abrir el archivo",
            "thesis": "Tesis",
            "proof": "Prueba",
            "limit": "Límite",
            "reconstruction": "Reconstrucción",
            "can": "Puede sostenerse",
            "cannot": "No puede sostenerse",
            "selected": "Opción recomendada",
            "archives": "← Archivos",
            "previous": "← Anterior",
            "next": "Siguiente →",
            "contact": "Abrir una conversación →",
            "progress": "Archivo {current} de {total}",
            "operations": "Operaciones"
        },
        "files": [
            {
                "id": "op-01",
                "num": "01",
                "title": "Antes de aceptar la solución",
                "status": "Entrada",
                "thesis": "La solución solicitada sigue siendo una hipótesis. Antes de aceptarla, la convierto en una pregunta operativa.",
                "explanation": "Reconstruyo qué ocurre, qué debe cambiar, quién usará el resultado y qué límites existen. Así puedo confirmar, reducir o sustituir la petición sin perder su intención.",
                "evidenceType": "reframe-matrix",
                "evidenceLabel": "Tres peticiones reales y sus reformulaciones retrospectivas",
                "evidence": {
                    "rows": [
                        {
                            "from": "Aprender a utilizar prompts para mejorar el trabajo comercial.",
                            "to": "Determinar dónde la inteligencia artificial podía aportar valor operativo, en qué condiciones y con qué límites."
                        },
                        {
                            "from": "Añadir regalos y pequeños detalles para mejorar la satisfacción.",
                            "to": "Lograr que la experiencia no dependiera de quién atendía ni del criterio disponible en ese momento."
                        },
                        {
                            "from": "Corregir una noticia antes de que creciera el conflicto.",
                            "to": "Responder a la pérdida cultural que había activado la reacción, no solo a la forma en que se había contado."
                        }
                    ]
                },
                "limit": "Las peticiones son reales, pero las reformulaciones se reconstruyeron después. No se presentan como documentos utilizados entonces."
            },
            {
                "id": "op-02",
                "num": "02",
                "title": "Investigar para decidir",
                "status": "Investigación",
                "thesis": "Una fuente solo importa si puede confirmar una vía, corregirla o descartarla.",
                "explanation": "Separo información interna, evidencia externa, interpretación y dudas abiertas. La búsqueda se amplía cuando la primera respuesta no basta, pero la decisión sigue exigiendo criterio.",
                "evidenceType": "research-trail",
                "evidenceLabel": "Recorrido reconstruido de la investigación del conflicto cultural",
                "evidence": {
                    "steps": [
                        {
                            "label": "Propagación",
                            "detail": "Localicé la noticia original y sus réplicas para observar qué argumentos persistían al ser reorganizados por otros medios."
                        },
                        {
                            "label": "Antecedentes",
                            "detail": "Busqué noticias anteriores, conflictos relacionados y casos comparables para comprobar precedentes y su evolución."
                        },
                        {
                            "label": "Conversación social",
                            "detail": "Rastreé perfiles culturales de la zona y palabras clave en redes para reconocer sensibilidades y posibles focos de movilización."
                        },
                        {
                            "label": "Sustitución cultural",
                            "detail": "Estudié casos donde una actividad cultural perdió su espacio o trasladó su función al dejar de ser sostenible la infraestructura anterior."
                        },
                        {
                            "label": "Cambio de tesis",
                            "detail": "Otra institución ya acogía actividades semejantes. Corregir el artículo no restituía la función cultural; la respuesta debía atender esa pérdida."
                        }
                    ]
                },
                "limit": "La muestra acredita el recorrido y el cambio de tesis, no una trazabilidad histórica completa de consultas, fuentes y versiones."
            },
            {
                "id": "op-03",
                "num": "03",
                "title": "Decidir también es descartar",
                "status": "Decisión",
                "thesis": "Una posibilidad no se convierte en una buena decisión solo porque pueda ejecutarse.",
                "explanation": "Comparo alternativas por el cambio que pueden producir, su coste, mantenimiento, verificabilidad y dependencia. La recomendación debe aclarar qué se elige y qué queda fuera.",
                "evidenceType": "scenario-comparison",
                "evidenceLabel": "Tres escenarios comparados para responder al conflicto cultural",
                "evidence": {
                    "scenarios": [
                        {
                            "label": "Continuar sin actuar",
                            "detail": "Requería menos intervención inmediata, pero dejaba abierta la posibilidad de que la oposición adquiriera dimensión social o política.",
                            "selected": false
                        },
                        {
                            "label": "Crear una programación paralela",
                            "detail": "Las sesiones al aire libre daban una respuesta visible, pero exigían financiar espacios, equipamiento y una nueva operativa difícil de sostener.",
                            "selected": false
                        },
                        {
                            "label": "Reforzar una capacidad existente",
                            "detail": "Otra institución ya acogía actividades semejantes. Una aportación acotada podía sostener parte de esa función con menor coste y carga operativa.",
                            "selected": true
                        }
                    ]
                },
                "limit": "La selección recoge la vía recomendada y desarrollada, no una aplicación confirmada ni la continuidad posterior de las actividades."
            },
            {
                "id": "op-04",
                "num": "04",
                "title": "Construir para poder probar",
                "status": "Construcción",
                "thesis": "Aunque parte del trabajo se automatice, la activación y el criterio siguen siendo humanos.",
                "explanation": "Defino qué entra, qué transforma el sistema, qué devuelve y dónde interviene una persona. Así puedo probar el recorrido antes de valorar solo el resultado final.",
                "evidenceType": "workflow",
                "evidenceLabel": "Flujo reconstruido para preparar el siguiente contacto",
                "evidence": {
                    "steps": [
                        {
                            "label": "Entrada",
                            "detail": "El profesional cargaba una nota de voz o pegaba una nota escrita procedente de una conversación."
                        },
                        {
                            "label": "Transcripción y estructura",
                            "detail": "El modelo transcribía cuando era necesario y separaba hechos conocidos, información pendiente y supuestos que debían evitarse."
                        },
                        {
                            "label": "Investigación",
                            "detail": "El sistema generaba consultas, buscaba fuentes citadas y ampliaba la profundidad cuando la primera tesis no era suficiente."
                        },
                        {
                            "label": "Síntesis",
                            "detail": "La salida reunía hechos, información pendiente, líneas de conversación y preguntas para el siguiente contacto en una ficha breve."
                        },
                        {
                            "label": "Revisión humana",
                            "detail": "El profesional valoraba las fuentes, descartaba interpretaciones inadecuadas y decidía qué utilizar. El sistema preparaba la atención, no la relación."
                        }
                    ]
                },
                "limit": "La demostración reconstruye el flujo. El sistema se entregó a un profesional y era replicable, pero solo consta un uso inicial limitado."
            },
            {
                "id": "op-05",
                "num": "05",
                "title": "Comprobar lo que puede sostenerse",
                "status": "Comprobación",
                "thesis": "Comprobar también consiste en reducir una afirmación hasta lo que la evidencia permite defender.",
                "explanation": "Reviso precisión, fuentes, privacidad, funcionamiento, comprensión y capacidad de uso. Después separo la entrega de los resultados que dependen de otras personas o decisiones.",
                "evidenceType": "claim-boundary",
                "evidenceLabel": "Hechos sostenibles y límites de atribución de los tres proyectos",
                "evidence": {
                    "can": [
                        "El sistema inmobiliario fue construido, probado y entregado a su destinatario.",
                        "Su diseño podía replicarse para otros profesionales del sector.",
                        "El sistema de experiencia se probó con clientes reales antes de convertirse en una instrucción operativa.",
                        "Tras implantarlo aparecieron señales positivas sobre facilidad, atención y tranquilidad.",
                        "El plan cultural fue investigado, formulado, entregado y recibido positivamente."
                    ],
                    "cannot": [
                        "No puede confirmarse un uso continuado del sistema inmobiliario.",
                        "No pueden atribuirse ventas ni otros resultados comerciales al sistema inmobiliario.",
                        "No puede atribuirse toda la satisfacción o la retención al sistema de experiencia.",
                        "No puede afirmarse una ausencia total de fallos sin un registro formal de incidencias.",
                        "No puede confirmarse la aplicación ni la financiación posterior del plan cultural."
                    ]
                },
                "limit": "La comparación delimita lo defendible con la documentación disponible; no aporta métricas causales ni convierte una secuencia temporal en impacto."
            },
            {
                "id": "op-06",
                "num": "06",
                "title": "Entregar para que continúe",
                "status": "Continuidad",
                "thesis": "La continuidad depende de que el criterio pueda utilizarse y revisarse sin reconstruirlo en cada interacción.",
                "explanation": "Una entrega debe definir activación, uso, excepciones y revisión. Mi apoyo posterior puede ayudar, pero no debe ocultar qué necesita el sistema para mantenerse.",
                "evidenceType": "journey-map",
                "evidenceLabel": "Activación y continuidad del sistema de experiencia de cliente",
                "evidence": {
                    "steps": [
                        {
                            "label": "Activación",
                            "detail": "Probé el sistema en interacciones reales y lo ajusté antes de convertirlo en una instrucción directa de funcionamiento."
                        },
                        {
                            "label": "Uso transversal",
                            "detail": "Al ser un micronegocio, debía aplicarse en todos los puntos de contacto y por todas las personas implicadas."
                        },
                        {
                            "label": "Revisión informal",
                            "detail": "La continuidad se comprobaba mediante mensajes, reconstrucción de llamadas y preguntas recurrentes sobre el seguimiento del método."
                        },
                        {
                            "label": "Punto de fuga",
                            "detail": "Durante la saturación, una persona ajena al proyecto podía responder desde su propio criterio, fuera de las líneas compartidas."
                        },
                        {
                            "label": "Continuidad y mejora",
                            "detail": "El sistema sigue presente según el seguimiento disponible. El método actual añade incorporación para refuerzos, revisión periódica y registro de desviaciones."
                        }
                    ]
                },
                "limit": "No existe una medición diaria ni puede garantizarse autonomía completa. La continuidad depende del servicio, las personas y la revisión."
            }
        ]
    }
};

export const operationEvidenceTypes = [
    "reframe-matrix",
    "research-trail",
    "scenario-comparison",
    "workflow",
    "claim-boundary",
    "journey-map"
];
