/* ============================================================
   RECORRIDO POR SCROLL — arma la página desde modulos.js y circuitos.js
   ============================================================ */
(function(){
var byId={};M.forEach(function(m,i){m.i=i;byId[m.id]=m;var x=MEDIA[m.id];if(x){m.w=x.w;m.p=x.p;m.cx=x.cx;}});
var cById={};C.forEach(function(c,i){c.i=i;cById[c.id]=c;});
var areaById={};AREAS.forEach(function(a){areaById[a.id]=a;});

/* Imagen principal de cada área en la sección de módulos */
var AREA_DEV={
 academico:{w:'hor-armar',p:'horario-1',t:'Armar el horario del curso, sin choques, y verlo en el teléfono.'},
 economico:{w:'caja-del-dia',p:'familia-pagos',t:'La caja del día en el colegio y el estado de cuenta en la app de la familia.'},
 vida:{w:'c2-panel',p:'aviso-enfermeria-retiro',t:'El panel de Enfermería y el aviso que recibe el apoderado.'},
 campus:{mock:'transporte',t:'Pantalla ilustrativa del módulo de transporte.'},
 comunidad:{ps:['comunicados-1','portada-3-avisos','inicio-casa'],t:'Comunicados, avisos e inicio de la app de la familia.'},
 direccion:{w:'gob-panel',t:'El panel académico de la dirección.'},
 base:{w:'tra-trazabilidad',t:'La trazabilidad del estudiante: una sola historia.'}
};

var $=function(id){return document.getElementById(id);};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function pad(n){return (n<10?'0':'')+n;}
var CK='<span class="ck"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M2 6l3 3 5-6"/></svg></span>';
var ARR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
function note(t){return t?'<div class="note"><b>Para quien presenta</b>'+esc(t)+'</div>':'';}

/* ---------- imágenes y dispositivos ---------- */
function kind(k){return (IMG[k]||['crop'])[0];}
function im(k,cls,eager){var d=IMG[k]||['crop',800,600];return '<img class="shot '+(cls||'')+'" src="img/'+k+'.webp" width="'+d[1]+'" height="'+d[2]+'" alt="Pantalla de PeopleCole: '+esc(k.replace(/^\d+[a-z]?-/,'').replace(/-/g,' '))+'"'+(eager?'':' loading="lazy"')+' decoding="async">';}
function monitor(inner){return '<div class="monitor"><div class="bezel"><div class="scr">'+inner+'</div><div class="chin"><i></i></div></div><div class="neck"></div><div class="foot"></div></div>';}
function phone(k,eager){return '<div class="phone"><div class="scr">'+im(k,'',eager)+'</div></div>';}
function piece(k,eager){
  var t=kind(k),d=IMG[k];
  if(t==='screen')return monitor(im(k,'',eager));
  if(t==='phone')return phone(k,eager);
  if(t==='raw')return im(k,'raw',eager);
  return im(k,'crop'+(d&&d[3]?' pc':''),eager);
}
/* monitor con un segundo elemento apoyado delante */
function rig(w,o,eager,extraCls){
  var ov='';
  if(o){var t=kind(o);ov='<div class="over'+(t==='crop'?' c':'')+(extraCls?' '+extraCls:'')+'">'+piece(o,eager)+'</div>';}
  return '<div class="rig">'+monitor(im(w,'',eager))+ov+'</div>';
}
/* un grupo de capturas de un paso */
function group(keys,eager){
  var scr=keys.filter(function(k){return kind(k)==='screen';});
  if(scr.length){var other=keys.filter(function(k){return k!==scr[0];})[0];return rig(scr[0],other,eager);}
  return keys.map(function(k){return piece(k,eager);}).join('');
}

/* ---------- maqueta ilustrativa con el estilo de la app ---------- */
function spark(seed){
  var pts=[],v=50,x;for(x=0;x<=10;x++){seed=(seed*9301+49297)%233280;v+=((seed/233280)-.42)*26;v=Math.max(10,Math.min(90,v));pts.push((x*10)+','+(100-v).toFixed(1));}
  return '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="'+pts.join(' ')+'" fill="none" stroke="#fff" vector-effect="non-scaling-stroke" style="stroke-width:1.6px" stroke-linejoin="round"/></svg>';
}
function mock(m){
  var s=m.m,a=areaById[m.a];
  var side=M.filter(function(x){return x.a===m.a;}).slice(0,9).map(function(x){return '<span class="'+(x.id===m.id?'on':'')+'">'+esc(x.n)+'</span>';}).join('');
  var k=s.k.map(function(x,i){return '<div class="mk-kpi"><span>'+esc(x[1].charAt(0).toUpperCase()+x[1].slice(1))+'</span><strong>'+esc(x[0])+'</strong>'+spark(m.i*7+i*13+3)+'</div>';}).join('');
  var th=s.c.map(function(c){return '<th>'+esc(c)+'</th>';}).join('');
  var rows=s.r.map(function(r){return '<tr>'+r.map(function(v,j){
    if(j===r.length-1&&/^[garb]:/.test(v))return '<td><span class="pill '+v[0]+'">'+esc(v.slice(2))+'</span></td>';
    return '<td>'+esc(v)+'</td>';}).join('')+'</tr>';}).join('');
  return '<div class="mk" aria-label="Pantalla ilustrativa del módulo '+esc(m.n)+'">'+
   '<div class="mk-side"><b>PeopleCole</b><small>'+esc(a.n)+'</small>'+side+'</div>'+
   '<div class="mk-main"><div class="mk-top"><div class="s">Buscar…</div><div class="av">D</div></div>'+
   '<div class="mk-sel"><span>Colegio San Andrés</span><span>Sede Calacoto</span><span>Gestión 2026</span></div>'+
   '<div class="mk-body"><div class="mk-title"><div class="ic">'+esc(m.n.charAt(0))+'</div><div><h6>'+esc(s.t)+'</h6><small>Gestión 2026</small></div><span class="b">'+esc(s.b)+'</span></div>'+
   '<div class="mk-kpis">'+k+'</div><div class="mk-tbl"><table><thead><tr>'+th+'</tr></thead><tbody>'+rows+'</tbody></table></div></div></div></div>';
}
function tag(real){return real?'<p class="real"><i></i>Captura del sistema funcionando</p>':'<p class="real demo"><i></i>Pantalla ilustrativa con datos de ejemplo</p>';}

/* ---------- secciones ---------- */
function sHero(){
  return '<section class="screen wine hero" id="inicio" data-slide><div class="wrap">'+
   '<div><span class="kick">Gestión escolar para colegios de Bolivia</span><h1>Todo el colegio, en un solo sistema.</h1><div class="rule"></div>'+
   '<p class="lead">Lo que pasa entre un docente, una familia y la dirección deja de vivir en un cuaderno, un grupo de mensajes y la memoria de alguien.</p>'+
   '<div class="btns"><a class="b-w" href="#problema">Empezar el recorrido '+ARR.replace('<svg','<svg width="18" height="18"')+'</a><a class="b-g" href="#circuitos">Ver los 8 circuitos</a></div>'+
   note('Pregunta cuál de las tres frases de la siguiente pantalla escuchó esta semana. Esa respuesta te dice a qué circuito saltar.')+'</div>'+
   '<div class="hero-dev">'+'<div class="rig">'+monitor(im('adm-panel','',true))+'<div class="over">'+phone('portada-apoderado',true)+'</div><div class="over r">'+phone('portada-docente',true)+'</div></div></div>'+
   '</div><a class="cue" href="#problema" aria-label="Bajar"><span></span>Desliza</a></section>';
}
function sProblema(){
  return '<section class="screen dark" id="problema" data-slide data-nav="problema"><div class="wrap">'+
   '<span class="kick">La prueba más corta</span><h2 class="sec-t">Tres frases que en un colegio se dicen todos los días.</h2><p class="sec-p">Ninguna se puede comprobar hoy.</p>'+
   '<div class="frases">'+TRES.map(function(t){return '<div class="frase rv"><b>'+esc(t[0])+'</b><span>'+esc(t[1])+'</span></div>';}).join('')+'</div>'+
   '<p class="remate">Las tres se contestan solas si el trabajo de todos los días <strong>deja rastro mientras se hace</strong>. Eso es lo que hace PeopleCole.</p>'+
   '</div></section>';
}
function cover(c){
  var all=[];c.sc.forEach(function(s){all=all.concat(s.i);});
  var scr=all.filter(function(k){return kind(k)==='screen';})[0];
  if(scr)return '<div class="th"><img src="img/'+scr+'.webp" alt="" loading="lazy"></div>';
  var ph=all.filter(function(k){return kind(k)==='phone';}).slice(0,3);
  if(ph.length)return '<div class="th ph">'+ph.map(function(k){return '<img src="img/'+k+'.webp" alt="" loading="lazy">';}).join('')+'</div>';
  return '<div class="th"><img src="img/'+all[0]+'.webp" alt="" loading="lazy"></div>';
}
function sIndice(){
  var real=M.filter(function(m){return m.w||m.p;}).length;
  return '<section class="screen soft" id="circuitos" data-slide data-nav="circuitos"><div class="wrap">'+
   '<span class="kick">Ocho circuitos completos</span><h2 class="sec-t">Procesos enteros, no pantallas sueltas.</h2>'+
   '<p class="sec-p">Cada circuito empieza en una persona, pasa por otras dos y termina cerrado, con lo que pasó en el medio escrito y con nombre.</p>'+
   '<div class="nums"><div><b>'+M.length+'</b><span>módulos que comparten la misma información</span></div><div><b>'+C.length+'</b><span>circuitos completos, de punta a punta</span></div><div><b>'+ROLES.length+'</b><span>perfiles, cada uno con su propio menú</span></div><div><b>2</b><span>formas de entrar: sistema web y app en el teléfono</span></div></div>'+
   '<div class="cards">'+C.map(function(c,i){return '<a class="card rv" href="#circuito-'+c.id+'">'+cover(c)+'<div class="bd"><span class="n">'+pad(i+1)+'</span><h3>'+esc(c.n)+'</h3><p>'+esc(c.corto)+'</p></div></a>';}).join('')+'</div>'+
   '</div></section>';
}
function sCircuito(c){
  var h='<section class="screen wine opener" id="circuito-'+c.id+'" data-slide data-nav="circuitos"><div class="wrap">'+
   '<div><div class="big-n" aria-hidden="true">'+pad(c.i+1)+'</div><span class="kick">Circuito '+(c.i+1)+' de '+C.length+'</span><h2>'+esc(c.n)+'</h2><p class="sec-p">'+esc(c.b)+'</p>'+
   '<ul class="k">'+c.k.map(function(t){return '<li>'+CK+'<span>'+esc(t)+'</span></li>';}).join('')+'</ul>'+note(c.note)+'</div>'+
   '<div class="prob rv"><h4>El problema, hoy</h4><ul>'+c.p.map(function(t){return '<li>'+esc(t)+'</li>';}).join('')+'</ul>'+
   (c.fr?'<p class="fr">'+esc(c.fr)+'</p>':'')+
   '<h4 style="margin-top:24px">Cómo funciona con PeopleCole</h4><ol class="flow">'+c.fl.map(function(f){return '<li><b>'+esc(f[0])+'</b><span>'+esc(f[1])+'</span></li>';}).join('')+'</ol></div>'+
   '</div></section>';
  h+='<div class="story wrap" data-story="'+c.id+'"><div class="steps">'+c.sc.map(function(s,j){
     return '<article class="st" data-slide data-k="'+j+'"><p class="i"><b>'+pad(c.i+1)+'</b> · Paso '+(j+1)+' de '+c.sc.length+'</p><h3>'+esc(s.h)+'</h3><p>'+esc(s.t)+'</p>'+
       (s.big?'<div class="bigfig"><b>'+esc(s.big[0])+'</b><span>'+esc(s.big[1])+'</span></div>':'')+
       '<div class="inline">'+group(s.i)+'</div></article>';
   }).join('')+'</div>'+
   '<div class="stage" aria-hidden="false">'+c.sc.map(function(s,j){return '<div class="frame n'+s.i.length+(j===0?' on':'')+'" data-k="'+j+'">'+group(s.i)+'</div>';}).join('')+'</div></div>';
  var next=C[c.i+1];
  h+='<section class="written"><div class="wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg><div><h3>Qué le queda escrito al colegio</h3><p>'+esc(c.q)+'</p>'+
   '<div class="next">'+(next?'<a class="b-g" href="#circuito-'+next.id+'">Siguiente: '+esc(next.n)+'</a>':'<a class="b-g" href="#app">Siguiente: la app</a>')+'<a class="b-g" href="#circuitos">Ver todos los circuitos</a></div></div></div></section>';
  return h;
}
function sApp(){
  return '<section class="screen dark" id="app" data-slide data-nav="app"><div class="wrap">'+
   '<span class="kick">En el teléfono</span><h2 class="sec-t">Cada persona ve lo suyo.</h2><p class="sec-p">La misma información del colegio, en la app de cada perfil. La docente ve su día, la familia la semana de su hijo y el alumno sus tareas ya calificadas.</p>'+
   '<div class="trio"><figure class="rv">'+phone('portada-docente')+'<figcaption><b>La docente</b><span>Sus clases, avisos y pendientes</span></figcaption></figure>'+
   '<figure class="rv">'+phone('portada-familia-resumen')+'<figcaption><b>La familia</b><span>Cómo vino la semana de su hijo</span></figcaption></figure>'+
   '<figure class="rv">'+phone('docente-tareas-04-alumno-ve-la-tarea')+'<figcaption><b>El alumno</b><span>Sus tareas, con la nota</span></figcaption></figure></div>'+
   '</div></section>'+
   '<section class="screen" id="pagos" data-slide data-nav="app"><div class="wrap pay">'+
   '<div><span class="kick">Pagos por QR</span><h2 class="sec-t">La pensión se paga desde el teléfono.</h2><p class="sec-p">Y el pago se aplica solo a la cuota correcta. Nadie manda la foto del comprobante por WhatsApp ni busca el pago en el extracto del banco.</p>'+
   '<ol><li><div><b>La familia ve lo que debe</b><span>Estado de cuenta con cada cargo, sus becas y descuentos ya aplicados.</span></div></li><li><div><b>Paga con el QR de su banco</b><span>El QR tiene el monto y la fecha de vencimiento.</span></div></li><li><div><b>El colegio lo ve cobrado</b><span>La cuota cambia a pagada sola y entra en la caja del día.</span></div></li></ol></div>'+
   '<div class="pay-dev rv">'+phone('familia-pagos')+im('qr-app-qr','raw')+im('qr-app-recibido','raw')+'</div>'+
   '</div></section>';
}
function sModulos(){
  var h='<section class="screen soft" id="modulos" data-slide data-nav="modulos"><div class="wrap">'+
   '<span class="kick">Todo lo que trae el sistema</span><h2 class="sec-t">'+M.length+' módulos en siete áreas.</h2><p class="sec-p">Se empieza por partes: primero lo académico y la cobranza, y el resto se enciende cuando el colegio quiera. Toca cualquier módulo para ver qué resuelve.</p>'+
   '<div class="areas">'+AREAS.map(function(a){var n=M.filter(function(m){return m.a===a.id;}).length;return '<a class="area-a rv" href="#area-'+a.id+'"><span class="dot" style="background:'+a.c+'"></span><h3>'+esc(a.n)+'</h3><p>'+esc(a.d)+'</p><small>'+n+' módulos</small></a>';}).join('')+
   '<a class="area-a rv" href="#empezar" style="background:var(--vino);border-color:var(--vino);color:#fff"><span class="dot" style="background:var(--rosa)"></span><h3 style="color:#fff">Cómo empezamos</h3><p style="color:#FBEFF3">La implementación por etapas, sin detener el colegio.</p><small style="color:var(--rosa)">5 etapas</small></a></div>'+
   '</div></section>';
  AREAS.forEach(function(a,i){
    var mods=M.filter(function(m){return m.a===a.id;}),d=AREA_DEV[a.id],dev,real=true;
    if(d.w)dev=rig(d.w,d.p);else if(d.ps)dev='<div class="phones">'+d.ps.map(function(k){return phone(k);}).join('')+'</div>';else{dev=monitor(mock(byId[d.mock]));real=false;}
    var dark=i%2===1;
    h+='<section class="screen area-s'+(dark?' dark':'')+(i%2===1?' flip':'')+'" id="area-'+a.id+'" data-slide data-nav="modulos"><div class="wrap">'+
     '<div class="tx"><span class="kick tag"><i style="background:'+a.c+'"></i>'+esc(a.n)+' · '+mods.length+' módulos</span><h2>'+esc(a.d)+'</h2>'+
     '<div class="chips">'+mods.map(function(m){return '<button class="chip" data-mod="'+m.id+'">'+esc(m.n)+(m.w||m.p?'<span class="cam" title="Con captura real"></span>':'')+'</button>';}).join('')+'</div>'+
     '<p class="hint"><i></i>Con punto: tiene capturas del sistema real. Toca un módulo para ver su ficha.</p></div>'+
     '<div class="rv"><div class="area-dev">'+dev+'</div>'+tag(real).replace('</p>',' · '+esc(d.t)+'</p>')+'</div>'+
     '</div></section>';
  });
  return h;
}
function sEmpezar(){
  return '<section class="screen wine" id="empezar" data-slide data-nav="empezar"><div class="wrap">'+
   '<span class="kick">Lo que sigue</span><h2 class="sec-t">Cómo empezamos con tu colegio.</h2><p class="sec-p">PeopleCole se implementa por etapas, sin detener la operación. Cada etapa se prueba con tu equipo antes de pasar a la siguiente.</p>'+
   '<ol class="plan"><li><b>Tu colegio en el sistema</b><span>Sedes, niveles, cursos, paralelos, turnos, calendario y reglas propias.</span></li><li><b>Personas y vínculos</b><span>Estudiantes, familias y apoderados, sin duplicados y con quién responde por quién.</span></li><li><b>Lo académico</b><span>Pensum con equivalencias SEDUCA, horario publicado, asistencia y notas.</span></li><li><b>Lo económico</b><span>Aranceles, becas, planes de pago, QR y caja del día.</span></li><li><b>La app y los circuitos</b><span>Familias, docentes y alumnos en el teléfono; reuniones, enfermería y convivencia.</span></li></ol>'+
   '<div class="need"><div class="l"><h3>Lo que necesitamos del colegio</h3><ul><li>La estructura de cursos y paralelos por sede</li><li>El horario publicado de cada curso</li><li>Las personas y sus vínculos familiares (Excel o sistema actual)</li><li>Aranceles, becas y descuentos vigentes</li><li>Una persona responsable por área para validar cada etapa</li></ul></div>'+
   '<div class="r"><h3>Siguiente paso</h3><p>Agendamos una reunión con tu equipo para revisar tus datos y armar el plan de implementación con fechas para tu colegio.</p><div class="btns" style="margin-top:20px"><a class="b-v" href="#inicio">Volver al inicio</a></div></div></div>'+
   note('Cierra preguntando qué circuito le interesa primero y cuántos estudiantes y sedes tiene. Con eso se arma la cotización. Si pregunta por plazos: dependen de sus datos, y el plan con fechas se entrega después de revisarlos.')+
   '</div></section><footer class="foot"><div class="wrap"><span>PeopleCole · Gestión escolar</span><span>Las capturas son del sistema funcionando con datos de prueba.</span></div></footer>';
}

/* ---------- ficha de módulo ---------- */
function openMod(id){
  var m=byId[id];if(!m)return;var a=areaById[m.a],media,real=true,cx=m.cx&&cById[m.cx];
  if(m.w)media=rig(m.w,m.p&&m.p[0],true);
  else if(m.p)media='<div class="phones">'+m.p.map(function(k){return piece(k,true);}).join('')+'</div>';
  else{media=monitor(mock(m));real=false;}
  $('sheet').innerHTML='<button class="x" id="mClose" aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'+
   '<div class="sh-head"><span class="kick">'+esc(a.n)+'</span><h2 id="mTitle">'+esc(m.n)+'</h2><p>'+esc(m.f)+'</p></div>'+
   '<div class="sh-body"><div class="cmp"><div class="before"><h4>Hoy, sin PeopleCole</h4><p>'+esc(m.p)+'</p></div>'+
   '<div class="after"><h4>Con PeopleCole</h4><ul>'+m.s.map(function(t){return '<li>'+CK+'<span>'+esc(t)+'</span></li>';}).join('')+'</ul></div>'+
   (cx?'<a class="to-c" href="#circuito-'+cx.id+'" data-close><div><b>Verlo como circuito completo</b><small>'+pad(cx.i+1)+' · '+esc(cx.n)+'</small></div>'+ARR+'</a>':'')+'</div>'+
   '<div><div class="sh-media">'+media+'</div>'+tag(real)+'</div>'+
   '<div class="sh-meta"><div><h4>Quién lo usa</h4><div class="tags">'+m.u.map(function(r){return '<span class="tagp">'+esc(r)+'</span>';}).join('')+'</div></div>'+
   '<div><h4>Se conecta con</h4><div class="tags">'+m.x.filter(function(x){return byId[x];}).map(function(x){var t=byId[x];return '<button class="chip" data-mod="'+x+'"><i style="background:'+areaById[t.a].c+'"></i>'+esc(t.n)+'</button>';}).join('')+'</div></div></div>'+
   '<div class="sh-foot">'+note(m.note+(m.q?' Pregunta frecuente: '+m.q[0]+' '+m.q[1]:''))+'</div></div>';
  $('modal').hidden=false;$('modal').scrollTop=0;document.body.style.overflow='hidden';
  $('mClose').focus();
}
function closeMod(){$('modal').hidden=true;document.body.style.overflow='';}

/* ---------- armar ---------- */
$('root').innerHTML=sHero()+sProblema()+sIndice()+C.map(sCircuito).join('')+sApp()+sModulos()+sEmpezar();

/* escenario fijo: cambia la captura según el paso visible */
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;
    var st=e.target,story=st.closest('.story'),k=st.getAttribute('data-k');
    Array.prototype.forEach.call(story.querySelectorAll('.frame'),function(f){f.classList.toggle('on',f.getAttribute('data-k')===k);});
  });},{rootMargin:'-45% 0px -45% 0px'});
  Array.prototype.forEach.call(document.querySelectorAll('.st'),function(s){io.observe(s);});
  var navIo=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;var n=e.target.getAttribute('data-nav');
    Array.prototype.forEach.call(document.querySelectorAll('#nav a'),function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+n);});
  });},{rootMargin:'-40% 0px -55% 0px'});
  Array.prototype.forEach.call(document.querySelectorAll('[data-nav],#inicio'),function(s){navIo.observe(s);});
}

