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
Array.prototype.forEach.call(document.querySelectorAll('.rig[data-spot],.rig[data-lens]'),function(rig){
  var scr=rig.querySelector('.web .scr'),img=scr&&scr.querySelector('img');
  if(!img)return;
  var r=zona(rig.getAttribute('data-spot')||rig.getAttribute('data-lens'));
  var sp=document.createElement('div');
  sp.className='spot'+(rig.hasAttribute('data-below')?' below':'')+(rig.hasAttribute('data-end')?' end':'');
  sp.style.cssText='left:'+r.x*100+'%;top:'+r.y*100+'%;width:'+r.w*100+'%;height:'+r.h*100+'%';
  var txt=rig.getAttribute('data-label');
  if(txt){var em=document.createElement('em');em.textContent=txt;sp.appendChild(em);}
  scr.appendChild(sp);
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
var ganchos={ia:ia};

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
