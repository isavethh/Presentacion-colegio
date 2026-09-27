/* ============================================================
   ÁREAS, CAPTURAS POR MÓDULO Y CIRCUITOS COMPLETOS
   Textos de los circuitos tomados de la Guía para la dirección
   (manuales/venta). Las capturas son del sistema funcionando.
   ============================================================ */
var AREAS=[
 {id:'academico',n:'Académico',c:'#7C1D3F',d:'Desde la postulación hasta el boletín: todo lo que pasa en el aula.'},
 {id:'economico',n:'Económico',c:'#2F7D4F',d:'Pensiones, becas, cobros, caja y compras, con cada boliviano controlado.'},
 {id:'vida',n:'Vida escolar',c:'#C2410C',d:'El cuidado del estudiante: convivencia, orientación, salud y actividades.'},
 {id:'campus',n:'Campus y servicios',c:'#57534E',d:'La operación diaria: transporte, portería, inventario y mantenimiento.'},
 {id:'comunidad',n:'Comunidad y familias',c:'#0F766E',d:'La relación con los padres: app, comunicados, trámites y admisión.'},
 {id:'direccion',n:'Dirección e inteligencia',c:'#4338CA',d:'La foto del colegio y las alertas para decidir a tiempo.'},
 {id:'base',n:'Base del sistema',c:'#18181B',d:'Lo que está debajo de todo y hace que los módulos trabajen juntos.'}
];
var ROLES=['Dirección','Administración','Secretaría','Coordinación','Docentes','Orientación','Personal','Familias','Estudiantes'];