/* barra de progreso */
var bar=$('prog'),ticking=false;
function prog(){var d=document.documentElement,max=d.scrollHeight-d.clientHeight;bar.style.transform='scaleX('+(max>0?d.scrollTop/max:0)+')';ticking=false;}
window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(prog);}},{passive:true});
prog();

/* guion */
var notes=false;try{notes=localStorage.getItem('pc_notes')==='1';}catch(e){}
function applyNotes(){document.body.classList.toggle('show-notes',notes);$('notesBtn').setAttribute('aria-pressed',notes?'true':'false');try{localStorage.setItem('pc_notes',notes?'1':'0');}catch(e){}}
$('notesBtn').addEventListener('click',function(){notes=!notes;applyNotes();});
applyNotes();
$('fsBtn').addEventListener('click',function(){try{var p=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();if(p&&p.catch)p.catch(function(){});}catch(e){}});

/* visor y fichas */
function openLb(src,alt){$('lbImg').src=src;$('lbImg').alt=alt||'';$('lb').hidden=false;}
function closeLb(){$('lb').hidden=true;$('lbImg').removeAttribute('src');}
$('lb').addEventListener('click',closeLb);
$('modal').addEventListener('click',function(e){if(e.target===$('modal'))closeMod();});
document.addEventListener('click',function(e){
  var sh=e.target.closest('img.shot');if(sh){openLb(sh.getAttribute('src'),sh.alt);return;}
  var md=e.target.closest('[data-mod]');if(md){openMod(md.getAttribute('data-mod'));return;}
  if(e.target.closest('#mClose')){closeMod();return;}
  if(e.target.closest('[data-close]'))closeMod();
});

/* teclado: flechas y control de presentación pasan de pantalla en pantalla */
function slides(){return Array.prototype.slice.call(document.querySelectorAll('[data-slide]'));}
function jump(d){
  var y=window.scrollY+parseInt(getComputedStyle(document.documentElement).getPropertyValue('--top'))+4,list=slides(),t=null,i;
  if(d>0){for(i=0;i<list.length;i++){if(list[i].getBoundingClientRect().top+window.scrollY>y+8){t=list[i];break;}}}
  else{for(i=list.length-1;i>=0;i--){if(list[i].getBoundingClientRect().top+window.scrollY<y-8){t=list[i];break;}}}
  if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
}
document.addEventListener('keydown',function(e){
  if(!$('lb').hidden&&e.key==='Escape'){closeLb();return;}
  if(!$('modal').hidden){if(e.key==='Escape')closeMod();return;}
  if(e.target.matches('input,textarea,select'))return;
  if(e.key==='n'||e.key==='N'){notes=!notes;applyNotes();return;}
  if(e.key==='ArrowDown'||e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();jump(1);}
  if(e.key==='ArrowUp'||e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();jump(-1);}
});
})();
