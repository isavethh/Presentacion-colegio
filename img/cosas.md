# Lo que falta del proyecto

Inventario de todo lo que las especificaciones de `docs/cole3.txt` y `docs/cole 4.txt` exigen y el
repositorio todavía no tiene, verificado archivo por archivo contra el código del 29 de septiembre de
2026.

---

## Cómo leer esto

**Los dos archivos son 44 documentos, no dos.** Son extracciones de PDF concatenadas. `cole3.txt`
trae 20 documentos: los módulos operativos OP01 a OP13 y los ocho capítulos de IA transversal
(MT01_IA a MT08_IA). `cole 4.txt` trae 24: los módulos transversales MT01 a MT21 y las nueve guías de
plataforma (arquitectura, design system, estado, routing, QA, accesibilidad, seguridad,
observabilidad y handoff).

**Entre los 44 documentos se especifican 349 pantallas.** El repositorio tiene 325 rutas de producto
(más 74 del template de administración comprado, que no cuentan). El número parecido esconde que no
son las mismas: hay módulos enteros del proyecto que las specs no mencionan (compras, tienda,
biblioteca, transporte, patrimonio, tesorería) y módulos enteros de las specs que el proyecto no
empezó.

**La numeración MT de las specs no es la del proyecto.** Esto hace perder tiempo si no se sabe:

| Spec | Proyecto |
|---|---|
| MT10 Gestión Documental | `components/mt/mt04-documentos` |
| MT16 Comunicaciones | `components/mt/mt06-notificaciones` |
| MT12 Workflows | `components/mt/mt08-workflows` |
| MT19 Reportes | `components/mt/mt12-reportes` |
| OP04 Calendarios | `components/mt/mt09-calendarios` |
| MT01, MT03, MT05, MT20 | coinciden |

En este documento manda la función, no el número. Cada punto dice qué pantalla falta y qué tiene que
hacer.

**Cómo se verificó.** Cada ausencia se buscó en `app/`, `src/`, `components/` y `lib/` por nombre en
inglés y en castellano antes de escribirla. Varias sospechas resultaron falsas y no están en la
lista: comparar versiones de malla, carga horaria semanal, rúbricas de evaluación, reporte SEDUCA,
auditoría y cierre de asistencia, línea de tiempo de intervenciones y el roster del docente sí
existen.

---

## Resumen

| Bloque | Pantallas pedidas | Estado |
|---|---|---|
| IA transversal (8 capítulos) | 99 | **nada construido** |
| Portal web de familia y estudiante | 8 | **nada construido** |
| Integraciones y conectores | 13 | **nada construido** |
| Calidad de datos y deduplicación | 12 | **nada construido** |
| Gobierno de datos, linaje y privacidad | 14 | **nada construido** |
| Administración de plataforma y tenants | 19 | 2 de 19 |
| Búsqueda institucional | 1 + transversal | **nada construido** |
| Auditoría y trazabilidad | 12 | 1 de 12 |
| Workflows y aprobaciones | 10 | componente suelto |
| Gestión documental | 7 | componentes sueltos |
| Reportes, tableros y KPIs | 13 | 3 de 13 |
| Personas y relaciones | 8 | 2 de 8 |
| Estructura institucional | 12 | 4 de 12 |
| Calendarios y periodos | 13 | 3 de 13 |
| Módulos OP académicos | ~110 | mayormente cubiertos |

---

# Parte 1. Lo que no existe en absoluto

## 1. El bloque de IA completo

Ocho capítulos, 99 pantallas especificadas, cero implementadas. Es el hueco más grande del proyecto y
el más detallado en las specs: unas 47.000 líneas entre los ocho documentos.

Lo único que hay hoy es `backend/ai-service` con **dos endpoints**: `POST /api/v1/ai/complete` y
`POST /api/v1/ai/rag/qa`. En el frontend hay dos puntos sueltos (`op08/ai/feedback-draft` y
`op10/follow-up/ai/explain-signal`) y el chat del template comprado, que no está conectado a nada
institucional.

### 1.0 Qué hace la IA, en concreto

**La regla de oro, que define todo lo demás:** el asistente solo puede responder con datos que el
usuario ya podría ver por medios normales, y solo puede sugerir acciones que ese usuario ya está
autorizado a iniciar. El modelo no es una excepción de seguridad: es otro consumidor gobernado por la
misma política institucional.

Con eso fijo, esto es lo que hace:

**Explica, prepara y deriva. No decide.** Puede explicar información institucional, guiar navegación,
sugerir el próximo paso, resumir una entidad permitida, preparar borradores no vinculantes, explicar
reglas de workflow, ayudar a encontrar un documento o un reporte, y derivar a una persona cuando la
acción necesita aprobación, evidencia, validación humana o confirmación de identidad.

#### Qué le pregunta cada perfil

| Perfil | Qué consulta | Qué nunca debe pasar |
|---|---|---|
| **Familia o tutor** | Pagos, documentos, comunicados, solicitudes, rendimiento general, trámites | Que vea datos de otro estudiante, rankings sensibles o información médica no autorizada |
| **Estudiante** | Horarios, tareas, comunicados, material permitido, solicitudes, orientación | Que reciba respuestas que sustituyan la evaluación del docente |
| **Docente** | Buscar estudiantes, grupos, evidencias, planificaciones, avance curricular, reportes | Que la IA se vuelva decisión disciplinaria, académica o médica automática |
| **Administrativo** | Solicitudes, documentos, matrículas, pagos, comunicaciones, soporte | Que salte workflows, autorizaciones o reglas financieras |
| **Dirección** | KPIs, alertas, riesgos, incidentes, auditoría, reportes | Que se use una respuesta sin evidencia para una decisión formal |
| **Soporte** | Errores, permisos, configuración, estado de integraciones | Que vea datos personales fuera de tickets autorizados |
| **Admin de plataforma** | Políticas, colegio, flags, límites, proveedores | Que introduzca secretos o prompts sensibles |

#### El copiloto dentro de cada módulo

Esto es lo más concreto de todo: la matriz que dice qué hace la IA **adentro** de cada pantalla que
el colegio ya usa. Va traducida a los nombres del proyecto, porque ese capítulo usa **una tercera
numeración** distinta de la del proyecto y de la del resto de las specs: ahí OP05 es evaluación, OP06
es asistencia, OP07 es convivencia, OP08 es horarios, OP12 es biblioteca y OP13 es transporte.

| Pantalla del proyecto | Qué hace el copiloto ahí |
|---|---|
| Admisiones y matrícula (`op01`, `op02`) | Guía requisitos, valida documentos, explica observaciones, prepara la comunicación a la familia, y **no promete cupos sin regla** |
| Pensum y oferta (`op05`) | Explica cambios de plan, prerequisitos, vigencia y compatibilidad con SEDUCA |
| Agrupación académica (`op03`) | Sugiere asignación preliminar, advierte conflictos de paralelo o grupo, y justifica el impacto |
| Inscripción (`op02`) | Guía la selección de cursos, las restricciones y las excepciones autorizadas |
| Evaluación y calificaciones (`op08`) | Explica escala, promedios y observaciones. **No altera notas sin flujo autorizado** |
| Asistencia (`op07`) | Resume patrones, advierte ausencias críticas y prepara la comunicación segura |
| Convivencia y disciplina (`op11`, `op12`, `orientacion`) | Resume incidentes con enmascarado, sugiere la ruta normativa y bloquea datos sensibles sin permiso |
| Horarios (`op06`) | Explica choques, sugiere alternativas y valida disponibilidad |
| Aulas y recursos (`op06/aulas`) | Propone asignaciones, muestra conflictos y disponibilidad |
| Calendario (`calendarios`) | Explica eventos, feriados, vencimientos y dependencias |
| Extracurriculares (`op23`) | Informa cupos y requisitos, **sin inscribir automáticamente** |
| Biblioteca (`biblioteca`) | Ayuda a buscar recursos, vencimientos y políticas de préstamo |
| Transporte (`transporte`) | Explica rutas, paradas y cambios, con seguridad y autorizaciones |

En todos: el copiloto manda referencias institucionales, nunca objetos completos. Aplica control por
atributos, enmascara, cita fuentes y no ejecuta ninguna acción sin confirmación o workflow.

#### Qué predice la analítica

No predice por predecir. La meta es actuar antes de que un problema se deteriore. Lo que detecta:
**ausentismo**, **incumplimiento documental**, **riesgo de abandono**, retrasos de respuesta,
saturación de procesos, vencimientos, inconsistencias, morosidad operativa derivada, incidentes y
oportunidades de mejora.

Cada alerta lleva responsable, SLA, estado y trazabilidad, no es una notificación suelta. Y desde una
alerta se puede abrir el expediente de la persona, su contexto académico, sus documentos, la
auditoría, el workflow, las comunicaciones y los reportes, siempre respetando permisos.

La explicabilidad tiene que ser útil: drivers comprensibles, no tecnicismos estadísticos. Un
coordinador tiene que poder usar la explicación en una reunión con una familia.

#### Qué genera

El problema que resuelve, dicho por la propia spec: en un colegio se escribe demasiado, se responde
con prisa, se copian textos, se duplican documentos, se cometen errores de tono, se filtra
información sensible y se emiten comunicaciones sin trazabilidad.

