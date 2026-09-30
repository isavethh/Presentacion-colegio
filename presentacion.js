/* ============================================================
   PRESENTACIÓN — navegación por diapositivas, foco y lupa sobre
   las capturas, visor ampliado y guion para quien presenta.
   ============================================================ */
(function(){
var $=function(id){return document.getElementById(id);};
var slides=Array.prototype.slice.call(document.querySelectorAll('.slide'));
var total=slides.length,cur=0;
var calmo=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- foco y lupa ----------
   En un .rig: data-spot o data-lens = "x y ancho alto" de la zona, en fracciones de la captura.
   data-lens además agranda esa zona: data-z = cuánto, data-at = "izquierda arriba" en % del conjunto. */
function zona(s){var v=s.trim().split(/\s+/).map(Number);return {x:v[0],y:v[1],w:v[2],h:v[3]};}

/* ---------- letras recortadas de revista ----------
   Cada letra de un .recorte sale de otra tipografía, otro papel y otro ángulo.
   El azar tiene semilla fija: la palabra se ve igual cada vez que se abre. */
(function(){
  var TIPOS=[["'Abril Fatface',serif",400],["'Alfa Slab One',serif",400],["Anton,sans-serif",400],["'Special Elite',monospace",400],
    ["'Archivo Black',sans-serif",400],["'Playfair Display',serif",900,"italic"],["'Courier Prime',monospace",700],["'Bebas Neue',sans-serif",400]];
  var PAPEL=[["#FBF8F1","#141214"],["#141214","#FBF8F1"],["#E6DFD3","#26211F"],["#7C1D3F","#FFFFFF"],
    ["#F4D6E0","#5F1730"],["#FFFFFF","#7C1D3F"],["#CFC8BE","#141214"],["#26211F","#F4D6E0"]];
  function azar(sem){return function(){sem=(sem*1664525+1013904223)>>>0;return sem/4294967296;};}
  /* esquina con un corte irregular: desde (x,y) hacia adentro, hasta 7 % */
  function esquina(r,x,y){return Math.abs(x-r()*7).toFixed(1)+'% '+Math.abs(y-r()*7).toFixed(1)+'%';}
  Array.prototype.forEach.call(document.querySelectorAll('.recorte'),function(el,n){
    var txt=el.textContent,r=azar(n*7919+17),antes=-1;
    el.setAttribute('role','text');el.setAttribute('aria-label',txt);el.textContent='';
    Array.prototype.forEach.call(txt,function(c){
      if(c===' '){var sp=document.createElement('span');sp.className='sp';el.appendChild(sp);return;}
      var t=TIPOS[Math.floor(r()*TIPOS.length)],k;
      do{k=Math.floor(r()*PAPEL.length);}while(k===antes);
      antes=k;
      var p=PAPEL[k],l=document.createElement('span');
      l.className='rl';l.setAttribute('aria-hidden','true');
      l.textContent=/[a-záéíóúñ]/i.test(c)?(r()<.45?c.toUpperCase():c.toLowerCase()):c;
      var cp='polygon('+[esquina(r,0,0),esquina(r,100,0),esquina(r,100,100),esquina(r,0,100)].join(',')+')';
      l.style.cssText='--ff:'+t[0]+';--fw:'+t[1]+';--fs:'+(t[2]||'normal')+';--bg:'+p[0]+';--fg:'+p[1]+
        ';--r:'+((r()-.5)*12).toFixed(1)+'deg;--y:'+((r()-.5)*.12).toFixed(2)+'em;--s:'+(.86+r()*.22).toFixed(2)+'em;--cp:'+cp;
      el.appendChild(l);
    });
  });
})();

/* data-zoom = "x y ancho alto": la ventana muestra solo esa parte de la captura, más grande.
   El foco y la lupa siguen midiéndose sobre la captura entera. */
Array.prototype.forEach.call(document.querySelectorAll('.rig[data-zoom]'),function(rig){
  var scr=rig.querySelector('.web .scr'),img=scr&&scr.querySelector('img');
  if(!img)return;
  var z=zona(rig.getAttribute('data-zoom'));
  var W=+img.getAttribute('width'),H=+img.getAttribute('height');
  var pic=document.createElement('div');
  pic.className='pic';
  pic.style.cssText='position:absolute;width:'+(100/z.w)+'%;left:'+(-z.x/z.w*100)+'%;top:'+(-z.y/z.h*100)+'%';
  img.parentNode.insertBefore(pic,img);
  pic.appendChild(img);
  scr.style.aspectRatio=(z.w*W)+' / '+(z.h*H);
});

Array.prototype.forEach.call(document.querySelectorAll('.rig[data-spot],.rig[data-lens]'),function(rig){
  var scr=rig.querySelector('.web .scr'),img=scr&&scr.querySelector('img');
  if(!img)return;
  var capa=scr.querySelector('.pic')||scr;
  var r=zona(rig.getAttribute('data-spot')||rig.getAttribute('data-lens'));
  var sp=document.createElement('div');
  sp.className='spot'+(rig.hasAttribute('data-below')?' below':'')+(rig.hasAttribute('data-end')?' end':'');
  sp.style.cssText='left:'+r.x*100+'%;top:'+r.y*100+'%;width:'+r.w*100+'%;height:'+r.h*100+'%';
  var txt=rig.getAttribute('data-label');
  if(txt){var em=document.createElement('em');em.textContent=txt;sp.appendChild(em);}
  capa.appendChild(sp);
  if(!rig.hasAttribute('data-lens'))return;
  var z=parseFloat(rig.getAttribute('data-z')||'1.8');
  var at=(rig.getAttribute('data-at')||'50 50').split(/\s+/).map(Number);
  var prop=img.getAttribute('width')/img.getAttribute('height');
  var src=img.getAttribute('src');
  var lens=document.createElement('div');
  lens.className='lens';
  lens.setAttribute('role','img');
  lens.setAttribute('aria-label','Detalle ampliado: '+img.alt);
  lens.setAttribute('data-src',src);
  lens.style.cssText='left:'+at[0]+'%;top:'+at[1]+'%;width:'+(r.w*z*100)+'%;aspect-ratio:'+(r.w*prop/r.h)+
    ';background-image:url("'+src+'");background-size:'+(100/r.w)+'% auto;background-position:'+
    (r.x/(1-r.w)*100)+'% '+(r.y/(1-r.h)*100)+'%';
  rig.appendChild(lens);
});

/* ---------- diapositiva actual ---------- */
function marcar(i){
  cur=i;var s=slides[i];
  var oscura=s.classList.contains('t-ink')||s.classList.contains('t-vino')||s.classList.contains('t-ai');
  document.documentElement.setAttribute('data-tone',oscura?'dark':'light');
  $('count').textContent=(i+1)+' / '+total;
  $('prog').style.transform='scaleX('+(total>1?i/(total-1):1)+')';
  var cap=s.getAttribute('data-chap');
  Array.prototype.forEach.call(document.querySelectorAll('#chaps a'),function(a){a.classList.toggle('on',a.getAttribute('data-chap')===cap);});
  slides.forEach(function(x,j){x.classList.toggle('actual',j===i);});
}

/* ---------- Copiloto IA: señales → hilos → redactando → texto que se escribe solo → fuentes ---------- */
var ia=(function(){
  var st=$('iaStage'),full=$('iaFull'),typed=$('iaTyped');
  if(!st)return null;
  var texto=full.textContent,timers=[],corriendo=false;
  function t(fn,ms){timers.push(setTimeout(fn,ms));}
  function reset(){
    timers.forEach(clearTimeout);timers=[];corriendo=false;
    st.classList.remove('s1','s2','s3','s4');typed.textContent='';
  }
  function correr(){
    reset();corriendo=true;
    if(calmo){st.classList.add('s1','s3','s4');typed.textContent=texto;return;}
    t(function(){st.classList.add('s1');},350);
    t(function(){st.classList.add('s2');},1900);
    t(function(){
      st.classList.add('s3');
      var i=0;
      (function escribe(){
        i=Math.min(texto.length,i+2);
        typed.textContent=texto.slice(0,i);
        if(i<texto.length)t(escribe,texto.charAt(i)==='.'?160:24);
        else t(function(){st.classList.add('s4');},250);
      })();
    },3400);
  }
  $('iaReplay').addEventListener('click',correr);
  return {entra:function(){if(!corriendo)correr();},sale:reset};
})();

/* ---------- escenas: se arman al entrar a la diapositiva y se limpian al salir ---------- */
function escena(limpiar,correr){
  var timers=[],corriendo=false;
  function t(fn,ms){timers.push(setTimeout(fn,ms));}
  function parar(){timers.forEach(clearTimeout);timers=[];corriendo=false;limpiar();}
  function arrancar(){parar();corriendo=true;correr(t);}
  return {entra:function(){if(!corriendo)arrancar();},sale:parar,otra:arrancar};
}
/* escribe de a dos letras; un número en la lista es una cita [n] que aparece en su lugar */
function escribir(t,el,partes,vel,alCitar,listo){
  el.textContent='';
  var i=0,j=0,nodo=null;
  (function paso(){
    if(i>=partes.length){if(listo)listo();return;}
    var p=partes[i];
    if(typeof p==='number'){
      var c=document.createElement('sup');c.className='cite';c.textContent=p;el.appendChild(c);
      if(alCitar)alCitar(p);
      i++;nodo=null;t(paso,160);return;
    }
    if(!nodo){nodo=document.createTextNode('');el.appendChild(nodo);j=0;}
    j=Math.min(p.length,j+2);nodo.data=p.slice(0,j);
    if(j>=p.length){i++;nodo=null;}
    t(paso,/[.:]/.test(p.charAt(j-1))?150:vel);
  })();
}
function textoFinal(el,partes){
  el.innerHTML=partes.map(function(p){return typeof p==='number'?'<sup class="cite">'+p+'</sup>':p.replace(/&/g,'&amp;').replace(/</g,'&lt;');}).join('');
}

/* ---------- asistente: responde a tres perfiles, uno detrás de otro ---------- */
var asis=(function(){
  var raiz=$('asis');if(!raiz)return null;
  var PERFILES=[
    {rol:'Familia',q:'¿Hasta cuándo puedo pagar la cuota de octubre sin recargo?',
     a:['Hasta el viernes 10 de octubre. Desde el día 11 se suma el recargo del 5 % que fija el reglamento de pensiones',1,'. Tu saldo pendiente es de Bs 2.750 y ya lo puedes pagar con QR desde la app',2,'.'],
     src:['Reglamento de pensiones 2026 · Art. 12','Estado de cuenta · Adrián Ticona'],act:['Pagar con QR','Hablar con administración']},
    {rol:'Docente',q:'¿Qué me falta para cerrar el trimestre en 3ro A?',
     a:['Dos cosas en Ciencias Naturales: la nota de «Hacer» de 4 estudiantes y la lista del jueves 18',1,'. El plazo para cargar notas vence el viernes 26 de septiembre',2,'.'],
     src:['Cuaderno de notas · Ciencias Naturales 3ro A','Calendario académico 2026'],act:['Abrir el cuaderno','Ver la norma de evaluación']},
    {rol:'Dirección',q:'¿Qué cursos pueden no cerrar a tiempo?',
     a:['Dos: 3ro A tiene 4 materias con notas incompletas y 1ro de secundaria A-1 tiene 2',1,'. La mayor demora está en Ciencias Naturales, con 66 % de avance',2,'.'],
     src:['Panel académico · hoy 08:40','Avance de calificación'],act:['Preparar un recordatorio','Abrir el panel']}
  ];
  var tabs=raiz.querySelectorAll('.asis-tabs span'),q=$('asisQ'),a=$('asisA'),src=$('asisSrc'),act=$('asisAct'),rol=$('asisRol');
  function pintar(k){
    var d=PERFILES[k];
    Array.prototype.forEach.call(tabs,function(x,i){x.classList.toggle('on',i===k);});
    rol.textContent=d.rol;
    src.innerHTML=d.src.map(function(s,i){return '<span data-c="'+(i+1)+'"><b>'+(i+1)+'</b>'+s+'</span>';}).join('');
    act.innerHTML=d.act.map(function(s,i){return '<span'+(i?'':' class="p"')+'>'+s+'</span>';}).join('');
  }
  function limpiar(){raiz.classList.remove('buscando','listo');q.textContent='';a.textContent='';}
  function perfil(t,k){
    var d=PERFILES[k];limpiar();pintar(k);
    escribir(t,q,[d.q],18,null,function(){
      raiz.classList.add('buscando');
      t(function(){
        raiz.classList.remove('buscando');
        escribir(t,a,d.a,22,function(n){var c=src.querySelector('[data-c="'+n+'"]');if(c)c.classList.add('on');},function(){
          raiz.classList.add('listo');
          t(function(){perfil(t,(k+1)%PERFILES.length);},4600);
        });
      },1200);
    });
  }
  return escena(function(){limpiar();pintar(0);q.textContent=PERFILES[0].q;textoFinal(a,PERFILES[0].a);},function(t){
    if(calmo){limpiar();pintar(0);q.textContent=PERFILES[0].q;textoFinal(a,PERFILES[0].a);Array.prototype.forEach.call(src.children,function(c){c.classList.add('on');});raiz.classList.add('listo');return;}
    perfil(t,0);
  });
})();

/* ---------- redacción: el borrador se escribe, cita sus fuentes y pasa a revisión ---------- */
var redacta=(function(){
  var raiz=$('stud');if(!raiz)return null;
  var txt=$('docTxt'),src=$('docSrc');
  var PARTES=['Estimadas familias de 3ro de secundaria:\n\nEl jueves 16 de octubre visitaremos el Museo Nacional de Etnografía y Folklore, como parte de la unidad «Nuestras culturas» de Ciencias Sociales',1,
    '. Saldremos del colegio a las 8:30 y volveremos a las 12:30',2,'.\n\nLes pedimos autorizar la salida desde la app hasta el martes 14 de octubre.\n\nDirección Académica'];
  function limpiar(){raiz.classList.remove('hecho');Array.prototype.forEach.call(src.children,function(c){c.classList.remove('on');});}
  return escena(function(){limpiar();textoFinal(txt,PARTES);},function(t){
    limpiar();
    if(calmo){textoFinal(txt,PARTES);Array.prototype.forEach.call(src.children,function(c){c.classList.add('on');});raiz.classList.add('hecho');return;}
    txt.textContent='';
    t(function(){
      escribir(t,txt,PARTES,14,function(n){var c=src.querySelector('[data-c="'+n+'"]');if(c)c.classList.add('on');},function(){t(function(){raiz.classList.add('hecho');},400);});
    },700);
  });
})();

/* ---------- búsqueda institucional: se escribe el nombre y aparecen los resultados ---------- */
var busca=(function(){
  var raiz=$('plat'),campo=$('busca');if(!raiz)return null;
  return escena(function(){raiz.classList.add('hallado');campo.textContent='Adrián';},function(t){
    raiz.classList.remove('hallado');
    if(calmo){campo.textContent='Adrián';raiz.classList.add('hallado');return;}
    campo.textContent='';
    t(function(){escribir(t,campo,['Adrián'],110,null,function(){t(function(){raiz.classList.add('hallado');},250);});},900);
  });
})();

/* ---------- puesta en marcha: los seis pasos avanzan solos; un clic fija el paso ---------- */
var pasos=(function(){
  var raiz=$('pasos');if(!raiz)return null;
  var items=raiz.querySelectorAll('.ps-item'),vis=raiz.querySelectorAll('.sv');
  var k=0,timer=null,auto=true,activo=false,DUR=7000;
  function mostrar(n){
    k=n;
    Array.prototype.forEach.call(items,function(it,i){it.classList.toggle('act',i===n);it.classList.remove('run');});
    Array.prototype.forEach.call(vis,function(v,i){v.classList.toggle('act',i===n);});
    if(auto&&!calmo){void items[n].offsetWidth;items[n].classList.add('run');}
  }
  function seguir(){
    clearTimeout(timer);
    if(!auto||calmo)return;
    timer=setTimeout(function(){mostrar((k+1)%items.length);seguir();},DUR);
  }
  Array.prototype.forEach.call(items,function(it,i){
    it.addEventListener('click',function(){auto=false;clearTimeout(timer);mostrar(i);});
  });
  return {
    entra:function(){if(activo)return;activo=true;auto=true;mostrar(0);seguir();},
    sale:function(){activo=false;clearTimeout(timer);auto=true;mostrar(0);}
  };
})();

var ganchos={'ia':asis,'ia-copiloto':ia,'ia-redacta':redacta,'plataforma':busca,'puesta':pasos};

if('IntersectionObserver' in window){
  /* la animación de entrada se dispara al aparecer y se rearma al salir del todo */
  var ver=new IntersectionObserver(function(es){es.forEach(function(e){
    var visible=e.isIntersecting&&(e.intersectionRatio>=.2||e.intersectionRect.height>=window.innerHeight*.45);
    var g=ganchos[e.target.id];
    if(visible){e.target.classList.add('on');if(g)g.entra();}
    else if(!e.isIntersecting){e.target.classList.remove('on');if(g)g.sale();}
  });},{threshold:[0,.2,.45]});
  /* la actual es la que cruza la línea del medio de la pantalla */
  var medio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting)marcar(slides.indexOf(e.target));
  });},{rootMargin:'-50% 0px -50% 0px'});
  slides.forEach(function(s){ver.observe(s);medio.observe(s);});
}else{
  slides.forEach(function(s){s.classList.add('on');});
}
marcar(0);