/* Tamaño y tipo de cada captura (generado desde los manuales) */
var IMG={"adm-panel":["screen",1440,900],"cur-seduca":["screen",1440,900],"hor-armar":["screen",1440,900],"eva-avance":["screen",1440,900],"gob-calendario":["screen",1440,900],"con-sanciones":["screen",1440,900],"gob-panel":["screen",1440,900],"rie-panel":["screen",1440,900],"est-cursos":["screen",1440,900],"gob-aprobaciones":["screen",1440,900],"adm-campanas":["screen",1440,900],"rie-reglas":["screen",1440,900],"hor-carga":["screen",1440,900],"tra-trazabilidad":["screen",1440,900],"mat-cupos":["screen",1440,900],"asi-panel":["screen",1440,900],"cie-inconsistencias":["screen",1440,900],"an-02-lista":["screen",1440,900],"an-05-planilla":["screen",1440,900],"aranceles-lista":["screen",1440,900],"becas-programas":["screen",1440,900],"cartera-lista":["screen",1440,900],"caja-del-dia":["screen",1440,900],"generar-previa":["screen",1440,900],"conciliacion-pendientes":["screen",1440,900],"compromisos-pantalla":["screen",1440,900],"c2-panel":["screen",1440,900],"notas-1":["phone",432,960],"asistencia-1":["phone",432,960],"qr-app-qr":["raw",400,639],"qr-app-recibido":["raw",400,639],"comunicados-1":["phone",432,960],"inicio-casa":["phone",432,960],"horario-1":["phone",432,960],"aviso-enfermeria-retiro":["phone",432,960],"familia-pagos":["phone",432,960],"familia-con-beca":["phone",432,960],"familia-en-mora":["phone",432,960],"g-01-inicio":["phone",432,960],"portada-apoderado":["phone",432,960],"portada-docente":["phone",432,960],"portada-alumno":["phone",432,960],"portada-familia-resumen":["phone",432,960],"portada-3-avisos":["phone",432,960],"01a-docente-cita-horarios":["phone",432,712],"01b-docente-cita-lugar":["crop",760,676,1],"01c-comunicado-enviado":["crop",720,510,1],"02-docente-elige-familia":["crop",760,781,1],"03a-docente-reunion-confirmada":["crop",760,542,1],"04a-familia-notificaciones":["phone",432,864],"05-familia-agenda-reuniones":["crop",760,440,1],"06-familia-elige-horario":["phone",432,688],"07-familia-confirma-horario":["phone",432,688],"08-enfermeria-panel-del-dia":["screen",1440,900],"09-enfermeria-bandeja-visitas":["screen",1440,900],"visitas-01-pantalla":["phone",432,960],"visitas-02-hoja":["crop",720,714,1],"16-docente-tipos-de-alerta":["screen",1440,900],"23-incidente-participantes":["crop",720,865,1],"20-triaje-por-alumno":["screen",1440,900],"21-triaje-ficha":["screen",1440,900],"24-sancion-bloqueo":["screen",1440,900],"25-direccion-sanciones-por-aprobar":["screen",1440,900],"26-direccion-rechazo-con-motivo":["crop",760,161],"27-familia-aviso-convivencia":["crop",760,500,1],"29-familia-esperan-tu-respuesta":["crop",760,556,1],"31-familia-por-que-no-autoriza":["crop",720,667,1],"30-familia-como-va":["crop",760,816,1],"33-alumno-convivencia":["crop",760,957,1],"13-notas-cuaderno":["screen",1440,900],"docente-tareas-01-cuadernos":["phone",432,960],"docente-tareas-02-planilla":["phone",432,960],"docente-tareas-03-nueva-tarea":["phone",432,960],"docente-tareas-04-alumno-ve-la-tarea":["phone",432,960],"14-notas-avance":["screen",1440,900],"lic-01-pedir-form":["crop",512,614],"lic-02-mis-licencias":["crop",760,192],"lic-03-la-norma":["crop",680,502],"lic-04-bandeja":["crop",760,207],"lic-06-rechazo":["crop",512,217],"lic-07-citar":["crop",512,338],"lic-08-rastro":["crop",760,254],"resumen-01-pantalla":["phone",432,888],"resumen-03-un-aviso-por-hijo":["crop",760,1133,1],"resumen-04-aviso-abierto":["crop",760,535,1],"resumen-02-sin-novedades":["crop",760,936,1],"resumen-05-hoja":["crop",720,1012,1],"asist-01-lista-cerrada":["crop",760,348],"asist-02-aviso-abierto":["phone",432,960],"ext-01-oferta-direccion":["screen",1440,900],"ext-02-programa-y-grupos":["screen",1440,900],"ext-03-abrir-grupo":["screen",1440,900],"ext-04-inscripciones":["screen",1440,900],"ext-05-familia-oferta":["phone",432,960],"ext-09-instructor-tareas":["phone",432,960],"ext-10-instructor-notas":["phone",432,960],"ext-06-cajon":["phone",432,960],"ext-07-taller-avisos":["phone",432,960],"ext-08-taller-tareas":["phone",432,960],"15-traza-casos-del-alumno":["crop",480,440],"19-triaje-apilada":["screen",1440,900]};

/* Capturas reales por módulo: w = pantalla web (monitor), p = celulares, cx = circuito relacionado */
var MEDIA={
 admisiones:{w:'adm-panel'},
 curriculo:{w:'cur-seduca'},
 horarios:{w:'hor-armar',p:['horario-1']},
 asistencia:{w:'an-02-lista',p:['asistencia-1'],cx:'resumen'},
 notas:{w:'an-05-planilla',p:['notas-1'],cx:'notas'},
 docente:{w:'eva-avance',p:['docente-tareas-03-nueva-tarea'],cx:'notas'},
 calendario:{w:'gob-calendario'},
 pensiones:{w:'aranceles-lista',p:['familia-pagos']},
 becas:{w:'becas-programas',p:['familia-con-beca']},
 cobranza:{w:'cartera-lista',p:['familia-en-mora']},
 pagos:{w:'conciliacion-pendientes',p:['qr-app-qr']},
 tesoreria:{w:'caja-del-dia'},
 convivencia:{w:'con-sanciones',cx:'convivencia'},
 bienestar:{w:'19-triaje-apilada',cx:'convivencia'},
 salud:{w:'c2-panel',p:['aviso-enfermeria-retiro'],cx:'enfermeria'},
 extracurriculares:{w:'ext-01-oferta-direccion',p:['ext-05-familia-oferta'],cx:'extra'},
 portal:{p:['inicio-casa','portada-familia-resumen','familia-pagos'],cx:'resumen'},
 comunicacion:{p:['comunicados-1','portada-3-avisos'],cx:'reunion'},
 crm:{w:'adm-campanas'},
 analitica:{w:'gob-panel'},
 riesgo:{w:'rie-panel',cx:'historia'},
 personal:{w:'hor-carga',cx:'licencias'},
 personas:{w:'tra-trazabilidad',cx:'historia'},
 estructura:{w:'est-cursos'},
 aprobaciones:{w:'gob-aprobaciones'},
 reglas:{w:'rie-reglas'}
};