Genera borradores de comunicados, informes y documentos, con plantillas versionadas, ajuste de tono
según la audiencia, fuentes adjuntas y vista previa por canal. **Una salida de IA nunca aparece como
documento oficial sin pasar por revisión, fuentes, permisos, versionado y decisión de política.** Los
cinco estados son `draft`, `needs_review`, `approved`, `rejected`, `published`, `archived`, y si falta
la fuente, el renderizador lo declara en vez de inventarla.

#### Qué automatiza

Preparar comunicados, ordenar tareas administrativas, detectar pendientes, sugerir rutas de atención,
generar borradores, abrir solicitudes, clasificar evidencias, preparar reportes y armar paquetes de
decisión.

Cada propuesta se presenta como una **Action Proposal** con objetivo, impacto, fuente, nivel de
confianza, permisos requeridos, datos sensibles involucrados, precondiciones y botón de revisión
antes de cualquier ejecución. Los tres antipatrones que la interfaz tiene que impedir: automatización
opaca, ejecución sin aprobación y recomendación sin fuente.

#### Dónde termina la IA y empieza cada módulo

La spec deja escrita la frontera, módulo por módulo. Sirve para discutir alcance sin dar vueltas:

| Módulo | Hasta dónde llega la IA |
|---|---|
| Personas | Resume datos permitidos y guía la actualización. No revela datos sensibles sin permiso, consentimiento o step-up |
| Estructura | Interpreta el alcance académico. No cambia sedes, cursos ni paralelos |
| Auditoría | Toda acción relevante emite evento auditable. **El asistente no oculta su uso ni borra rastros** |
| Búsqueda | Apoya la búsqueda. El ranking y el acceso siguen dependiendo de permisos |
| Documental | Explica documentos permitidos y prepara solicitudes. No descarga, comparte ni redacta sin permisos |
| Workflows | Explica reglas y próximos pasos. **No aprueba casos** sin acción explícita, permiso y step-up |
| Calidad de datos | Sugiere correcciones. **No consolida duplicados** ni normaliza de forma irreversible |
| Comunicaciones | Asiste en la redacción de borradores. **No envía campañas** sin flujo de aprobación |
| Integraciones | Explica el estado de sincronización. **No reintenta jobs críticos** sin autorización |
| Portales | Guía el autoservicio según perfil. No saltea pasos formales |
| Reportes | Explica KPIs y tendencias. **No inventa cifras** ni expone datasets |

### 1.1 Las piezas de gobierno que hay que construir antes de la primera pantalla

Lo de arriba es lo que la IA hace. Esto es lo que hay que construir para que lo pueda hacer sin
poner en riesgo al colegio. Son cuatro piezas transversales a los ocho capítulos.

**Las 9 capacidades, con su nivel de riesgo.** Una capacidad no es un prompt: es un permiso de
comportamiento que el colegio enciende o apaga por rol, módulo y sensibilidad.

| Capacidad | Riesgo | Qué hace |
|---|---|---|
| `GENERAL_HELP` | Baja | Responde navegación, conceptos y orientación, sin datos sensibles. |
| `ENTITY_SUMMARY` | Media | Resume una persona, curso, documento, solicitud, workflow o reporte que el usuario ya puede ver. |
| `DOCUMENT_EXPLAIN` | Alta | Explica un documento o evidencia, citando la fuente y respetando privacidad. |
| `WORKFLOW_GUIDANCE` | Media/Alta | Explica estado, reglas, SLA y próximos pasos. **No aprueba nada automáticamente.** |
| `REPORT_EXPLAIN` | Media | Explica un indicador: filtros, frescura, fuente y limitaciones. |
| `DRAFT_COMMUNICATION` | Alta | Genera un borrador **no enviado**, sujeto a MT16 y a aprobación de workflow. |
| `CONNECTOR_DIAGNOSTICS` | Alta | Explica corridas, errores y payloads redactados de una integración. |
| `DATA_QUALITY_ADVICE` | Alta | Sugiere correcciones **sin aplicar cambios irreversibles**. |
| `PRIVACY_REQUEST_HELP` | Crítica | Guía solicitudes sobre datos personales, con gobierno de datos y auditoría. |

Cada capacidad tiene especificado, uno por uno: cuándo aparece (feature flag activo + permiso +
política efectiva + contexto compatible), qué contexto se le permite mandar (IDs y pistas
minimizadas, fuentes resueltas en el servidor, sensibilidad marcada, **nunca el payload crudo en el
cliente**), qué UX es obligatoria (modo de respuesta, fuentes, limitaciones, acciones sugeridas y
feedback), qué la bloquea (sin permiso, fuente sensible, sin consentimiento, entidad fuera de
alcance, riesgo crítico o prompt inseguro) y qué pruebas mínimas exige (caso feliz, sin permiso,
fuente sensible, timeout, **inyección de prompt**, móvil, teclado y feedback).

La regla que cierra todas: *el usuario no debe poder convertir una respuesta de IA en acción oficial
sin pasar por el módulo dueño.*

**Los 12 permisos del asistente y los 8 atributos ABAC.**

| Permiso | Quién | Condición |
|---|---|---|
| `mt01_ia.assistant.use` | Todo usuario habilitado por colegio y rol | Colegio activo, flag activo, sesión válida |
| `mt01_ia.conversation.read` | Usuario autenticado | Solo conversaciones propias o delegadas a soporte |
| `mt01_ia.conversation.read_any` | Soporte senior, auditor, admin | **Requiere motivo**, redacción y registro de auditoría |
| `mt01_ia.feedback.create` | Todos los que usan el asistente | Sin datos personales libres sin sanitizar |
| `mt01_ia.handoff.create` | Familias, docentes, administrativos, soporte | Cola destino permitida por rol y módulo |
| `mt01_ia.policy.read` | Admin de colegio, seguridad, auditoría, soporte senior | Solo el colegio propio |
| `mt01_ia.policy.manage` | Admin de plataforma | **Step-up auth**, versionado y aprobación por workflow |
| `mt01_ia.prompt.read` | Usuarios por módulo habilitado | Solo prompts compatibles con su rol y alcance |
| `mt01_ia.prompt.manage` | Producto / gobierno de IA | Workflow de aprobación y pruebas de seguridad |
| `mt01_ia.source.reveal_sensitive` | Roles autorizados | **Step-up**, consentimiento, propósito y política de datos |
| `mt01_ia.audit.read` | Auditor, dirección, soporte | Redacción según rol, retención vigente |
| `mt01_ia.evaluation.read` | Producto / IA / soporte | Agregado o anonimizado cuando aplique |

Los ocho atributos que el frontend tiene que evaluar en cada consulta: `tenantId` (debe coincidir con
el colegio activo), `campusId` (dentro de las sedes autorizadas), `representedStudentId` (las
familias solo consultan estudiantes vinculados y activos), `moduleCode` (la capacidad tiene que estar
habilitada para ese módulo y ese rol), `entitySensitivity` (dato confidencial exige redacción o
step-up), `purpose` (toda consulta sensible necesita propósito institucional legítimo),
`consentStatus` (sin consentimiento, se bloquea o se anonimiza) y `retentionPolicy` (las
conversaciones vencidas solo muestran resumen auditado o estado expirado).

**El catálogo de errores normalizados.** Siete familias, cada una con su recuperación de interfaz y
su regla de auditoría:

| Código | Qué pasó | Qué hace la pantalla |
|---|---|---|
| `AI-401-SESSION` | Sesión expirada | Reautenticar y **no reenviar automáticamente** un prompt sensible |
| `AI-403-PERMISSION` | Permiso insuficiente | Explicar el límite y sugerir el módulo o el handoff |
| `AI-403-SCOPE` | Entidad fuera de alcance | Pedir cambio de alcance autorizado, o bloquear |
| `AI-409-POLICY` | La política cambió durante la conversación | Revalidar, **limpiar el contexto sensible** y avisar |
| `AI-422-CONTEXT` | Contexto inválido o incompleto | Mostrar qué contexto falta y permitir limpiarlo |
| `AI-429-RATE` | Límite de consultas | Reintentar más tarde o contactar soporte |
| `AI-5xx-PROVIDER` | Falla del proveedor | Modo degradado, sin perder la conversación |

Todos registran telemetría, y auditoría cuando afectan seguridad, una decisión o una fuente sensible.