/* ---------- pasar de diapositiva ---------- */
function ir(i){
  i=Math.max(0,Math.min(total-1,i));
  slides[i].scrollIntoView({behavior:calmo?'auto':'smooth',block:'start'});
}
function actualReal(){
  /* por si se llega con la rueda a mitad de camino: la más cercana al borde de arriba */
  var mejor=cur,d=Infinity;
  slides.forEach(function(s,j){var t=Math.abs(s.getBoundingClientRect().top);if(t<d){d=t;mejor=j;}});
  return mejor;
}
$('prev').addEventListener('click',function(){ir(actualReal()-1);});
$('next').addEventListener('click',function(){ir(actualReal()+1);});

/* ---------- guion y pantalla completa ---------- */
var notas=false;
try{notas=localStorage.getItem('pc_guion')==='1';}catch(e){}
function aplicarNotas(){
  document.body.classList.toggle('notes',notas);
  $('notesBtn').setAttribute('aria-pressed',notas?'true':'false');
  try{localStorage.setItem('pc_guion',notas?'1':'0');}catch(e){}
}
$('notesBtn').addEventListener('click',function(){notas=!notas;aplicarNotas();});
aplicarNotas();
function completa(){
  try{var p=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();if(p&&p.catch)p.catch(function(){});}catch(e){}
}
$('fsBtn').addEventListener('click',completa);

