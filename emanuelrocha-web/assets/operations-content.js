/*
 * Catàleg editorial bilingüe per a l’arxivador focal d’Operacions.
 *
 * Les versions catalana i castellana comparteixen la mateixa estructura,
 * evidències i límits d’atribució.
 */

export const operationsCatalog = {
    ca: {
        intro: "El resultat és la part visible. Abans cal entendre quina pregunta intenta respondre l’encàrrec, separar allò que es pot comprovar d’allò que se suposa, decidir què no val la pena construir i deixar una solució que pugui continuar funcionant sense dependre de mi. Aquests sis arxius mostren què canvia entre una petició i un lliurament, juntament amb les proves i els límits que sostenen cada decisió.",
        labels: {
            index: "Arxius d’operacions",
            open: "Obre l’arxiu",
            thesis: "Tesi",
            proof: "Prova",
            limit: "Límit",
            reconstruction: "Reconstrucció",
            can: "Es pot sostenir",
            cannot: "No es pot sostenir",
            selected: "Opció recomanada",
            archives: "← Arxius",
            previous: "← Anterior",
            next: "Següent →",
            contact: "Obre una conversa →",
            progress: "Arxiu {current} de {total}",
            operations: "Operacions"
        },
        files: [
            {
                id: "op-01",
                num: "01",
                title: "Abans d’acceptar la solució",
                status: "Entrada",
                thesis: "La solució que arriba amb un encàrrec continua sent una hipòtesi. Abans de proposar res, la converteixo en una pregunta operativa.",
                explanation: "Reconstrueixo què està passant, què hauria de canviar, qui farà servir el resultat i quines restriccions ja existeixen. Així puc confirmar la petició, reduir-la o substituir-la sense perdre la intenció que l’ha originat.",
                evidenceType: "reframe-matrix",
                evidenceLabel: "Tres peticions reals i les seves reformulacions retrospectivament construïdes",
                evidence: {
                    rows: [
                        {
                            from: "Ensenyar a fer servir prompts per millorar la feina comercial.",
                            to: "Decidir en quins punts la intel·ligència artificial podia aportar valor operatiu, en quines condicions i amb quins límits."
                        },
                        {
                            from: "Afegir regals i petits detalls per millorar la satisfacció.",
                            to: "Aconseguir que la qualitat de l’experiència no depengués de qui atenia ni del criteri disponible en aquell moment."
                        },
                        {
                            from: "Corregir una notícia abans que creixés el conflicte.",
                            to: "Respondre a la pèrdua cultural que havia activat la reacció, no només a la manera com s’havia explicat."
                        }
                    ]
                },
                limit: "Les reformulacions provenen de projectes reals, però s’han reconstruït retrospectivament. Els formularis i registres estandarditzats pertanyen al mètode actual i no es presenten com a documents utilitzats aleshores."
            },
            {
                id: "op-02",
                num: "02",
                title: "Investigar per decidir",
                status: "Investigació",
                thesis: "Una font només importa si pot confirmar una via, corregir-la o descartar-la.",
                explanation: "Separo la informació interna, l’evidència externa, la interpretació i allò que encara no sé. La recerca es pot ampliar quan la primera resposta no és suficient, però la rellevància de les fonts i la seva aplicació al cas continuen requerint criteri humà.",
                evidenceType: "research-trail",
                evidenceLabel: "Recorregut reconstruït de la investigació del conflicte cultural",
                evidence: {
                    steps: [
                        {
                            label: "Propagació",
                            detail: "Es van localitzar la notícia original i les seves rèpliques per observar quins arguments es mantenien quan altres mitjans reorganitzaven o reformulaven el contingut."
                        },
                        {
                            label: "Antecedents",
                            detail: "Es van buscar notícies anteriors, conflictes relacionats i casos comparables per comprovar si existien precedents i com havien evolucionat."
                        },
                        {
                            label: "Conversa social",
                            detail: "Es van rastrejar perfils culturals vinculats a la zona i paraules clau a les xarxes socials per reconèixer posicions, sensibilitats i possibles focus de mobilització."
                        },
                        {
                            label: "Substitució cultural",
                            detail: "Es van estudiar casos en què una activitat cultural havia perdut el seu espai o havia traslladat la seva activitat, especialment quan la davallada d’activitat dificultava sostenir la infraestructura anterior."
                        },
                        {
                            label: "Canvi de tesi",
                            detail: "L’existència d’una altra institució que ja acollia ocasionalment activitats semblants va mostrar que corregir l’article no restituïa la funció cultural i que la resposta havia d’actuar sobre aquesta pèrdua."
                        }
                    ]
                },
                limit: "La mostra sosté la lògica i el canvi de tesi, però no una traçabilitat històrica completa. No es conserven totes les consultes, fonts i versions utilitzades durant la investigació original."
            },
            {
                id: "op-03",
                num: "03",
                title: "Decidir també és descartar",
                status: "Decisió",
                thesis: "Una possibilitat no es converteix en una bona decisió només perquè es pugui executar.",
                explanation: "Comparo alternatives pel canvi que poden produir, el cost de construir-les i mantenir-les, la informació que necessiten, la seva verificabilitat i la dependència que generen. La decisió ha de deixar clar què es recomana i què queda fora.",
                evidenceType: "scenario-comparison",
                evidenceLabel: "Tres escenaris per respondre al conflicte cultural",
                evidence: {
                    scenarios: [
                        {
                            label: "Continuar sense actuar",
                            detail: "Exigia menys intervenció immediata, però deixava oberta la possibilitat que l’oposició creixés i adquirís dimensió social o política.",
                            selected: false
                        },
                        {
                            label: "Crear una programació paral·lela",
                            detail: "Les sessions de cinema a l’aire lliure oferien una resposta visible, però obligaven a finançar espais, equipament i una nova operativa, costosa i difícil de sostenir.",
                            selected: false
                        },
                        {
                            label: "Reforçar una capacitat existent",
                            detail: "Una altra institució ja acollia activitats semblants. Una aportació acotada permetia sostenir part de la funció cultural amb un cost menor i una càrrega més previsible. Va ser la via recomanada i desenvolupada amb més profunditat.",
                            selected: true
                        }
                    ]
                },
                limit: "La selecció identifica la recomanació desenvolupada, no una aplicació confirmada. El pla es va lliurar i va ser ben rebut, però no es pot acreditar que s’executés ni la continuïtat posterior de les activitats."
            },
            {
                id: "op-04",
                num: "04",
                title: "Construir per poder provar",
                status: "Construcció",
                thesis: "Tot i que una part de la transformació s’automatitzi, l’activació i el criteri continuen sent humans.",
                explanation: "Defineixo què entra, què transforma el sistema, què retorna i en quins punts ha d’intervenir una persona. Així puc provar el recorregut i revisar-ne els límits abans de valorar únicament el resultat final.",
                evidenceType: "workflow",
                evidenceLabel: "Flux reconstruït de preparació del contacte següent",
                evidence: {
                    steps: [
                        {
                            label: "Entrada",
                            detail: "El professional carregava una nota de veu o enganxava una nota escrita procedent d’una conversa."
                        },
                        {
                            label: "Transcripció i estructura",
                            detail: "El model transcrivia quan calia i separava fets coneguts, informació pendent i elements que no s’havien de donar per suposats."
                        },
                        {
                            label: "Investigació",
                            detail: "El sistema generava consultes, feia cerques web amb fonts citades i podia ampliar la profunditat quan la primera tesi no era suficient."
                        },
                        {
                            label: "Síntesi",
                            detail: "La sortida reunia fets, informació pendent, possibles línies de conversa i preguntes per al contacte següent en una fitxa breu i fàcil de recordar."
                        },
                        {
                            label: "Revisió humana",
                            detail: "El professional valorava la rellevància de les fonts, descartava interpretacions inadequades i decidia què fer servir. El sistema preparava l’atenció, no automatitzava la relació."
                        }
                    ]
                },
                limit: "La demostració reconstrueix el funcionament sense publicar el prompt, les regles internes ni la interfície original. El sistema es va construir, provar i lliurar, però només existeix una confirmació limitada del seu ús inicial."
            },
            {
                id: "op-05",
                num: "05",
                title: "Comprovar allò que es pot sostenir",
                status: "Comprovació",
                thesis: "Comprovar també consisteix a reduir una afirmació fins a allò que l’evidència permet defensar.",
                explanation: "Reviso la precisió, les fonts, la privacitat, el funcionament, la comprensió i la capacitat d’ús. Després separo la feina feta dels resultats que depenen d’altres persones, condicions o decisions posteriors.",
                evidenceType: "claim-boundary",
                evidenceLabel: "Fets sostenibles i límits d’atribució dels tres projectes",
                evidence: {
                    can: [
                        "El sistema immobiliari es va construir, provar i lliurar.",
                        "El sistema d’experiència es va provar amb clients reals abans de convertir-se en una instrucció operativa.",
                        "El seguiment de l’experiència va fer servir missatges, reconstrucció de trucades i comprovacions recurrents.",
                        "Després de la implantació van aparèixer indicis positius vinculats a la facilitat, l’atenció i la tranquil·litat transmesa.",
                        "El pla cultural es va investigar, formular, lliurar i rebre positivament."
                    ],
                    cannot: [
                        "No es pot confirmar l’ús continuat del sistema immobiliari.",
                        "No es poden atribuir vendes ni altres resultats comercials al sistema immobiliari.",
                        "No es pot atribuir tota la satisfacció o la retenció al sistema d’experiència.",
                        "No es pot afirmar una absència total d’errors perquè no existia un registre formal d’incidències.",
                        "No es pot confirmar l’aplicació ni el finançament posterior del pla cultural."
                    ]
                },
                limit: "La comparació delimita què es pot afirmar amb la documentació disponible. No aporta mètriques causals ni converteix una seqüència temporal en una prova d’impacte."
            },
            {
                id: "op-06",
                num: "06",
                title: "Lliurar perquè continuï",
                status: "Continuïtat",
                thesis: "La continuïtat depèn que el criteri es pugui fer servir i revisar sense haver-lo de reconstruir en cada interacció.",
                explanation: "Un lliurament ha de definir l’activació, l’ús esperat, les excepcions i la manera de revisar el sistema. La meva presència posterior pot servir de suport, però no ha d’ocultar què necessita la feina per mantenir-se.",
                evidenceType: "journey-map",
                evidenceLabel: "Activació i continuïtat del sistema d’experiència de client",
                evidence: {
                    steps: [
                        {
                            label: "Activació",
                            detail: "El sistema es va provar en interaccions reals i es va ajustar abans de convertir-se en una instrucció directa de funcionament."
                        },
                        {
                            label: "Ús transversal",
                            detail: "Com que es tractava d’un micronegoci, s’havia d’aplicar en tots els punts de contacte i per totes les persones implicades, no en un departament aïllat."
                        },
                        {
                            label: "Revisió informal",
                            detail: "La continuïtat es comprovava mitjançant historials de missatges, reconstrucció de trucades i preguntes recurrents sobre el seguiment del mètode."
                        },
                        {
                            label: "Punt de fuga",
                            detail: "Durant la saturació, una persona aliena al projecte podia entrar com a suport i respondre des del seu propi criteri, fora de les línies compartides."
                        },
                        {
                            label: "Continuïtat i millora",
                            detail: "El sistema continua present segons el seguiment disponible. L’estàndard actual afegeix una incorporació mínima per a nous reforços, revisió periòdica d’interaccions i registre de desviacions."
                        }
                    ]
                },
                limit: "No existeix una mesura diària del compliment ni es pot garantir una autonomia completa. L’experiència continua depenent del servei prestat, de les persones que intervenen i de la revisió del mètode."
            }
        ]
    },
    es: {
        intro: "El resultado es la parte visible. Antes hay que entender qué pregunta intenta responder el encargo, separar lo comprobable de lo supuesto, decidir qué no merece construirse y dejar una solución que pueda seguir funcionando sin depender de mí. Estos seis archivos muestran qué cambia entre una petición y una entrega, junto con las pruebas y los límites que sostienen cada decisión.",
        labels: {
            index: "Archivos de operaciones",
            open: "Abrir el archivo",
            thesis: "Tesis",
            proof: "Prueba",
            limit: "Límite",
            reconstruction: "Reconstrucción",
            can: "Puede sostenerse",
            cannot: "No puede sostenerse",
            selected: "Opción recomendada",
            archives: "← Archivos",
            previous: "← Anterior",
            next: "Siguiente →",
            contact: "Abrir una conversación →",
            progress: "Archivo {current} de {total}",
            operations: "Operaciones"
        },
        files: [
            {
                id: "op-01",
                num: "01",
                title: "Antes de aceptar la solución",
                status: "Entrada",
                thesis: "La solución que llega con un encargo sigue siendo una hipótesis. Antes de proponer, la convierto en una pregunta operativa.",
                explanation: "Reconstruyo qué está ocurriendo, qué debería cambiar, quién utilizará el resultado y qué restricciones ya existen. Así puedo confirmar la petición, reducirla o sustituirla sin perder la intención que la originó.",
                evidenceType: "reframe-matrix",
                evidenceLabel: "Tres peticiones reales y sus reformulaciones retrospectivas",
                evidence: {
                    rows: [
                        {
                            from: "Enseñar a utilizar prompts para mejorar el trabajo comercial.",
                            to: "Decidir dónde la inteligencia artificial podía aportar valor operativo, bajo qué condiciones y con qué límites."
                        },
                        {
                            from: "Añadir regalos y pequeños detalles para mejorar la satisfacción.",
                            to: "Conseguir que la calidad de la experiencia no dependiera de quién atendiera ni del criterio disponible en ese momento."
                        },
                        {
                            from: "Corregir una noticia antes de que creciera el conflicto.",
                            to: "Responder a la pérdida cultural que había activado la reacción, no solo a la forma en que se había contado."
                        }
                    ]
                },
                limit: "Las reformulaciones proceden de proyectos reales, pero se han reconstruido retrospectivamente. Los formularios y registros estandarizados pertenecen al método actual y no se presentan como documentos utilizados entonces."
            },
            {
                id: "op-02",
                num: "02",
                title: "Investigar para decidir",
                status: "Investigación",
                thesis: "Una fuente solo importa si puede confirmar una vía, corregirla o descartarla.",
                explanation: "Separo información interna, evidencia externa, interpretación y lo que todavía no sé. La búsqueda puede ampliarse cuando la primera respuesta no basta, pero la relevancia de las fuentes y su aplicación al caso siguen requiriendo criterio humano.",
                evidenceType: "research-trail",
                evidenceLabel: "Recorrido reconstruido de la investigación del conflicto cultural",
                evidence: {
                    steps: [
                        {
                            label: "Propagación",
                            detail: "Se localizaron la noticia original y sus réplicas para observar qué argumentos permanecían cuando otros medios reorganizaban o reformulaban el contenido."
                        },
                        {
                            label: "Antecedentes",
                            detail: "Se buscaron noticias anteriores, conflictos relacionados y casos comparables para comprobar si existían precedentes y cómo habían evolucionado."
                        },
                        {
                            label: "Conversación social",
                            detail: "Se rastrearon perfiles culturales vinculados a la zona y palabras clave en redes sociales para reconocer posiciones, sensibilidades y posibles focos de movilización."
                        },
                        {
                            label: "Sustitución cultural",
                            detail: "Se estudiaron casos donde una actividad cultural había perdido su espacio o trasladado su actividad, especialmente cuando el descenso de actividad dificultaba sostener la infraestructura anterior."
                        },
                        {
                            label: "Cambio de tesis",
                            detail: "La existencia de otra institución que ya acogía ocasionalmente actividades semejantes mostró que corregir el artículo no devolvía la función cultural y que la respuesta debía actuar sobre esa pérdida."
                        }
                    ]
                },
                limit: "La muestra sostiene la lógica y el cambio de tesis, pero no una trazabilidad histórica completa. No se conservan todas las consultas, fuentes y versiones utilizadas durante la investigación original."
            },
            {
                id: "op-03",
                num: "03",
                title: "Decidir también es descartar",
                status: "Decisión",
                thesis: "Una posibilidad no se convierte en una buena decisión solo porque pueda ejecutarse.",
                explanation: "Comparo alternativas por el cambio que pueden producir, el coste de construirlas y mantenerlas, la información que necesitan, su verificabilidad y la dependencia que generan. La decisión debe dejar claro qué se recomienda y qué queda fuera.",
                evidenceType: "scenario-comparison",
                evidenceLabel: "Tres escenarios para responder al conflicto cultural",
                evidence: {
                    scenarios: [
                        {
                            label: "Continuar sin actuar",
                            detail: "Exigía menos intervención inmediata, pero dejaba abierta la posibilidad de que la oposición creciera y adquiriera dimensión social o política.",
                            selected: false
                        },
                        {
                            label: "Crear una programación paralela",
                            detail: "Las sesiones de cine al aire libre ofrecían una respuesta visible, pero obligaban a financiar espacios, equipamiento y una operativa nueva, costosa y difícil de sostener.",
                            selected: false
                        },
                        {
                            label: "Reforzar una capacidad existente",
                            detail: "Otra institución ya acogía actividades semejantes. Una aportación acotada permitía sostener parte de la función cultural con menor coste y una carga más predecible. Fue la vía recomendada y desarrollada con mayor profundidad.",
                            selected: true
                        }
                    ]
                },
                limit: "La selección identifica la recomendación desarrollada, no una aplicación confirmada. El plan fue entregado y bien recibido, pero no puede atribuirse su ejecución ni la continuidad posterior de las actividades."
            },
            {
                id: "op-04",
                num: "04",
                title: "Construir para poder probar",
                status: "Construcción",
                thesis: "Aunque parte de la transformación se automatice, la activación y el criterio siguen siendo humanos.",
                explanation: "Defino qué entra, qué transforma el sistema, qué devuelve y en qué puntos debe intervenir una persona. Así puedo probar el recorrido y revisar sus límites antes de valorar únicamente el resultado final.",
                evidenceType: "workflow",
                evidenceLabel: "Flujo reconstruido de preparación del siguiente contacto",
                evidence: {
                    steps: [
                        {
                            label: "Entrada",
                            detail: "El profesional cargaba una nota de voz o pegaba una nota escrita procedente de una conversación."
                        },
                        {
                            label: "Transcripción y estructura",
                            detail: "El modelo transcribía cuando era necesario y separaba hechos conocidos, información pendiente y elementos que no debían darse por supuestos."
                        },
                        {
                            label: "Investigación",
                            detail: "El sistema generaba consultas, realizaba búsquedas web con fuentes citadas y podía ampliar la profundidad cuando la primera tesis no era suficiente."
                        },
                        {
                            label: "Síntesis",
                            detail: "La salida reunía hechos, información pendiente, posibles líneas de conversación y preguntas para el siguiente contacto en una ficha breve y recordable."
                        },
                        {
                            label: "Revisión humana",
                            detail: "El profesional valoraba la relevancia de las fuentes, descartaba interpretaciones inadecuadas y decidía qué utilizar. El sistema preparaba la atención, no automatizaba la relación."
                        }
                    ]
                },
                limit: "La demostración reconstruye el funcionamiento sin publicar el prompt, las reglas internas ni la interfaz original. El sistema fue construido, probado y entregado, pero solo existe confirmación limitada de su uso inicial."
            },
            {
                id: "op-05",
                num: "05",
                title: "Comprobar lo que puede sostenerse",
                status: "Comprobación",
                thesis: "Comprobar también consiste en reducir una afirmación hasta aquello que la evidencia permite defender.",
                explanation: "Reviso precisión, fuentes, privacidad, funcionamiento, comprensión y capacidad de uso. Después separo el trabajo realizado de los resultados que dependen de otras personas, condiciones o decisiones posteriores.",
                evidenceType: "claim-boundary",
                evidenceLabel: "Hechos sostenibles y límites de atribución de los tres proyectos",
                evidence: {
                    can: [
                        "El sistema inmobiliario fue construido, probado y entregado.",
                        "El sistema de experiencia se probó con clientes reales antes de convertirse en una instrucción operativa.",
                        "El seguimiento de la experiencia utilizó mensajes, reconstrucción de llamadas y comprobaciones recurrentes.",
                        "Después de la implantación aparecieron señales positivas vinculadas a la facilidad, la atención y la tranquilidad transmitida.",
                        "El plan cultural fue investigado, formulado, entregado y recibido positivamente."
                    ],
                    cannot: [
                        "No puede confirmarse el uso continuado del sistema inmobiliario.",
                        "No pueden atribuirse ventas u otros resultados comerciales al sistema inmobiliario.",
                        "No puede atribuirse toda la satisfacción o la retención al sistema de experiencia.",
                        "No puede afirmarse una ausencia total de fallos porque no existía un registro formal de incidencias.",
                        "No puede confirmarse la aplicación ni la financiación posterior del plan cultural."
                    ]
                },
                limit: "La comparación delimita qué puede afirmarse con la documentación disponible. No aporta métricas causales ni convierte una secuencia temporal en prueba de impacto."
            },
            {
                id: "op-06",
                num: "06",
                title: "Entregar para que continúe",
                status: "Continuidad",
                thesis: "La continuidad depende de que el criterio pueda utilizarse y revisarse sin reconstruirlo en cada interacción.",
                explanation: "Una entrega debe definir la activación, el uso esperado, las excepciones y la forma de revisar el sistema. Mi presencia posterior puede servir de apoyo, pero no debe ocultar qué necesita el trabajo para mantenerse.",
                evidenceType: "journey-map",
                evidenceLabel: "Activación y continuidad del sistema de experiencia de cliente",
                evidence: {
                    steps: [
                        {
                            label: "Activación",
                            detail: "El sistema se probó en interacciones reales y se ajustó antes de convertirse en una instrucción directa de funcionamiento."
                        },
                        {
                            label: "Uso transversal",
                            detail: "Al tratarse de un micronegocio, debía aplicarse en todos los puntos de contacto y por todas las personas implicadas, no por un departamento aislado."
                        },
                        {
                            label: "Revisión informal",
                            detail: "La continuidad se comprobaba mediante históricos de mensajes, reconstrucción de llamadas y preguntas recurrentes sobre el seguimiento del método."
                        },
                        {
                            label: "Punto de fuga",
                            detail: "Durante la saturación, una persona ajena al proyecto podía entrar como apoyo y responder desde su propio criterio, fuera de las líneas compartidas."
                        },
                        {
                            label: "Continuidad y mejora",
                            detail: "El sistema continúa presente según el seguimiento disponible. El estándar actual añade incorporación mínima para nuevos apoyos, revisión periódica de interacciones y registro de desviaciones."
                        }
                    ]
                },
                limit: "No existe una medición diaria del cumplimiento ni puede garantizarse autonomía completa. La experiencia sigue dependiendo del servicio prestado, de las personas que intervienen y de la revisión del método."
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