**El catálogo gobernado de prompts.** Los prompts iniciales no se escriben libres: viven en un
catálogo versionado con `promptKey`, capacidad asociada, texto de intención, política y regla de
activación por colegio, rol, módulo y flag. Ejemplos del catálogo: `AI_PROMPT_001` con
`WORKFLOW_GUIDANCE` ("Explícame el estado de este caso y qué pasos siguen"), `AI_PROMPT_002` con
`ENTITY_SUMMARY` ("Resume esta entidad usando solo información visible para mi perfil"),
`AI_PROMPT_003` con `DRAFT_COMMUNICATION` ("Ayúdame a redactar un borrador institucional sin
enviarlo"). Todos con la misma política: exigen fuente cuando citan datos y bloquean datos personales
o sensibles no autorizados.

### 1.2 MT01_IA Asistente Institucional Gobernado

Seis pantallas montadas bajo `/assistant`, más dos superficies embebidas y 25 componentes
contratados.

**1. `AssistantWorkspacePage`**, en `/assistant`. El espacio central de conversación para usuarios
autorizados.
*Acciones:* buscar o iniciar conversación, cambiar el contexto permitido, ver las fuentes citadas,
pedir handoff a una persona, enviar feedback, limpiar sesión.
*Estados:* `conversation.loading`, `streaming`, `blocked-by-policy`, `source-unavailable`,
`step-up-required`, `network-timeout`, `empty-history`.
*Permisos:* `mt01_ia.assistant.use`, `mt01_ia.conversation.read`, `mt01_ia.feedback.create`.
*Lo que la hace distinta de un chat:* el usuario tiene que saber **antes de enviar** qué contexto se
va a usar, qué fuente respalda la respuesta y qué acciones requieren confirmación humana o step-up.

**2. `AssistantPolicyCenterPage`**, en `/assistant/policies`. Muestra las políticas activas por
colegio, rol, módulo, sensibilidad, fuentes, retención y capacidades.
*Acciones:* revisar capacidades activas, ver límites por rol, ver módulos habilitados, consultar el
disclaimer del colegio.
*Estados:* `policy.loading`, `no-policy`, `tenant-override`, `permission-denied`.
*Permisos:* `mt01_ia.policy.read`, `mt21.config.read`.

**3. `AssistantConversationAuditPage`**, en `/assistant/audit`. Consulta conversaciones, decisiones
de política, fuentes usadas y eventos relevantes, según los permisos de auditoría.
*Acciones:* filtrar por actor, filtrar por módulo, ver los eventos de auditoría, abrir el detalle de
una decisión de política, exportar el paquete de evidencia si está autorizado.
*Estados:* `audit.loading` y los de permiso.

**4. `AssistantPromptCatalogPage`**, en `/assistant/prompts`. Catálogo gobernado de prompts rápidos,
disclaimers, ejemplos y plantillas por módulo.
*Acciones:* listar los prompts aprobados, probar un prompt contra un fixture, ver la versión, ver qué
módulo lo consume, solicitar un cambio.
*Estados:* `prompt.disabled`, `prompt-draft`, `prompt-retired`, `prompt-with-risk`.
*Permisos:* `mt01_ia.prompt.read`, `mt01_ia.prompt.manage`.

**5. `AssistantEvaluationPage`**, en `/assistant/evaluations`. Panel de evaluación, feedback,
calidad, alucinación reportada, bloqueos, escalaciones y mejora continua.
*Acciones:* analizar feedback, ver tendencias de bloqueo, ver incidentes, clasificar errores,
preparar el backlog de mejora.

**6. `AssistantAdminDiagnosticsPage`**, en `/assistant/diagnostics`. Diagnóstico técnico autorizado.
*Consultas:* salud del proveedor, latencia, flags, depuración de política.
*Mutaciones:* `sendMessage`, `recordFeedback`, `createHandoff`, `revealSource`, `cancelStream`,
`clearConversation`.
*Permisos:* `mt01_ia.admin.diagnostics.read`.
*Estados vacíos propios:* sin conversación, sin prompts autorizados, sin fuentes, sin historial, sin
permiso, política no configurada.

**7. `AssistantDrawer`**, embebido en el AppShell. Cajón transversal disponible desde cualquier
módulo y desde los portales.

**8. `AssistantPanel`**, embebido en el detalle de una entidad: persona, curso, documento, workflow,
reporte o conector.

**Telemetría común a las seis pantallas:** `page_view`, `assistant_opened`, `prompt_submitted`,
`response_rendered`, `policy_blocked`, `feedback_sent`, `handoff_created`.

**Los 25 componentes contratados**, cada uno con props mínimas, dependencias permitidas, eventos,
pruebas, restricción y criterio de aceptación: `AssistantDrawer`, `AssistantPanel`,
`AssistantComposer`, `AssistantSafeRenderer`, `AssistantSourceChips`, `AssistantActionCard`,
`AssistantPolicyNotice`, `AssistantFeedbackBar`, `AssistantContextBar`, `AssistantQuickPrompts`,
`AssistantHandoffPanel`, `AssistantStreamController`, `AssistantErrorRecovery`,
`AssistantPolicyDebugCard`, `AssistantEvaluationTable`, `AssistantPromptPreview`,
`AssistantCapabilityBadge`, `AssistantRetentionNotice`, `AssistantTenantGuard`,
`AssistantTelemetryBridge`, `AssistantSourcePreview`, `AssistantMobileSheet`, `AssistantEmptyState`,
`AssistantBlockedResponse`, `AssistantDraftCard`.

Ejemplo del nivel de contrato, `AssistantSafeRenderer`: renderiza markdown seguro, sanitiza, bloquea
HTML crudo y resuelve links internos. Dependencias permitidas solo el design system, hooks de IAM,
hooks de consulta del asistente, el puente de telemetría y el sanitizador. **No accede directamente a
módulos operativos.** No expone datos personales, HTML crudo, rutas sin resolver, fuentes no
autorizadas ni acciones generadas por texto libre.

**Las 38 recetas de integración** dicen, módulo por módulo, qué contexto se puede mandar, cuál está
prohibido, qué botones se permiten y cuáles no. Los prohibidos son iguales en todas y son los que
importan: aprobar, rechazar, matricular, enviar campaña, consolidar un duplicado, reintentar un
conector o modificar datos sin flujo formal.

**Casos de aceptación de usuario que trae el capítulo:** una familia abre el portal, pregunta por el
estado de una solicitud y recibe explicación con fuente y un botón autorizado, sin ver datos de otro
estudiante y con disclaimer. Un docente pregunta por los pendientes de su curso y recibe el resumen
acotado a su alcance.

### 1.3 MT02_IA Conocimiento Institucional, RAG y Fuentes Citadas

Once pantallas bajo `/ai/knowledge`. **Regla principal:** si una respuesta no tiene fuente
autorizada, la pantalla muestra "respuesta no verificable" y sugiere búsqueda documental o
escalamiento humano. Nunca inventa políticas institucionales.

**1. `KnowledgeWorkspacePage`**, en `/ai/knowledge`. Centro de consulta RAG: pregunta institucional
con respuesta citada.
*Perfiles:* familia, estudiante, docente, administrativo, soporte, dirección.
*Permiso:* `mt02ia.knowledge.ask`.
*Reglas de campo, que son lo más concreto del capítulo:*
- `question`: mínimo 8 caracteres, máximo según la política del colegio, sin datos sensibles
  innecesarios. **Si el usuario pega un expediente completo, la pantalla avisa y bloquea de forma
  preventiva.**
- `filters`: las facetas se ven solo si el usuario puede consultar esa colección. **Si llega un
  filtro no autorizado por la URL, se descarta y se audita.**
- `citations`: en modo estricto, cada respuesta exige al menos una cita visible o el estado
  `no_sources`. **Si la cita existe pero el usuario no puede verla, se muestra `partial` o
  `blocked`.**
- `actions`: las acciones sugeridas son representaciones, no ejecuciones. Si la acción requiere
  aprobación, el botón crea el workflow, no ejecuta.

**2. `SourceCatalogPage`**, en `/ai/knowledge/sources`. Inventario de las fuentes autorizadas para
responder.
*Perfiles:* admin de IA, curadores, gobierno de datos, soporte.
*Permisos:* `mt02ia.source.read`, y `mt02ia.source.sensitive.read` con step-up para los metadatos
sensibles.

**3. `CollectionDetailPage`**, en `/ai/knowledge/collections/[collectionId]`. Control de una
colección RAG: qué contiene, quién la mantiene, con qué alcance se consulta.
*Perfiles:* admin de IA, dirección, curadores.

**4. `IngestionMonitorPage`**, en `/ai/knowledge/ingestion`. Estado de ingesta, parseo, chunking,
embedding, indexación y errores recuperables.
*Perfiles:* admin de IA, soporte, calidad de datos.

**5. `RetrievalPlaygroundPage`**, en `/ai/knowledge/playground`. Ambiente restringido: consulta,
filtros, top K, reranking y comparación.
*Perfiles:* admin de IA, QA, arquitectura, soporte avanzado.
*Permiso:* `mt02ia.retrieval.playground`.

**6. `CitationInspectorPage`**, en `/ai/knowledge/citations/[answerId]`. Inspección de citas,
fragmentos recuperados, relevancia, permisos, score y trazabilidad.
*Permiso:* `mt02ia.citation.inspect`.

**7. `AnswerReviewQueuePage`**, en `/ai/knowledge/review`. Bandeja de respuestas reportadas, de baja
confianza, con cita insuficiente o riesgo de privacidad.
*Permisos:* `mt02ia.review.read` para ver, `mt02ia.review.decide` para aprobar, rechazar, escalar o
reindexar.

**8. `FeedbackTriagePage`**, en `/ai/knowledge/feedback`. Triaje del feedback de usuarios sobre
respuestas, fuentes faltantes, errores y mejoras.
*Permiso:* `mt02ia.feedback.create` para enviarlo.

**9. `KnowledgePolicyPage`**, en `/ai/knowledge/policies`. Políticas de uso, colecciones habilitadas,
niveles de grounding y reglas por módulo.
*Permiso:* `mt02ia.policy.manage`.

**10. `KnowledgeAuditPage`**, en `/ai/knowledge/audit`. Auditoría de consultas, fuentes, permisos,
bloqueos, redacciones y acciones sugeridas.

**11. `EvaluationDashboardPage`**, en `/ai/knowledge/evaluations`. Calidad del RAG: precisión,
cobertura, frescura, exactitud de citación y regresiones.
*Permiso:* `mt02ia.evaluation.read`.

**Los 10 estados de respuesta, con su microcopy exacto.** Esto separa un asistente confiable de uno
que miente con seguridad:

| Estado | Cuándo | Qué dice |
|---|---|---|
| `idle` | Todavía no se preguntó | "Pregunta sobre reglamentos, comunicados o procedimientos. Solo se usarán fuentes autorizadas." |
| `loading` | En proceso | "Buscando fuentes institucionales autorizadas y preparando respuesta citada..." |
| `answered` | Con citas | "Respuesta basada en fuentes institucionales. Revisá las citas antes de tomar decisiones." |
| `partial` | Fuentes insuficientes o en conflicto | "La respuesta es parcial porque las fuentes disponibles no cubren todo el caso." |
| `no_sources` | Sin fuentes | "No encontré fuentes autorizadas para responder. Podés buscar documentos o solicitar curación." |
| `blocked` | La política impide responder | "No puedo responder con el alcance actual por permisos, privacidad o sensibilidad." |
| `needs_step_up` | Requiere identidad reforzada | "Para ver esta respuesta o cita sensible necesitás confirmar tu identidad." |
| `error_422` | Pregunta inválida o muy amplia | "Reducí la pregunta, seleccioná una colección o agregá contexto institucional." |
| `error_429` | Límite temporal | "Se alcanzó el límite de consultas. Reintentá más tarde o contactá soporte." |
| `offline` | Sin conexión | "No hay conexión. Las respuestas de IA requieren conexión segura al servicio institucional." |

**Regla de alcance:** ninguna consulta mezcla conocimiento entre colegios, y las fuentes con alcance
por sede solo se recuperan si el usuario tiene acceso a esa sede. Un docente de una sede no recupera
los instructivos internos de otra.

### 1.4 MT03_IA Copilotos Contextuales

Doce pantallas de gobierno. La diferencia con el asistente: el copiloto aparece **dentro** de otra
pantalla y se configura sin tocar código.

**1. `CopilotRegistryPage`** inventaria las superficies por colegio, módulo, rol, estado y riesgo.

**2. `CopilotSurfaceDesignerPage`** configura una superficie contextual sin tocar código: módulo,
entidad, capacidades, microcopy, fallback y rollout. Es la pantalla que hace que agregar un copiloto
a una pantalla nueva no sea un release.

**3. `CopilotPolicyCenterPage`** administra las políticas visibles de IA contextual por colegio,
módulo, sensibilidad y capacidad. Acceso `restricted-admin`, con control por atributos de colegio,
alcance, relación, sensibilidad, flag y consentimiento.

**4. `CopilotActionSimulatorPage`** simula las acciones propuestas con distintos roles, alcances y
sensibilidades, antes de habilitarlas en producción.

**5. `CopilotRuntimeInspectorPage`** diagnostica contexto, decisión de política, latencia, fuentes y
errores **sin exponer prompts ni datos personales**.

**6. `CopilotSourceInspectorPage`** inspecciona las fuentes citadas, los fragmentos redactados, la
confianza y la fecha de actualización.

**7. `CopilotIncidentReviewPage`** analiza incidentes de IA: fuga de datos, respuesta peligrosa,
acción incorrecta, inyección de prompt.

**8. `CopilotHandoffCenterPage`** gestiona los casos derivados a una persona desde un copiloto.

**9. `CopilotEvaluationPage`** mide precisión, grounding, utilidad, latencia y feedback negativo por
superficie.

**10. `CopilotFeatureRolloutPage`** activa superficies por colegio, perfil, sede, módulo, cohorte
beta y porcentaje.

**11. `PromptSuggestionCatalogPage`** gestiona los prompts sugeridos por perfil, módulo y superficie.

**12. `ActionProposalQueuePage`** revisa las propuestas generadas por los copilotos.

**Composición base obligatoria en las doce:** `PageHeader` + `DataTable` + `DetailDrawer` +
`PolicyBadge` + `RiskBadge` + `EvidencePanel`.
**Eventos:** `page.viewed`, `filter.changed`, `detail.opened`, `action.requested`, `policy.blocked`,
`export.requested`.
**Los 8 estados:** carga con skeleton estable, vacío con explicación funcional, sin permiso
**indicando cuál falta**, bloqueado por política, degradado por el proveedor, dato viejo por falta de
sincronización, error recuperable con reintento, error no recuperable con ruta a soporte.
**Pruebas de Playwright obligatorias:** flujo feliz, bloqueo por permisos, feature flag apagado y
step-up.

### 1.5 MT04_IA Automatización Inteligente, Workflows y Agentes

Diez pantallas. Cada propuesta de IA se presenta como una **Action Proposal** con objetivo, impacto,
fuente, nivel de confianza, permisos requeridos, datos sensibles involucrados, precondiciones y botón
de revisión antes de cualquier ejecución.

**1. `AutomationWorkspacePage`** lista y opera las automatizaciones, con catálogo, estado,
responsable, permisos, módulo de origen y criticidad, más el panel de simulación de políticas.

**2. `AgentRegistryPage`** muestra los agentes disponibles, sus capacidades, alcances, permisos,
políticas y estado de rollout por colegio. Se implementa con matriz de capacidades y chips de
rollout.

**3. `AutomationBuilderPage`** es el constructor guiado. Se crean automatizaciones **desde plantillas
institucionales, no desde prompts libres**. Lleva selector de plantilla y panel de simulación.

**4. `HumanApprovalQueuePage`** centraliza las propuestas que necesitan aprobación por rol, suplencia
o autoridad institucional.

**5. `PlanReviewPage`** revisa el plan antes de ejecutarlo. Requiere step-up y compone visor de diff
de payload seguro, guard de permisos, panel de decisión de guardrails y banner de kill switch. El
usuario ve pasos, impactos, fuentes, riesgos y datos tocados.

**6. `ExecutionMonitorPage`** observa ejecuciones activas, reintentos, fallos, tiempos, colas y estado
de proveedores.

**7. `RunDetailPage`** explica cada paso ejecutado, entradas, **salidas redactadas**, bloqueos,
aprobaciones y evidencia resultante.

**8. `PolicyCenterPage`** revisa las políticas aplicables por módulo, rol, colegio, sensibilidad y
tipo de acción, con panel de simulación.

**9. `AgentEvaluationPage`** mide precisión, seguridad, rechazo por guardrails, tasa de aprobación,
satisfacción y errores por capacidad.

**10. `IncidentKillSwitchPage`** pausa agentes o capacidades ante riesgo operacional, de privacidad o
comportamiento anómalo, con pausa por alcance o global.

**Los 10 estados:** `loading`, `empty`, `forbidden`, `policy-blocked`, `simulation-failed`,
`partial-success`, `execution-running`, `execution-paused`, `error-retryable`, `error-final`.
**Microcopy:** explicar consecuencias sin lenguaje ambiguo; ninguna acción se presenta como certeza
absoluta.
**Accesibilidad:** teclado completo, foco visible, live regions para los cambios de estado y
descripciones de riesgo comprensibles para quien no es técnico.

### 1.6 MT05_IA Analítica Predictiva

Dieciséis pantallas bajo `/ia/predictive`. Cada una con su ruta, su query key, su permiso mínimo y su
evento de auditoría.

**1. `PredictiveOverviewPage`**, en `/ia/predictive/overview`. Panel ejecutivo de predicciones,
alertas activas, calidad de modelo, cobertura de datos y riesgos por contexto institucional.
*Permiso:* `mt05ia.dashboard.read`.

**2. `AlertIntelligenceCenterPage`**, en `/ia/predictive/alertintelligencecenter`. Bandeja central de
alertas inteligentes con prioridad, explicación, confianza, responsable, SLA y estado de atención.
*Usuarios:* bienestar y orientación, administración. *Permiso:* `mt05ia.alert.assign`.

**3. `PredictionDetailPage`**, en `/ia/predictive/predictiondetail`. Detalle de una predicción:
entidad, score, contribuciones, fuentes, vigencia, incertidumbre, decisiones sugeridas y
trazabilidad.

**4. `PredictionExplanationPage`**, en `/ia/predictive/predictionexplanation`. Explicabilidad:
drivers, contribuciones, evidencia, trazabilidad, advertencias y campos ocultos por permiso.

**5. `RecommendationQueuePage`**, en `/ia/predictive/recommendationqueue`. Cola de recomendaciones
accionables para coordinadores, docentes, bienestar, administración y dirección, **siempre con
confirmación humana**. Eventos `mt05ia.recommendation.accepted` y `.rejected`, con motivo.

**6. `StudentSupportSignalsPage`**, en `/ia/predictive/studentsupportsignals`. Vista sensible de
señales de apoyo al estudiante, **sin estigmatización**, con enfoque de intervención responsable y
privacidad reforzada. Revelar exige `mt05ia.prediction.sensitive.reveal` y step-up.

**7. `InterventionPlannerPage`**, en `/ia/predictive/interventionplanner`. Planificador de
intervenciones con evidencia, responsables, tareas, comunicaciones y seguimiento humano.

**8. `ThresholdPolicyPage`**, en `/ia/predictive/thresholdpolicy`. Centro de umbrales y políticas de
activación de alertas por colegio, sede, nivel, módulo y perfil. *Permisos:* `mt05ia.threshold.read`
para ver, `mt05ia.threshold.manage` para cambiar, con evento `mt05ia.threshold.simulated`.

**9. `ModelRegistryPage`**, en `/ia/predictive/modelregistry`. Registro de modelos: versión,
propósito, responsable, datos permitidos, métricas, aprobación, vigencia, rollout y controles.

**10. `ModelCardDetailPage`**, en `/ia/predictive/modelcarddetail`. Ficha del modelo con alcance,
limitaciones, fairness, privacidad, datos, métricas, evaluaciones y decisiones de release.

**11. `FairnessRiskPage`**, en `/ia/predictive/fairnessrisk`. Panel de riesgo de equidad y sesgos:
diferencias por contexto académico, **no por atributos sensibles sin base legal o ética**.

**12. `DriftMonitorPage`**, en `/ia/predictive/driftmonitor`. Monitor de deriva, degradación,
cobertura de datos, frescura y **bloqueo automático ante calidad insuficiente**. *Permiso:*
`mt05ia.threshold.manage`.

**13. `SimulationSandboxPage`**, en `/ia/predictive/simulationsandbox`. Simulador **no productivo**
para probar umbrales y escenarios. *Permiso:* `mt05ia.simulation.run`.

**14. `OperationalForecastsPage`**, en `/ia/predictive/operationalforecasts`. Pronósticos operativos.
**Si la predicción está expirada, muestra el resumen seguro y oculta el detalle con un mensaje
claro.**

**15. `AlertAuditPage`**, en `/ia/predictive/alertaudit`. Auditoría de predicciones,
recomendaciones, vistas, revelaciones, overrides, exportaciones y decisiones humanas. *Permiso:*
`mt05ia.audit.read`.

**16. `FeedbackTriagePage`**, en `/ia/predictive/feedbacktriage`. Triaje del feedback humano sobre
las predicciones.

**Las cuatro entidades de dominio:** `Prediction` (una predicción emitida por un modelo para una
entidad institucional, con score, confianza, drivers y frescura), `IntelligentAlert`,
`Recommendation` y `ModelCard`.

**Criterio de aceptación transversal de las 16:** renderiza autorizado, enmascara lo sensible,
bloquea la acción no autorizada.

### 1.7 MT06_IA Monitoring y ModelOps

Quince superficies bajo `/ia/modelops`, con permisos propios por pantalla.

**1. `AIOperationsDashboard`**, en `/ia/modelops`. Tablero de operación de la IA. *Permiso:*
`MT06_IA_MODEL_OPS_READ`. *Estado vacío:* "No hay datos para el alcance seleccionado", con próximo
paso y filtros.

**2. `ModelRegistry`**, en `/ia/modelops/models`. Inventario de modelos, versiones, proveedores,
capacidades y estados.

**3. `ModelVersionDetail`**. Detalle de una versión. Su DTO exige schema Zod, mapper de
infraestructura a dominio, fixture de MSW y prueba de contrato. **Prohibido usar `any` o acceder a
atributos fuera del mapper.**

**4. `EvaluationSuites`**, en `/ia/modelops/evaluations`. Suites de evaluación funcional, seguridad,
grounding, privacidad y experiencia de usuario.

**5. `EvaluationRunDetail`**. Metadatos de la corrida, métricas, casos, fallos y paquete de
evidencia.

**6. `PromptAndPolicyTestbench`**. Probar prompts, guardrails y políticas de forma controlada.
**Separado de producción**, con datos sintéticos o redactados, registrando el id del evento de
auditoría y advirtiendo al usuario.

**7. `RedTeamConsole`**, en `/ia/modelops/red-team`. Casos adversariales, jailbreak, inyección de
prompt e intentos de exfiltración. Catálogo de casos, severidad, historial de corridas, estado de
mitigación y regresión.

**8. `AIIncidentInbox`**. Consola de soporte especializado. Cada incidente lleva severidad,
categoría, capacidad, modelo, colegio, alcance, responsable, SLA, estado de mitigación y enlaces a
auditoría.

**9. `SafetySignalsExplorer`**, en `/ia/modelops/safety`. Señales de riesgo, severidad, bloqueo,
mitigación y tendencias, con revisión de falsos positivos.

**10. `TelemetryExplorer`**, en `/ia/modelops/telemetry`. Eventos, filtros, requestId, latencia y
resultado, **sin datos personales**. *Permiso:* `MT06_IA_TELEMETRY_READ`.

**11. `CostAndLatencyDashboard`**. Presupuesto, tokens, alias del proveedor, tendencia de costo, p95
y p99.

**12. `DriftAndDataHealth`**. Frescura, cobertura, cambio de distribución y enlaces a calidad de
datos y gobierno.

**13. `RolloutControlCenter`**, en `/ia/modelops/rollout`. Feature flags, canary, piloto, kill switch
y aprobaciones de release. Evento `mt06ia.rollout.pause.requested`.

**14. `GuardrailPolicyCenter`**, en `/ia/modelops/guardrails`. Políticas de bloqueo, redacción,
fallback, confianza y escalamiento, con versiones, comparación, simulación y solicitud de cambio.

**15. `EvidencePackCenter`**, en `/ia/modelops/evidence`. Lista de evidencia, aprobaciones,
resultados de corrida, capturas y referencias de auditoría. *Permiso:* `MT06_IA_EVALUATION_READ`.

**Estados obligatorios en las quince:** skeleton de carga, estado vacío, estado sin permiso, banner
de dato viejo, modo degradado, modo enmascarado y error boundary propio del feature.

### 1.8 MT07_IA Generación de Contenido

Quince pantallas bajo `/ia/content`, todas detrás del permiso `MT07_IA_CONTENT_READ`.

**Los cinco principios, que son criterios de aceptación:** todo contenido generado tiene estado
(`draft`, `needs_review`, `approved`, `rejected`, `published`, `archived`); toda generación exige
propósito, audiencia, tono, fuente y sensibilidad, y el composer no deja generar si falta el contexto
mínimo; la IA no inventa datos y si falta la fuente lo declara; nadie publica contenido sensible sin
aprobación y step-up; y cada versión es reproducible en términos de plantilla de prompt, fuentes,
modelo, política y actor.

**1. `ContentStudioPage`**, en `/ia/content`. Workspace central para crear, revisar y gestionar
contenido.

**2. `AssistedWritingComposerPage`**, en `/ia/content/compose`. Redacción guiada con propósito,
audiencia, tono, fuentes y sensibilidad.

**3. `DocumentDraftDetailPage`**, en `/ia/content/drafts/[draftId]`. Detalle del borrador: versiones,
fuentes, diffs, comentarios y riesgos.

**4. `TemplateLibraryPage`**, en `/ia/content/templates`. Catálogo de plantillas gobernadas por
colegio, módulo, audiencia y permiso.

**5. `TemplateDetailandVersioningPage`**, en `/ia/content/templates/[templateId]`. Variables, alias
de prompt, vista previa, restricciones, responsable y cambios.

**6. `SourceAttachmentPanelPage`**, en `/ia/content/sources`. Selección y validación de fuentes desde
gestión documental, conocimiento y entidades permitidas.

**7. `ReviewQueuePage`**, en `/ia/content/review`. Cola de revisión humana, riesgos, aprobadores y
SLA.

**8. `ContentPolicyCenterPage`**, en `/ia/content/policies`. Políticas de tono, sensibilidad,
disclaimers, prohibiciones y ruteo de aprobación.

**9. `ToneandAudienceLabPage`**, en `/ia/content/tone-lab`. Prueba de variantes de tono **sin
publicar ni guardar datos sensibles**.

**10. `BulkDraftWorkbenchPage`**, en `/ia/content/bulk`. Generación controlada de borradores por
lote, con vista previa y workflow.

**11. `ChannelPreviewPage`**, en `/ia/content/channel-preview`. Vista previa para correo, WhatsApp,
push, in-app, PDF y portal, antes de que salga por comunicaciones.

**12. `CitationandEvidenceInspectorPage`**. Inspección de citas y evidencia del borrador.

**13. `PublicationHandoffCenterPage`**. Entrega al módulo que publica de verdad.

**14. `ContentAuditTimelinePage`**. Quién generó, quién editó y quién aprobó cada texto.

**15. `EvaluationDashboardPage`**. Calidad de lo generado.

**A quién le resuelve qué, según el propio capítulo:**

| Perfil | Su dolor | Qué le da la pantalla |
|---|---|---|
| Dirección | Necesita comunicaciones claras, oportunas y aprobables | Composer gobernado, plantillas, versionado, aprobación, evidencia y tono institucional |
| Secretaría académica | Redacta constancias, respuestas, circulares y avisos | Borradores a partir de datos permitidos, con fuentes, validaciones y plantillas |
| Docente | Necesita ayuda redactando observaciones o mensajes pedagógicos | Asistencia de tono, claridad, cuidado emocional y privacidad |
| Administrativo | Prepara cartas, solicitudes, informes y respuestas | Borradores estructurados con checklist, referencias y workflow |
| Comunicaciones | Gestiona campañas, avisos y contenido para familias | Contenido segmentado, vista previa por canal y entrega al módulo de envío |
| QA y gobierno de IA | Necesita auditar calidad, sesgo, fuentes y fallos | Pantalla de evaluación, cola de revisión y contenido marcado |
| Soporte | Responde tickets sin revelar datos | Asistente de respuesta con enmascarado, bloqueos de política y plantillas seguras |

Toda pantalla del capítulo muestra siempre alcance, fuentes, sensibilidad, actor, estado, fecha,
versión y próximas acciones autorizadas.

### 1.9 MT08_IA Feedback Humano y Mejora Continua

Doce superficies. Convierten el "esta respuesta estuvo mal" de un docente en un caso de regresión y
en un cambio de política.

**1. `FeedbackCaptureWidget`**. El widget embebido en cualquier respuesta de IA, con historia de
Storybook en modo restringido para validar estados visuales, accesibilidad, permisos y comportamiento
responsive.

**2. `FeedbackInboxScreen`**. Bandeja operativa para revisores, con filtros por módulo de origen,
severidad, perfil, sede, colegio, estado, riesgo, categoría, fecha, modelo, prompt, política y SLA.

**3. `FeedbackCaseDetailScreen`**. Vista del caso con contexto redactado, respuesta de la IA, fuentes
citadas, etiquetas, línea de tiempo, auditoría, evidencia, comentarios internos y acciones
permitidas.

**4. `HumanReviewWorkbenchScreen`**. Mesa de revisión para comparar la respuesta original, las
fuentes, las decisiones de política, el contexto permitido, las etiquetas sugeridas, el riesgo y la
resolución humana.

**5. `QualityLabelStudioScreen`**. Studio de taxonomías: exactitud, groundedness, utilidad, tono,
seguridad, privacidad, sesgo, completitud, claridad, accionabilidad y cumplimiento. Es el diccionario
que hace que "estuvo mal" se clasifique siempre igual y se pueda medir.

**6. `EvaluationDatasetScreen`**. Curación de muestras de evaluación derivadas del feedback, con
anonimizado, consentimiento operativo, versionado, cobertura y estado de aprobación.

**7. `RegressionCandidateScreen`**. Lista de casos que deben convertirse en pruebas de regresión para
prompts, RAG, copilotos, automatizaciones o generación documental.

**8. `PolicyImprovementQueueScreen`**. Cola de propuestas para modificar el catálogo de prompts, el
centro de políticas, los guardrails, las fuentes, los umbrales, las plantillas o los mensajes de
fallback.

**9. `ReviewerPerformanceScreen`**. Calidad operativa del equipo revisor: SLA, consistencia de
etiquetas, backlog, casos reabiertos, discrepancias y carga por revisor.

**10. `FeedbackAnalyticsScreen`**. Tendencias: módulos con mayor tasa de feedback, severidad,
categorías, tiempo de resolución, deriva percibida y acción correctiva.

**11. `FeedbackPrivacyConsoleScreen`**. Consola de redacción, minimización, retención, anonimato
operativo, solicitudes de supresión y evidencia sensible.

**12. `UATFeedbackLabScreen`**. Laboratorio para ejecutar recorridos de aceptación, revisar casos
sintéticos, validar estados vacíos y de error, y capturar evidencia de release.

**Las seis reglas de trazabilidad:** cada feedback conserva actor, alcance, módulo de origen,
contexto permitido, versión de prompt, modelo y política, y la resolución humana. El frontend no
muestra payloads completos si llevan datos personales, información académica sensible, datos
familiares o evidencias restringidas. Las suites, criterios, datasets anonimizados y resultados
quedan versionados. Toda acción correctiva pasa por permisos y step-up, y si modifica políticas o
prompts se integra con workflows. Y el módulo distingue siete cosas que no son lo mismo: feedback
individual, incidente, muestra de evaluación, caso de regresión, issue de producto, ajuste de
interfaz y solicitud de gobierno.

### 1.10 Lo que los ocho documentos traen además, y conviene no reinventar

No hace falta diseñar esto desde cero: las specs ya lo dejaron escrito y sirve como material de
trabajo directo.

- **Escenarios Given/When/Then** obligatorios por pantalla, listos para pasar a Playwright.
- **Fixtures de MSW por escenario**, nombrados por estado: `answered`, `partial`, `blocked`,
  `no_sources`, `step_up`. Un fixture por estado, no uno genérico.
- **Payloads de referencia con validación Zod**, para no inventar los DTO en cada módulo.
- **Matriz granular de rol contra capacidad**, con el resultado esperado y la prueba de fixture
  obligatoria. Por ejemplo: la familia tiene `DRAFT_COMMUNICATION` limitado a borradores personales,
  nunca campañas, y tiene `CONNECTOR_DIAGNOSTICS` y `PRIVACY_REQUEST_HELP` bloqueados o derivados.
- **Runbooks de producción por severidad** y matriz de incidentes de IA con su respuesta de interfaz.
- **ADRs recomendados**, glosario operativo para frontend, QA y soporte, y plan de sprint.
- **Recetas de integración para OP01 a OP38**, una por módulo, con contexto permitido, contexto
  prohibido, CTA permitidos y CTA prohibidos.

## 2. Portal web de familia y estudiante (MT18, 8 pantallas)

**No hay ninguna persona de familia ni de estudiante en el menú web.** `NAV_BY_ROLE` en
`components/layout/sidebar/nav-main.tsx` tiene 15 roles y todos son de personal: docente, orientador,
admisiones, dirección académica, enfermería, psicología, psicopedagogía, biblioteca, tienda, compras,
jefe de área, patrimonio, transporte y conductor. Las rutas públicas son tres: la landing, `postular`
y `seguimiento`.

Hoy la familia solo tiene la app Flutter. Las specs piden además el portal web:

| Pantalla | Qué tiene que hacer |
|---|---|
| `PortalHomePage` | Portada con widgets principales, distinta para familia, estudiante, docente, staff y dirección. |
| `SelfServiceCenterPage` | Centro de autoservicio: trámites que la familia inicia sola, con envío a workflow, evidencia documental y notificación. |
| `DigitalJourneyPage` | Recorrido paso a paso de un trámite en curso (stepper). |
| `PortalNotificationsPage` | Avisos del portal. |
| `PortalPreferencesPage` | Preferencias de contacto y de notificación de la familia. |
| `SupportAndHelpPage` | Mesa de ayuda y soporte. |
| `PortalComposerAdminPage` | Armar el portal por perfil sin tocar código, permiso `mt18.portal_composer.manage`. |
| `ExperienceHealthPage` | Salud de la experiencia del portal, permiso `mt18.experience_health.view`. |

A esto se suman las vistas de familia que piden los módulos operativos y que tampoco existen en web:

- `FamilyReportCardPortalPage` (OP09): boletines publicados, histórico y descarga de documentos autorizados.
- `FamilyAttendancePortalPage` (OP07): asistencia del hijo.
- `CurriculumFamilyViewPage` (OP05): materias y carga académica cuando el colegio decide publicarla.
- `CurriculumTeacherViewPage` (OP05): la misma vista para el docente, sobre su asignación potencial.
- `FamilyConductPortalPage` (OP12): convivencia.

---

## 3. Búsqueda institucional (MT08)

No existe. La única mención de búsqueda global en todo el repositorio está en un README de
`components/mt/`.

Lo que se pide es una `SearchPage` completa más una superficie transversal en el AppShell, con:

- Campo de búsqueda con resultados por tipo de entidad (persona, curso, documento, workflow, reporte).
- Panel de facetas para filtrar.
- Ordenamiento y paginación.
- **Búsquedas guardadas** (`mt08.search.saved`, `mt08.search.saved.manage`).
- Vista previa del resultado sin salir de la búsqueda (`mt08.search.preview`), y vista previa de campos
  sensibles bajo permiso aparte (`mt08.search.sensitive.preview`).
- Exportación del resultado (`mt08.search.export`).
- Búsqueda contextual dentro de un módulo (`mt08.search.contextual`).

La regla que importa: la búsqueda nunca puede devolver una fila de otra sede, gestión, paralelo o
estudiante representado que el usuario no tenga permitido ver.

---

## 4. Integraciones, conectores y sincronización (MT17, 13 pantallas)

Nada construido.

| Pantalla | Caso operativo |
|---|---|
| `IntegrationCatalogPage` | Catalogar los conectores disponibles y activos. |
| `ConnectorDetailPage` | Ver una instancia de conector y su configuración segura, sin secretos. |
| `ContractRegistryPage` | Versiones de los contratos de API. |
| `MappingWorkbenchPage` | Administrar los mapeos de campos, versionados. |
| `SyncMonitorPage` | Monitoreo transversal de corridas y colas. |
| `RunTimelinePage` | Línea de tiempo detallada de una ejecución. |
| `WebhookInboxPage` | Observar los webhooks que recibió el backend. |
| `OutboxEventsPage` | Ver los eventos pendientes de salida. |
| `ProviderHealthPage` | Disponibilidad y degradación de cada proveedor. |
| `ReconciliationPage` | Resolver divergencias entre el sistema y el externo. |
| `IntegrationAuditPage` | Evidencia auditada de las integraciones. |
| `IntegrationRunbookPage` | Runbook por incidente. |
| `IntegrationSettingsPage` | Preferencias operativas no secretas. |

Todas con filtros persistentes en query params seguros (estado, criticidad, módulo consumidor, tipo
de conector, fecha, responsable y alcance) y sin valores sensibles en la URL.

Esto importa para SEDUCA: hoy no hay forma de ver desde una pantalla si un envío al ministerio salió,
falló o quedó en cola.

---

## 5. Calidad de datos, normalización y deduplicación (MT14, 12 pantallas)

Nada construido. Lo que hoy matchea "calidad de datos" en el repositorio es calidad de asistencia,
que es otra cosa.

| Pantalla | Contenido |
|---|---|
| `DataQualityDashboardPage` | Calidad global, backlog de remediación, riesgos por dominio y tendencia semanal. |
| `DataIssueInboxPage` | Colas de errores, reglas fallidas, responsables, SLA y severidad. |
| `DuplicateResolutionWorkbenchPage` | Comparación lado a lado, puntaje de similitud, evidencia, vista previa de la fusión y decisión segura. |
| `EntityQualityProfilePage` | Expediente de calidad de una persona, estudiante, familia, curso, documento o solicitud. |
| `NormalizationRulesPage` | Catálogo de reglas, parámetros, simulación, versiones y aprobaciones. |
| `QualityRuleSimulatorPage` | Dataset de prueba, vista antes y después, falsos positivos y trazabilidad. |
| `ImportQualityReviewPage` | Preflight de una importación: columnas, errores, advertencias, normalizaciones y aprobación. |
| `MasterDataCorrectionPage` | Formularios de corrección con validación, workflow, evidencia y auditoría. |
| `DataStewardshipBoardPage` | Responsables por dominio, carga operativa, antigüedad y cumplimiento. |
| `DataLineageImpactPage` | Módulos afectados, pantallas consumidoras, reportes, documentos y workflows. |
| `QualityEvidencePackPage` | Paquete de evidencia para auditoría con decisiones, logs, responsables y exportación segura. |
| `AIQualityAssistPage` | Sugerencias controladas con explicación, fuentes, riesgo y revisión humana. |

---

## 6. Gobierno de datos, linaje y privacidad (MT20, 14 pantallas)

Lo único que existe es `components/mt/mt20-reglas`: `ExportGuard`, enmascarado de campos y
`validateQuality`. Son piezas de apoyo, no el módulo.

| Pantalla | Qué tiene que hacer |
|---|---|
| `DataGovernanceHomePage` | Portada del gobierno de datos. |
| `DataCatalogPage` | Catálogo de activos de datos con filtros y estado en la URL. |
| `DataAssetDetailPage` | Ficha del activo con pestañas y vista previa segura. |
| `LineageExplorerPage` | De dónde viene cada dato y a dónde va, con redacción de lo sensible. |
| `ImpactAnalysisPage` | Qué se rompe si se cambia o se borra un activo. |
| `PrivacyPolicyCenterPage` | Políticas de privacidad vigentes. |
| `DataSubjectRequestInboxPage` | Bandeja de solicitudes de la persona titular sobre sus datos. |
| `PrivacyRequestDetailPage` | Detalle y resolución de esa solicitud. |
| `ConsentCoveragePage` | Cobertura de consentimientos. |
| `DataRetentionBoardPage` | Qué se retiene, cuánto tiempo y qué se purga. |
| `DataAccessReviewPage` | Revisión periódica de quién accede a qué. |
| `DataRiskRegisterPage` | Registro de riesgos de datos. |
| `AIGovernanceSourcesPage` | Qué fuentes puede usar la IA, permiso `mt20.ai.sources.manage`. |
| `GovernanceEvidencePackPage` | Paquete de evidencia de gobierno. |

Regla transversal: ninguna de estas pantallas renderiza datos ni acciones fuera del manifiesto de
permisos y del control por atributos contextual.

---

## 7. Administración de plataforma, tenants y configuración (MT21, 19 pantallas)

Existen dos: `sistema/roles` y `sistema/usuarios`. Faltan las otras 17.

| Pantalla | Ruta pedida | Qué tiene que hacer |
|---|---|---|
| `PlatformTenantsPage` | `/platform/tenants` | Listado de colegios de la instalación. |
| `TenantOverviewPage` | `/platform/tenants/[id]` | Ficha del colegio. |
| `TenantProvisioningWizardPage` | | Alta guiada de un colegio nuevo. |
| `TenantModulesPage` | `/platform/tenants/[id]/modules` | Qué módulos tiene habilitados, permiso `mt21.modules.manage`. |
| `TenantFeatureFlagsPage` | `/platform/tenants/[id]/flags` | Flags por colegio, permiso `mt21.flags.manage`. |
| `TenantRiskDashboardPage` | | Riesgo operativo por colegio. |
| `InstitutionConfigPage` / `InstitutionConfigEditPage` | `/admin/config` | Configuración institucional, con propuesta y aprobación (`mt21.config.propose`, `mt21.config.approve`, `mt21.config.activate`, `mt21.config.rollback`). |
| `ConfigImportExportPage` | `/admin/config/import-export` | Exportar e importar configuración con **dry run, diff y validaciones** antes de aplicar. |
| `ConfigAuditPage` | | Historial de cambios de configuración. |
| `ModuleEnablementPage` | | Encender y apagar módulos. |
| `FeatureFlagConsolePage` / `FeatureFlagEditPage` | | Consola de flags con simulación de rollout (`mt21.flag.rollout_simulated`). |
| `EnvironmentConfigPage` | `/platform/environments` | Ambientes y configuración visible sin secretos. |
| `BrandingAndThemePage` | | Marca y tema por colegio. |
| `MaintenanceWindowsPage` | | Ventanas de mantenimiento. |
| `PolicyCenterPage` | | Políticas de plataforma. |
| `IntegrationSettingsPage` | | Ajustes de integración por colegio. |
| `SupportOperationsPage` | | Operaciones de soporte. |

Nota para el negocio: sin esto no se puede vender el sistema a un segundo colegio sin tocar código.

---

# Parte 2. Lo que está a medias

## 8. Auditoría y trazabilidad (MT05): 1 de 12

Existe `/trazabilidad` y el componente `mt05-auditoria` (`audit-timeline`, `audit-events-feed`,
`audit-module-explorer`, exportación a CSV). Faltan como pantalla propia:

| Pantalla | Qué tiene que hacer |
|---|---|
| `AuditDashboardPage` | Tablero de auditoría. |
| `AuditExplorerPage` | Explorador con filtros por actor, recurso, acción, fecha y alcance. |
| `AuditEventDetailPage` | Detalle de un evento. |
| `ResourceTimelinePage` | Todo lo que le pasó a un recurso, en orden. |
| `ActorInvestigationPage` | Todo lo que hizo una persona, para investigar un caso. |
| `PermissionAuditPage` | Auditoría de permisos: quién tenía qué y desde cuándo. |
| `AuditDiffPage` | El antes y el después de un cambio. |
| `AuditAnomaliesPage` | Anomalías detectadas. |
| `AuditExportsPage` | Exportaciones de auditoría, con pedido y descarga separados (`mt05.audit.export.request`, `mt05.audit.export.download`). |
| `EvidencePackPage` | Paquete de evidencia armado. |
| `AuditRetentionPrivacyPage` | Retención y privacidad de la propia auditoría. |
| `AiAuditPage` | Auditoría específica de la IA. |

## 9. Workflows, aprobaciones y reglas (MT12): componente suelto

Existe `components/mt/mt08-workflows` con `approval-inbox`, `decision-dialog`, `request-detail` y
`status-badge`. Faltan:

| Pantalla | Qué tiene que hacer |
|---|---|
| `WorkflowInboxPage` | Bandeja general de workflows. |
| `MyWorkflowTasksPage` | Mis tareas pendientes (`mt12.workflow.task.read.mine`, `mt12.workflow.task.claim`). |
| `WorkflowCaseDetailPage` | Detalle del caso con panel de acciones que oculta las transiciones no autorizadas y muestra el motivo cuando corresponde, con step-up y motivo obligatorio según la transición. |
| `WorkflowDefinitionsPage` / `WorkflowDefinitionDetailPage` | Definiciones de workflow y su publicación (`mt12.workflow.definition.publish`). |
| `RuleSimulatorPage` | Simulador de reglas antes de publicarlas. |
| `WorkflowSLADashboardPage` | SLA y cuellos de botella. |
| `WorkflowBulkActionPage` | Acción masiva sobre varios casos. |
| `DelegationCenterPage` | Delegación y suplencia (`mt12.workflow.delegation.manage`), para cuando el aprobador está de licencia. |
| `WorkflowEvidencePackPage` | Paquete de evidencia del workflow. |

## 10. Gestión documental (MT10): componentes sueltos

Existe `components/mt/mt04-documentos` con `document-uploader`, `document-viewer`, `attachment-list`
y `review-document-dialog`. Faltan:

| Pantalla | Qué tiene que hacer |
|---|---|
| `DocumentCenterPage` | Centro documental. |
| `DocumentRepositoryPage` | Repositorio navegable con filtros. |
| `DocumentDetailPage` | Detalle con panel de vista previa, metadatos, línea de versiones y guard de acceso, con step-up para lo sensible. |
| `DocumentRequestInboxPage` | Bandeja de solicitudes de documento. |
| `DocumentTemplateLibraryPage` | Biblioteca de plantillas. |
| `DocumentUploadBatchPage` | Seguimiento de cargas masivas y procesamiento asíncrono (`mt10.batches.view`). |
| `EntityDocumentTab` | Pestaña embebida `/entity/:tipo/:id/documents` para ver los documentos de cualquier entidad. |

## 11. Comunicaciones y notificaciones (MT16): falta la mitad de arriba

Existe `components/mt/mt06-notificaciones`: bandeja, historial, plantillas con alta y decisión,
badges de estado y el `notify-provider`. Falta la capa de campaña:

- Crear campaña (`mt16.campaigns.create`) y listarlas (`mt16.campaigns.list`).
- Biblioteca de plantillas como pantalla propia (`mt16.templates.library`).
- Segmentación de destinatarios por sede, nivel, curso, paralelo y rol.
- Preferencias de notificación por persona. Lo que hoy matchea es la pantalla del template comprado,
  no del producto.

## 12. Reportes, tableros y KPIs (MT19): 3 de 13

Existen los 13 reportes fijos de `direccion-academica/reportes` y `mt12-reportes` con tarjetas de
indicador y exportación. Eso cubre `AcademicCockpitPage` y parte de `ExportCenterPage`. Faltan:

| Pantalla | Qué tiene que hacer |
|---|---|
| `ReportingHomePage` | Portada de reportería. |
| `DashboardCatalogPage` | Catálogo de tableros disponibles. |
| `DashboardDetailPage` | Tablero con filtros y drilldown. |
| `ReportBuilderPage` | Constructor de reportes, para que dirección arme uno sin pedirlo a desarrollo. |
| `ScheduledReportsPage` | Reportes programados (`mt19.report.schedule`). |
| `DatasetExplorerPage` | Explorador de datasets. |
| `ExecutiveCockpitPage` | Cabina ejecutiva. |
| `FinancialOperationalCockpitPage` | Cabina financiera y operativa. |
| `StudentRiskDashboardPage` | Tablero de riesgo del estudiante. |
| `ReportAlertCenterPage` | Alertas sobre los propios reportes. |
| `SnapshotEvidencePage` | Fotografía del reporte como evidencia (`mt19.snapshot.create`). |

Regla que hoy no se cumple en ningún lado: los datos ocultos por permisos no deben aparecer en el
drilldown, y cuando el dato está viejo la pantalla lo tiene que decir (`mt19.stale_data.visible`).

## 13. Personas y relaciones (MT01): 2 de 8

Existen `/personas` y `/personas/[personId]`, más el wizard de alta de cinco pasos. Faltan:

| Pantalla | Qué tiene que hacer |
|---|---|
| `DuplicateMergeReviewPage` | Revisión y fusión de personas duplicadas, con vista previa de la fusión antes de ejecutarla (`mt01.duplicate_merge.previewed`, `mt01.duplicate_merge.executed`). |
| `DataQualityInboxPage` | Bandeja de problemas de calidad sobre personas (`mt01.data_quality.issue_resolved`). |
| `ContactPointsPage` | Puntos de contacto por persona: canales, cuál es el preferido, cuál está verificado, con permiso aparte para los sensibles (`mt01.contact.sensitive.read`). |
| `PersonAuditTimelinePage` | Línea de tiempo de auditoría de una persona (`mt01.person.audit.read`). |
| `InstitutionalRolesPage` | Roles institucionales de la persona. |
| `FamilyLinksPage` | Vínculos de familia como pantalla propia. |

## 14. Estructura institucional (MT03): 4 de 12

Existen `/estructura`, `/estructura/cursos-paralelos`, su tablero, `/estructura/cursos/[courseId]` y
el componente `structure-tree`. Faltan:

| Pantalla | Qué tiene que hacer |
|---|---|
| `StructureBulkImportPage` | Carga masiva de estructura con validación previa. |
| `StructureImpactReviewPage` | Revisión del impacto de un cambio estructural antes de aplicarlo. |
| `ScopeDiagnosticsPage` | Diagnóstico técnico del alcance institucional resuelto, para entender por qué una pantalla aparece vacía. |
| `StructureAuditPage` | Historial y auditoría de la estructura. |
| `MT03StructureOverviewPage` | Resumen ejecutivo. |
| `SchoolYearStructurePage` | Estructura por gestión escolar. |
| `LevelManagementPage`, `ParallelManagementPage`, `GroupSubgroupManagementPage` | Gestión de niveles, paralelos y grupos como pantallas propias. |

`ScopeDiagnosticsPage` merece atención: es exactamente la pantalla que habría evitado el incidente
del colegio vacío, cuando la app apuntaba a un `schoolId` inexistente y cada pantalla se veía vacía
sin decir por qué.

## 15. Calendarios y periodos (OP04): 3 de 13

Existen `/calendarios`, `/calendarios/[calendarId]` y `/calendarios/turnos`. Faltan:

| Pantalla | Qué tiene que hacer |
|---|---|
| `CalendarDashboardPage` | Tablero de calendarios. |
| `PeriodPlannerPage` | Planificador de periodos. |
| `CalendarExceptionPage` | Excepciones de calendario: feriado local, suspensión, jornada especial, con solicitud y aprobación (`op04.exception.request`, `op04.exception.approve`). |
| `CalendarImpactPage` | Impacto de mover una fecha sobre horarios, asistencia, evaluaciones y comunicaciones (`op04.impact.read`). |
| `CalendarTemplatePage` | Plantillas de calendario para no armar cada gestión desde cero. |
| `MilestoneBoardPage` | Tablero de hitos académicos. |
| `ClosureControlPage` | Control de cierre. |
| `OperationalOfferPage` y `OfferPublicationCenterPage` | Oferta operativa y su publicación (`op04.offer.publish`). |
| `CalendarAuditPage` | Auditoría de calendario. |
| `AcademicCalendarListPage` | Listado con filtros. |

## 16. Huecos puntuales en los módulos académicos

Los módulos OP están bien cubiertos. Estos son los puntos concretos que faltan:

**OP07 Asistencia**
- `AttendanceRiskSignalsPage`: señales de riesgo por inasistencia acumulada, antes de que se vuelva
  deserción.
- `AttendanceNotificationsPreviewPage`: previsualizar el aviso a la familia antes de mandarlo.

**OP09 Boletines**
- `TeacherClosureInboxPage`: bandeja del docente con sus pendientes de confirmación, observaciones y
  bloqueos por periodo. Hoy el docente no tiene una sola pantalla que le diga qué le falta cerrar.

**OP05 Pensum**
- `CurriculumTeacherViewPage` y `CurriculumFamilyViewPage`, ya listadas en el punto 2.

**OP12 Convivencia**
- El plan de `enumerated-fluttering-nest.md` cubre este módulo en detalle y sigue vigente: la
  derivación sin familia ni agenda ni sesiones, el triaje que no crea la derivación, el cierre del
  caso sin pantalla y los avisos que no llegan.

---

# Parte 3. Lo transversal que exigen las nueve guías

Esto no es de un módulo: atraviesa las 325 pantallas que ya existen.

| Qué piden | Qué hay |
|---|---|
| **Storybook con estados por componente** (default, loading, empty, forbidden, conflict, locked, published, mobile, alta densidad, contraste a11y, error 409, error 422) | **0 stories.** `@storybook/react` ni siquiera está en `package.json`. |
| **Pruebas e2e Playwright por pantalla**, con "sin errores de consola ni datos personales" como criterio de cierre | **0 archivos `.spec.ts`**, aunque `@playwright/test` está instalado. |
| **Pruebas unitarias y de permisos por pantalla** (happy, forbidden, masked, API error) | 174 pruebas para 298 vistas. Falta cobertura de los casos forbidden y masked. |
| **Internacionalización español y alemán** | **Nada.** No hay i18n de ningún tipo, en un colegio alemán. |
| **Feature flags por tenant y rollout por porcentaje** | **Nada.** |
| **Error boundary propio por feature** | 1 `error.tsx` en toda la aplicación. |
| **`loading.tsx` por ruta** | 0. |
| **Pantalla de 403 propia** | 0. Hay manejo de permisos en componente, no ruta. |
| **Accesibilidad verificada** (axe, contraste, foco, landmarks) | Sin herramienta de a11y instalada. |
| **MSW por módulo** con fixtures nombrados por escenario | 1 archivo de handlers. |
| **Telemetría con `correlationId` y sin datos personales**, evento por acción | Parcial. |
| **Modo degradado y banner de dato viejo** | Parcial. |

---

## Anexo. De dónde salió cada número

- 44 documentos, segmentados por el encabezado de página de cada PDF.
- 349 nombres de pantalla únicos, descontando los artefactos de extracción
  (`Skeletonrecomendadopara...`, `Implementar...`, `Abre...`).
- 325 rutas de producto: `find app -name page.tsx` menos las 74 de `app/dashboard`, que son del
  template de administración comprado y no son trabajo del proyecto.
- 298 vistas `*-page-view.tsx`, 174 archivos de prueba.
- 15 roles en `NAV_BY_ROLE`, ninguno de familia ni de estudiante.
- 2 endpoints en `backend/ai-service`.