/* ---------- visor ampliado ---------- */
function abrir(src,alt){$('lbImg').src=src;$('lbImg').alt=alt||'';$('lb').hidden=false;}
function cerrar(){$('lb').hidden=true;$('lbImg').removeAttribute('src');}
$('lb').addEventListener('click',cerrar);
document.addEventListener('click',function(e){
  var t=e.target.closest('img.shot,.lens');
  if(!t)return;
  abrir(t.getAttribute('data-src')||t.getAttribute('src'),t.getAttribute('alt')||t.getAttribute('aria-label'));
});

/* ---------- teclado: flechas, espacio, control de presentación ---------- */
document.addEventListener('keydown',function(e){
  if(!$('lb').hidden){if(e.key==='Escape'||e.key===' ')cerrar();e.preventDefault();return;}
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.target.closest&&e.target.closest('input,textarea,select'))return;
  var k=e.key,i=actualReal();
  if(k==='ArrowDown'||k==='ArrowRight'||k==='PageDown'||(k===' '&&!e.shiftKey)){e.preventDefault();ir(i+1);}
  else if(k==='ArrowUp'||k==='ArrowLeft'||k==='PageUp'||(k===' '&&e.shiftKey)){e.preventDefault();ir(i-1);}
  else if(k==='Home'){e.preventDefault();ir(0);}
  else if(k==='End'){e.preventDefault();ir(total-1);}
  else if(k==='n'||k==='N'){notas=!notas;aplicarNotas();}
  else if(k==='f'||k==='F'){completa();}
});
})();