var C=[
{id:'reunion',n:'Una reunión con la familia',
 b:'Una citación deja de ser una nota en el cuaderno y pasa a ser un pedido con estado, que no se puede dejar a medias.',
 corto:'De la citación al horario cerrado, sin una sola llamada de teléfono.',
 k:['La docente ofrece tres horarios, nunca uno solo.','La familia elige desde el teléfono y la reunión queda cerrada.','Queda escrito quién citó, por qué, cuándo y en qué aula.'],
 p:['«No me llegó la nota.» Nadie puede probar lo contrario.','La familia dice que ese día no puede, y ahí se terminó la conversación.','Si la reunión al final se hace, no queda escrita en ningún lado.'],
 fr:'Seis meses después hay que mostrar que el colegio acompañó a ese chico, y no hay nada que mostrar.',
 fl:[['Docente','Cita desde el comunicado y ofrece tres horarios'],['Familia','Recibe el aviso con título y cuerpo'],['Familia','Elige uno, y recién ahí se cierra'],['Docente','Se entera sola, con fecha y aula']],
 sc:[
  {i:['02-docente-elige-familia','01a-docente-cita-horarios'],h:'La docente cita desde el mismo comunicado',t:'Elegir al alumno alcanza: el comunicado le llega a su apoderado, sin que nadie busque un teléfono. Y pide al menos tres horarios. La pantalla lo dice sin vueltas: «con uno solo la familia no elige, obedece».'},
  {i:['01b-docente-cita-lugar','01c-comunicado-enviado'],h:'Lugar exacto, y a cuántos les llegó',t:'Duración, modalidad y, si es en el colegio, bloque y aula: con eso el aula queda tomada a esa hora. Al enviarlo, el sistema dice a cuántas personas les llegó.'},
  {i:['04a-familia-notificaciones'],h:'A la familia le llega un aviso que dice algo',t:'No es una notificación muda que dice «tienes novedades». Dice qué pasó y qué se espera de la persona.'},
  {i:['06-familia-elige-horario','07-familia-confirma-horario'],h:'La familia no puede contestar «no» a secas',t:'Cuando el apoderado abre la citación no encuentra un botón de rechazo. Encuentra los tres horarios y una instrucción: «Elegí uno de estos 3». El botón de confirmar está apagado hasta que marque uno.'},
  {i:['03a-docente-reunion-confirmada','05-familia-agenda-reuniones'],h:'Y del otro lado, sola',t:'Dentro del comunicado que ella misma escribió, la docente ve la reunión confirmada: jueves 10/09, 16:00, Bloque B, Aula 15. La misma reunión aparece en la agenda de la familia sin que nadie la haya vuelto a cargar.'}
 ],
 q:'Quién citó, cuándo, por qué motivo, qué le llegó a la familia, qué tres horarios se le ofrecieron, cuál eligió, cuándo lo eligió y en qué aula se hizo. Nada de eso se carga aparte: es el subproducto de haber usado el sistema para citar.',
 note:'Pregunta cómo prueban hoy que una familia recibió una citación. Después muestra el paso 4: el botón apagado hasta que la familia elige un horario es lo que más recuerdan los directores.'},

{id:'enfermeria',n:'Enfermería',
 b:'Cada salida del aula es una visita con estado. El estado avanza porque alguien lo hace avanzar, y alguien tiene que cerrarla.',
 corto:'Quién salió del aula, quién lo atendió y quién no volvió.',
 k:['Quién espera, quién está siendo atendido y desde hace cuánto.','Quién quedó sin confirmar que volvió al aula.','El aviso a la familia sale del mismo lugar.'],
 p:['El aula lo dio por ido y Enfermería todavía no lo vio llegar.','Si la familia llama, quien atiende no tiene cómo saber en qué estado está.','Nadie confirma que volvió, y esa confirmación es la que hace falta si algo salió mal.'],
 fr:'Entre que un chico sale del aula descompuesto y que vuelve, el colegio tiene un alumno del que nadie sabe exactamente dónde está.',
 fl:[['Docente','Registra la salida del aula'],['Enfermería','Lo recibe y lo atiende'],['Enfermería','Decide: vuelve al aula o se retira'],['Familia','Recibe el aviso y lo acepta']],
 sc:[
  {i:['08-enfermeria-panel-del-dia'],h:'El panel del día',t:'Cuántos esperan, cuántos están en atención y cuántos quedaron sin confirmar que volvieron. Los avisos del pie salen solos.',big:['7','«7 estudiantes sin retorno confirmado» no es una estadística. Es una lista de siete chicos que hay que ir a buscar antes de cerrar el día.']},
  {i:['09-enfermeria-bandeja-visitas'],h:'La bandeja: quién espera y a quién le toca',t:'Cada fila dice la hora, el alumno, su curso, de qué clase venía y con qué docente, el estado y hace cuánto espera. Las esperas largas se marcan solas en rojo. Los estados son los del proceso real: en espera, en atención, retornó al aula, retirado por apoderado, retorno autorizado.'},
  {i:['aviso-enfermeria-retiro'],h:'El aviso a la familia sale del mismo lugar',t:'Cuando el área decide que el chico se tiene que ir a casa, el apoderado recibe un aviso con el nombre, el curso, desde qué hora está en Enfermería y qué se le pide. Y tiene que aceptarlo.'},
  {i:['visitas-01-pantalla','visitas-02-hoja'],h:'Y la familia se lleva las visitas en papel',t:'Cada visita con su recorrido: a qué hora salió, cuándo lo atendieron y si volvió al aula. La hoja se lleva al pediatra: «fue tres veces este mes, siempre después del recreo». Va el informe que el área escribió para la familia; el motivo y el diagnóstico no salen del colegio.'}
 ],
 q:'Sobre cualquier chico, cualquier día: a qué hora salió del aula, de qué clase, quién lo mandó, quién lo atendió, cuánto estuvo, cómo terminó y a quién de la familia se le avisó. Y sobre el año: cuántas veces salió del aula ese alumno, un dato que hoy no existe en ningún cuaderno.',
 note:'Haz la pregunta en voz alta: «si ahora llama una mamá preguntando por su hijo que está en Enfermería, ¿quién le contesta y con qué dato?». Luego muestra el aviso de los 7 sin retorno.'},

{id:'convivencia',n:'Un caso de convivencia',
 b:'Un empujón en el recreo cruza cinco personas y una semana. Cada paso tiene un dueño distinto, y ninguno puede hacer el paso del otro.',
 corto:'De la primera señal del docente al aviso a la familia.',
 k:['La docente cuenta lo que vio, sin tener que resolverlo.','Orientación decide, y el fundamento es obligatorio.','Dirección aprueba la medida antes de que llegue a las familias.'],
 p:['Lo urgente y lo que ya se está trabajando caen en la misma pila de cincuenta cosas.','Cuando alguien decide que un hecho no amerita abrir un caso, esa decisión no queda en ningún lado.','Dos docentes reportan al mismo chico y se abren dos expedientes con dos responsables.','La sanción la decide quien la propone. Nadie la mira antes de que salga.'],
 fl:[['Docente','Reporta lo que vio'],['Orientación','Tría y decide'],['Orientación','Abre el caso'],['Dirección','Aprueba o devuelve'],['Familia','Autoriza o queda notificada']],
 sc:[
  {i:['16-docente-tipos-de-alerta'],h:'La docente cuenta, no diagnostica',t:'Ocho cosas que un docente puede notar, de «conducta en clase» a «señales de salud o cansancio». No se elige un diagnóstico, se elige qué se vio. Debajo del campo, la instrucción: «describir lo que pasó, no lo que te parece que le pasa».'},
  {i:['23-incidente-participantes'],h:'Quién causó el daño y quién lo recibió',t:'Si hubo una falta es un incidente, y el formulario pide las dos cosas por separado. «A quien recibió el daño no se lo sanciona.» No es una recomendación: es una regla que el sistema hace cumplir más adelante.'},
  {i:['20-triaje-por-alumno'],h:'La banda de color que ordena el día',t:'Por alumno, no por reporte. «Se pinta en rojo al alumno con 5+ reportes o 3+ docentes distintos en 7 días; en ámbar desde 3 reportes o 2 docentes.» El umbral lo fija la dirección una sola vez, para todos.'},
  {i:['21-triaje-ficha'],h:'Cuatro salidas, y todas quedan escritas',t:'Bienestar, convivencia, las dos, o ninguna. «Sin caso: se miró y se decidió no abrir caso. El fundamento queda escrito igual.»'},
  {i:['24-sancion-bloqueo'],h:'La línea que el sistema no deja cruzar',t:'«Esta persona recibió el daño. Una sanción sobre ella no se puede enviar.» El botón queda apagado con el motivo escrito. En el apuro de cerrar un conflicto, acá no depende de que alguien se acuerde del criterio.'},
  {i:['25-direccion-sanciones-por-aprobar','26-direccion-rechazo-con-motivo'],h:'El orientador no se aprueba a sí mismo',t:'La bandeja de Dirección, con el alumno, la medida, su duración y el expediente. Devolver pide el motivo: «Dos días es excesivo para un primer episodio». Esa frase vuelve al orientador y queda en el expediente.'},
  {i:['27-familia-aviso-convivencia','29-familia-esperan-tu-respuesta'],h:'Lo que ve la familia',t:'Dos avisos distintos: «El colegio te pide una autorización» y «El colegio te escribió». Un acompañamiento con psicología tiene botones; una suspensión se comunica, no se consulta.'},
  {i:['31-familia-por-que-no-autoriza','30-familia-como-va'],h:'La familia puede decir que no, con sus palabras',t:'«Decir que no es tu derecho y no perjudica a tu hijo.» Y queda registrado tal cual: «Ya está en tratamiento con una psicóloga particular desde junio».'},
  {i:['33-alumno-convivencia'],h:'Lo que ve el alumno, y lo que no',t:'Ve las medidas que le tocan a él y en qué estado está cada una. No ve a los otros chicos del caso, ni el relato del docente, ni el fundamento del orientador. Es a propósito.'}
 ],
 q:'Sobre cualquier hecho: quién lo reportó y con qué palabras, quién lo miró, qué decidió y por qué, quién aprobó la medida o la devolvió y con qué motivo, qué se le comunicó a la familia y qué contestó.',
 note:'Este es el circuito más largo. Si hay poco tiempo, muestra solo tres pantallas: la banda de color, la sanción bloqueada y la bandeja de Dirección.'},

{id:'notas',n:'Notas y tareas',
 b:'La dirección define una sola vez con qué se evalúa. El docente carga dentro de esa norma. El promedio lo hace el sistema, y nadie escribe una fórmula.',
 corto:'Un solo criterio para todo el colegio, y el atraso a la vista.',
 k:['Una sola forma de calcular la nota para todo el colegio.','El trimestre no cierra con la norma incumplida.','La dirección ve el atraso antes del cierre, no después.'],
 p:['Cada docente arma su planilla, y dos materias del mismo curso promedian distinto.','Un error de fórmula no se descubre hasta que una familia reclama, y el boletín ya salió.','La dirección no sabe quién va atrasado hasta la semana del cierre.'],
 fl:[['Dirección','Fija dimensiones, pesos y escala'],['Docente','Crea la tarea dentro de una unidad'],['Docente','Califica; el sistema promedia'],['Alumno y familia','Ven la nota en la app']],
 sc:[
  {i:['13-notas-cuaderno','docente-tareas-02-planilla'],h:'La norma, arriba de la planilla',t:'En una línea: escala 0 a 100, aprueba con 51, la nota sale de unidades y tareas. «Falta 1 cosa que pide Dirección Académica»: el docente puede seguir cargando, pero el trimestre no cierra con la exigencia incumplida. Y la misma advertencia le aparece en el teléfono.'},
  {i:['docente-tareas-01-cuadernos','docente-tareas-03-nueva-tarea','docente-tareas-04-alumno-ve-la-tarea'],h:'La tarea se carga desde el teléfono',t:'La docente abre su cuaderno desde la app. «Al crearla, tus alumnos y sus familias la ven en la app y reciben el aviso.» Y el alumno la ve con su nota: 95/100, «Calificada».'},
  {i:['14-notas-avance'],h:'El atraso, antes del cierre',t:'«Verde: al día; ámbar: falta.» Cada fila es una materia con su docente y su avance. Desde la última columna se entra al cuaderno de esa materia.'}
 ],
 q:'Una sola forma de calcular la nota para todo el colegio, la certeza de que ningún trimestre cierra con la norma incumplida, y la lista de quién va atrasado mientras todavía se puede hacer algo.',
 note:'Pregunta cuántos boletines se corrigieron el año pasado por un error de promedio. Este circuito se vende solo con esa respuesta.'},

{id:'licencias',n:'Licencias del personal',
 b:'Un docente avisa que no va a poder venir. Lo pide él, lo decide la dirección, y las dos cosas quedan escritas con nombre, fecha y motivo.',
 corto:'Quién pide, quién decide, y qué queda escrito de las dos cosas.',
 k:['La norma de anticipación la fija la dirección, no cada caso.','Rechazar exige decir por qué. Aprobar no.','Nadie decide su propia licencia.'],
 p:['Se avisa por mensaje, y el mensaje se pierde entre otros cincuenta.','Nadie recuerda si se aprobó, quién la aprobó, ni con qué condición.','Cuando el pedido llega dos días antes, la discusión es si «se avisó con tiempo». Sin una regla escrita, esa discusión no tiene final.'],
 fl:[['Docente','Pide la licencia con motivo y fechas'],['Sistema','Controla la anticipación'],['Dirección','Aprueba, rechaza o cita'],['Docente','Ve la respuesta con las mismas palabras']],
 sc:[
  {i:['lic-01-pedir-form'],h:'Quién pide: siempre el propio interesado',t:'Motivo, turno, desde y hasta, y para qué la necesita. La pantalla pregunta «¿Se sabía con tiempo?» y ofrece dos caminos: con tiempo o urgente. Una licencia no acepta fechas pasadas: para una falta que ya ocurrió corresponde una justificación.'},
  {i:['lic-03-la-norma'],h:'La regla la fija la dirección, una vez',t:'Dos números y nada más, que rigen para todas las licencias desde que se guardan.',big:['7','días de anticipación para una licencia con tiempo. Y 3 días adelante es lo máximo que puede cubrir una urgencia.']},
  {i:['lic-04-bandeja','lic-02-mis-licencias'],h:'Quién decide, y qué ve el docente',t:'La bandeja de Dirección con la norma vigente a la vista: quién, por qué motivo, qué días y cuántos días de clase abarca. El docente ve lo suyo en una tabla, con quién lo firmó.'},
  {i:['lic-06-rechazo','lic-07-citar'],h:'Rechazar pide motivo. Citar no es ni sí ni no.',t:'«Decile por qué. Es lo que va a leer, y lo que queda escrito.» Y citar a reunión deja la licencia esperando la conversación: el estado que en el cuaderno no existe y es el más frecuente.'},
  {i:['lic-08-rastro'],h:'El rastro queda en la solicitud',t:'Cada licencia resuelta lleva la citación previa, el nombre de quien decidió y el comentario. Un director que pide una licencia no puede aprobársela, aunque sea quien aprueba todas las demás.'}
 ],
 q:'Sobre cualquier licencia: quién la pidió, cuándo, para qué, con cuánta anticipación, si hubo una conversación previa, quién la resolvió, cuándo y con qué palabras. Las dos partes ven lo mismo.',
 note:'Para el director de RR. HH. o el promotor: la regla de los 7 días termina las discusiones de «avisé con tiempo».'},

{id:'resumen',n:'El resumen semanal',
 b:'Cada lunes, un aviso por hijo con cómo vino la semana. Lo prende la familia, y las semanas en que no pasó nada no se envían.',
 corto:'Cada lunes, cómo vino la semana de su hijo. Y en una hoja.',
 k:['Asistencia, notas de aula y tareas, en una pantalla.','El asunto del aviso no cuenta lo que pasó.','La semana se baja en una hoja, para la reunión.'],
 p:['Una familia se entera de cómo le fue a su hijo cuando ya es tarde: en la reunión de padres, o cuando llega el boletín.','Lo que pasa en el medio le llega por el chico, o no le llega.'],
 fl:[['Docentes','Toman lista y cargan notas'],['Sistema','Arma la semana de cada hijo'],['Familia','Recibe un aviso por hijo el lunes'],['Familia','Baja la hoja para la reunión']],
 sc:[
  {i:['resumen-01-pantalla'],h:'Tres cosas y ninguna más',t:'La asistencia de la semana, las notas de aula que dejaron los docentes y las tareas con su nota. Dice «Calificada», nunca «Entregada»: lo único que el colegio registra es que el docente cargó la nota.'},
  {i:['resumen-03-un-aviso-por-hijo','resumen-04-aviso-abierto'],h:'El aviso del lunes',t:'Un aviso por hijo, no uno por familia. El asunto dice «El resumen de la semana de Adrian»: solo el primer nombre, y nada de lo que pasó. «Faltó dos veces» en la pantalla de bloqueo lo lee cualquiera.'},
  {i:['resumen-02-sin-novedades','resumen-05-hoja'],h:'Las semanas sin novedades no se envían',t:'Un resumen que dice «no pasó nada» todas las semanas entrena a la familia a no abrirlo. Lo prende la familia: nace apagado. Y la semana se baja en una hoja con la fecha de descarga, que la vuelve un respaldo tres meses más tarde.'},
  {i:['asist-01-lista-cerrada','asist-02-aviso-abierto'],h:'Y la falta no espera al lunes',t:'Cerrar la lista es el momento en que la falta pasa a ser un hecho del colegio, y el aviso sale ahí. Dice el día y la hora, porque el colegio toma lista por clase. Al que llegó tarde o faltó con permiso no le llega.'}
 ],
 q:'Una vía semanal que la familia eligió tener, con lo que el colegio ya registró. Lo urgente no espera al lunes: la falta sale el mismo día, en cuanto la lista se cierra, sin que nadie tenga que acordarse de mandar un mensaje.',
 note:'Muéstralo desde el celular de la familia. Es el circuito que el director imagina contando en la próxima reunión de padres.'},

{id:'extra',n:'Actividades extracurriculares',
 b:'Un taller de ajedrez tiene lo mismo que una materia: quién entra, cuánto cuesta, qué se pide y qué nota sacó.',
 corto:'Quién entra al taller, cuánto cuesta, y qué hizo el chico adentro.',
 k:['La dirección abre el grupo y le pone su precio.','La familia se anota desde el teléfono, o el colegio la invita.','El instructor pide tareas y las califica, y en casa se ve.'],
 p:['El colegio no sabe cuántos chicos hay en cada taller hasta que alguien cuenta cabezas.','Quién pagó y quién no se lleva aparte, en una planilla que no habla con nadie.','El instructor avisa por un grupo de mensajes, y la familia que no está en ese grupo no se entera.'],
 fl:[['Dirección','Define el programa'],['Dirección','Abre cada grupo con su precio'],['Familia','Se anota o acepta la invitación'],['Dirección','Aprueba el lugar'],['Instructor','Pide tareas y califica']],
 sc:[
  {i:['ext-02-programa-y-grupos'],h:'Un programa, y los grupos que cuelgan de él',t:'El mismo club con dos grupos distintos, cada uno con su horario, su cupo, cómo se entra y cuánto cuesta. El precio es del grupo: el taller puede ser gratis en la mañana y cobrarse en el intensivo del sábado.'},
  {i:['ext-03-abrir-grupo'],h:'Dos decisiones, grupo por grupo',t:'Se anotan solas o entran por invitación; y el monto se muestra o solo se dice que hay uno. Si el grupo es por invitación, no aparece en la app de las familias que no fueron invitadas.'},
  {i:['ext-05-familia-oferta'],h:'La familia lo ve desde su teléfono',t:'Arriba, en qué quedó cada taller de su hijo. Abajo, solo lo que todavía no tiene. «Postular es pedir un lugar»: el colegio revisa el cupo y responde.'},
  {i:['ext-04-inscripciones'],h:'La bandeja de la dirección',t:'Cada pedido con su estado, y los botones cambian con él. Cada fila tiene su historial: quién pidió, quién resolvió, cuándo y con qué motivo.'},
  {i:['ext-09-instructor-tareas','ext-10-instructor-notas'],h:'El instructor pide y corrige',t:'Solo en su taller. «La casilla vacía es del que todavía no corregiste, y no es un cero.» La nota sirve para acompañar y para el certificado del taller, y no va al boletín.'},
  {i:['ext-06-cajon','ext-07-taller-avisos','ext-08-taller-tareas'],h:'Y en casa se ve el mismo día',t:'Los talleres cuelgan del nombre del hijo, con su horario. Lo que el instructor escribe llega a la campana; lo urgente se distingue.'}
 ],
 q:'Cuántos chicos hay en cada taller y cómo entró cada uno. Qué se cobró en cada grupo. Qué pidió el instructor, para cuándo, y qué nota sacó cada alumno.',
 note:'Buen cierre para colegios con muchos talleres: la familia se anota, se cobra y se califica sin grupos de mensajes.'},

{id:'historia',n:'Un alumno, una historia sola',
 b:'No hay una pantalla mágica que junte todo al final. El registro es lo que va quedando cada vez que alguien usa el sistema para hacer su trabajo.',
 corto:'Por qué el registro ya está escrito cuando hace falta.',
 k:['Lo que quedó escrito sin que nadie lo cargara aparte.','Por eso el sistema puede avisar antes, y no después.'],
 p:['La información de un chico está repartida entre el cuaderno del docente, la planilla de notas, el registro de Enfermería y la carpeta de convivencia.','Cuando hay que sentarse con los padres, alguien junta todo eso a mano la noche anterior.'],
 fl:[['Citación','Quién citó y qué eligió la familia'],['Enfermería','A qué hora salió y quién lo atendió'],['Convivencia','Qué se reportó y qué se decidió'],['Dirección','Lo ve todo en una línea de tiempo']],
 sc:[
  {i:['tra-trazabilidad'],h:'La línea de tiempo del estudiante',t:'Todo lo que le pasó, ordenado, y de dónde salió cada cosa: citaciones, visitas a Enfermería, casos, notas y avisos a la familia.'},
  {i:['15-traza-casos-del-alumno'],h:'Y por eso puede avisar antes',t:'Cuando la orientadora está por clasificar un incidente nuevo, la pantalla le muestra lo que ese mismo chico ya tiene abierto, con el número de cada caso y su estado. Nueve hechos del mismo estudiante. Sin esto, el décimo se convierte en un expediente nuevo con otro responsable.'}
 ],
 q:'La respuesta a la única pregunta que importa cuando algo se discute: qué hizo el colegio con este chico, quién lo hizo y cuándo. Escrita desde el día en que pasó, no reconstruida la noche anterior a la reunión.',
 note:'Cierra el recorrido de circuitos aquí. Es el que convierte «el sistema registra» en «el colegio puede responder».'}
];

var TRES=[
 ['«Le avisamos a la familia.»','¿Cuándo, con qué texto, y quién dice que lo leyó?'],
 ['«El chico está en Enfermería.»','¿Desde qué hora, y volvió al aula?'],
 ['«Ya lo estamos trabajando.»','¿Quién, desde cuándo, y qué se hizo la última vez?']
];

/* Recorrido guiado: '@home' = inicio, 'c:id' = circuito, id = módulo, '@cierre' = cierre */
var TOUR=['@home','c:reunion','c:enfermeria','notas','asistencia','pensiones','pagos','portal','c:convivencia','analitica','riesgo','c:historia','permisos','@cierre'];
