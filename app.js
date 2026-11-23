// Mi Espacio — prototipo navegable. Datos ficticios, sin backend.
// Decisiones aplicadas: participante (D-28), diario de acompañamiento visible para Diana
// avisado en onboarding (D-31), sin flujo de "compartir una a una" (D-32), abordaje cálido (D-27).

const estado = {
  obVisto: false,
  participante: { nombre: "Lucía", plan: "Premium", sesion: 3, total: 10 },
  diario: [
    { id: 1, fecha: "Hace 2 días", titulo: "Sobre poner límites", emocion: "Tranquila",
      texto: "Hoy pude decir que no a un favor sin sentirme culpable todo el día. Me costó, pero lo dije.", sesion: true },
    { id: 2, fecha: "Hace 5 días", titulo: "", emocion: "Cansada",
      texto: "Semana pesada. Escribo esto para soltarlo un poco.", sesion: false },
  ],
  nid: 3,
};

const EMOCIONES = ["Tranquila","Triste","Preocupada","Frustrada","Culpable","Cansada","Agradecida","Confundida","Prefiero no decir"];

const PILARES = [
  ["Creencias y patrones emocionales","Comprender por qué se repiten algunas dinámicas.",70],
  ["Autoconocimiento e identidad","Reconocer quién eres y qué necesitas.",80],
  ["Autoestima y autovaloración","Cuidar la relación contigo misma.",55],
  ["Autonomía y límites","Decidir y expresar lo que necesitas.",65],
  ["Relaciones conscientes","Conectar con otras personas sin desconectarte de ti.",40],
];

const RECURSOS = [
  ["Volver a la calma","Audio · Regulación emocional · 12 min","audio"],
  ["Reconocer lo que necesito","Workbook · Descargable","doc"],
  ["La historia que se repite","Video · Módulo 1 · 18 min","video"],
];

// --- iconos (trazo simple) ---
const I = {
  inicio:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  camino:'<path d="M4 20c6-2 4-8 8-10s4-6 8-8"/>',
  diario:'<path d="M6 3h11a2 2 0 012 2v16l-3-2-3 2-3-2-3 2V5a2 2 0 012-2z"/>',
  lab:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/>',
  biblio:'<path d="M4 5a2 2 0 012-2h6v18H6a2 2 0 01-2-2z"/><path d="M12 3h6a2 2 0 012 2v12a2 2 0 01-2 2h-6"/>',
  sesion:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  perfil:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  reloj:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

const NAV = [
  ["inicio","Inicio","inicio"],
  ["camino","Camino","camino"],
  ["diario","Diario","diario"],
  ["laboratorio","Laboratorio","lab"],
  ["biblioteca","Biblioteca","biblio"],
];

const esc = s => (s||"").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const go = h => { location.hash = h; };

// ---------- SHELL ----------
function shell(ruta, contenido){
  const item = ([id,txt,ic]) => `<a href="#/${id}" class="${ruta===id?'activo':''}">${svg(I[ic])}<span>${txt}</span></a>`;
  return `
  <div class="app">
    <header class="topbar">
      <div class="marca"><img src="assets/icono-mi-espacio.webp" alt="">Mi Espacio</div>
      <div class="topbar-acc">
        <a class="icono-btn" href="#/sesiones" aria-label="Mis sesiones">${svg(I.sesion)}</a>
        <a class="icono-btn" href="#/perfil" aria-label="Perfil y privacidad">${svg(I.perfil)}</a>
        <button class="salida" onclick="salidaRapida()">Salir rápido</button>
      </div>
    </header>
    <div class="cuerpo">
      <aside class="lateral"><nav>
        ${NAV.map(item).join("")}
        <a href="#/sesiones" class="${ruta==='sesiones'?'activo':''}">${svg(I.sesion)}<span>Sesiones</span></a>
        <a href="#/perfil" class="${ruta==='perfil'?'activo':''}">${svg(I.perfil)}<span>Perfil</span></a>
        <a href="#/ayuda" class="${ruta==='ayuda'?'activo':''}">${svg(I.reloj)}<span>Ayuda</span></a>
        <button class="salida salida-lat" onclick="salidaRapida()">Salir rápido</button>
      </nav></aside>
      <main class="principal" id="main" tabindex="-1">${contenido}</main>
    </div>
    <nav class="nav-inf" aria-label="Secciones">${NAV.map(item).join("")}</nav>
  </div>`;
}

function salidaRapida(){
  document.body.innerHTML = '<div style="min-height:100vh;display:grid;place-items:center;font-family:sans-serif;color:#555;background:#F7F4F2;text-align:center;padding:24px"><div><p>Página en blanco.</p><p style="font-size:.85rem">Esto cerró la vista. (En la app real, tu contenido no queda visible aquí.)<br><a href="#/inicio" onclick="location.reload()">Volver al prototipo</a></p></div></div>';
}

// ---------- PANTALLAS ----------
function pInicio(){
  const p = estado.participante;
  return shell("inicio", `
  <div class="inicio-grid">
    <div>
      <div class="enc"><h1>Hola, ${esc(p.nombre)}</h1>
        <p class="tenue">Método Emperatriz · ${p.plan} · Sesión ${p.sesion} de ${p.total}</p></div>
      <div class="banner"><img src="assets/banner-mi-espacio.webp" alt=""></div>
      <div class="card destacada">
        <span class="etq rosa">Tu próxima sesión</span>
        <h3 style="margin:8px 0 2px">Martes 9 de marzo · 5:00 p. m.</h3>
        <p class="mini tenue">Hora de El Salvador</p>
        <a class="btn" href="#/sesiones">Ver sesión</a>
      </div>
      <div class="card">
        <span class="etq">Para esta semana</span>
        <h3 style="margin:8px 0 2px">Reconocer lo que necesito</h3>
        <p class="mini tenue">10 min · Uso privado</p>
        <a class="btn sec" href="#/laboratorio">Comenzar</a>
        <a class="btn texto" href="#/camino">Ver otras (2)</a>
      </div>
    </div>
    <div>
      <div class="card">
        <h3>Tu camino</h3>
        <p class="mini tenue">Cinco pilares. Avanzas a tu ritmo.</p>
        <div class="pilares">
          ${PILARES.map(([n,,v])=>`<div class="fila"><span class="mini">${n}</span><span class="barra"><i style="width:${v}%"></i></span></div>`).join("")}
        </div>
        <a class="btn texto" href="#/camino">Explorar</a>
      </div>
      <div class="card">
        <h3>Hacer ahora</h3>
        <div class="accesos">
          <a href="#/diario/nueva">Escribir</a>
          <a href="#/laboratorio">Practicar</a>
          <a href="#/biblioteca">Escuchar</a>
        </div>
      </div>
      <p class="mini tenue">Puedes ir a tu ritmo. Estas herramientas acompañan lo que trabajas en sesión.</p>
    </div>
  </div>`);
}

function pCamino(){
  const p = estado.participante;
  return shell("camino", `
    <div class="enc"><h1>Mi Camino</h1>
      <p class="tenue">${p.plan} · 90 días · ${p.total} sesiones</p></div>
    ${PILARES.map(([n,d])=>`<div class="card"><h3>${n}</h3><p class="tenue mini">${d}</p>
      <p class="mini">2 de 3 materiales revisados</p>
      <a class="btn sec" href="#/biblioteca">Explorar recursos</a></div>`).join("")}
    <p class="mini tenue">Los pilares son territorios del método, no fases obligatorias.</p>`);
}

function pSesiones(){
  return shell("sesiones", `
    <div class="enc"><h1>Mis sesiones</h1></div>
    <div class="card destacada">
      <span class="etq rosa">Próxima</span>
      <h3 style="margin:8px 0 2px">Martes 9 de marzo · 5:00 p. m.</h3>
      <p class="mini tenue">Hora de El Salvador · Confirmada</p>
      <a class="btn" href="#">Entrar a la sesión</a>
      <a class="btn texto" onclick="alert('El enlace de la videollamada aparece aquí poco antes de la sesión. La reunión no ocurre dentro de la app.')">¿Cómo entro?</a>
    </div>
    <div class="card">
      <h3>Preparar mi sesión</h3>
      <p class="mini tenue">Solo tú. Llévalo a la sesión o déjate una nota.</p>
      <label>Algo que quiero conversar <span class="op">(opcional)</span></label>
      <textarea placeholder="Escribe aquí..."></textarea>
      <a class="btn sec" onclick="alert('Guardado solo para ti (demostración).')">Guardar para mí</a>
    </div>
    <div class="card">
      <h3>¿Necesitas cambiarla?</h3>
      <p class="mini tenue">Tu sesión sigue igual hasta que Diana lo confirme.</p>
      <a class="btn sec" onclick="alert('Se abriría el canal acordado con Diana. La regla exacta de cambios está pendiente de definir.')">Solicitar cambio</a>
    </div>`);
}

// ---- Diario (modelo B: visible para Diana, avisado) ----
function pDiario(){
  return shell("diario", `
    <div class="enc"><h1>Mi Diario</h1></div>
    <div class="card suave">
      <strong>Un espacio confidencial entre tú y Diana.</strong>
      <p class="mini" style="margin:.4rem 0 0">Diana puede leer tu diario como parte de tu acompañamiento. No lo ve nadie más del equipo.</p>
    </div>
    <a class="btn bloque" href="#/diario/nueva">Nueva reflexión</a>
    <div class="card" style="margin-top:14px">
      ${estado.diario.map(e=>`<a class="entrada" href="#/diario/${e.id}">
        <span><strong>${esc(e.titulo||"Reflexión")}</strong><br><span class="mini tenue">${e.fecha} · ${esc(e.emocion)}</span></span>
        ${e.sesion?'<span class="etq">En sesión</span>':''}
      </a>`).join("")}
    </div>`);
}

function pDiarioNueva(){
  return shell("diario", `
    <div class="enc"><a class="btn texto" href="#/diario">← Volver</a><h1>Nueva reflexión</h1>
      <p class="mini tenue">Confidencial con Diana. Todo es opcional.</p></div>
    <form onsubmit="guardarEntrada(event)">
      <label>¿Qué pasó? <span class="op">(opcional)</span></label>
      <textarea name="texto" placeholder="Escribe lo que quieras..."></textarea>
      <label>¿Qué sentiste? <span class="op">(opcional)</span></label>
      <div class="chips" id="emos">${EMOCIONES.map(e=>`<button type="button" class="chip" aria-pressed="false" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')">${e}</button>`).join("")}</div>
      <label>Ponle un título <span class="op">(opcional)</span></label>
      <input type="text" name="titulo" placeholder="Opcional">
      <label style="display:flex;gap:10px;align-items:center;font-weight:400">
        <input type="checkbox" name="sesion" style="width:auto"> Quiero hablar de esto en mi sesión</label>
      <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn" type="submit">Guardar</button>
        <a class="btn sec" href="#/diario">Descartar</a>
      </div>
    </form>`);
}

function guardarEntrada(ev){
  ev.preventDefault();
  const f = ev.target;
  const emo = [...f.querySelectorAll('.chip[aria-pressed="true"]')].map(c=>c.textContent)[0] || "—";
  estado.diario.unshift({ id: estado.nid++, fecha:"Ahora", titulo:f.titulo.value.trim(),
    emocion:emo, texto:f.texto.value.trim(), sesion:f.sesion.checked });
  alert("Guardado. (Demostración: no se conserva al recargar.)");
  go("#/diario");
}

function pEntrada(id){
  const e = estado.diario.find(x=>x.id==id);
  if(!e) return shell("diario",'<p>No encontramos esta reflexión.</p>');
  return shell("diario", `
    <div class="enc"><a class="btn texto" href="#/diario">← Volver</a>
      <h1>${esc(e.titulo||"Reflexión")}</h1>
      <p class="mini tenue">${e.fecha} · ${esc(e.emocion)} · Confidencial con Diana</p></div>
    <div class="card"><p>${esc(e.texto)||'<span class="tenue">(sin texto)</span>'}</p></div>
    ${e.sesion?'<p class="mini"><span class="etq">En sesión</span> La llevas a tu próxima sesión.</p>':''}
    <a class="btn sec" onclick="alert('Editar / eliminar (demostración).')">Editar</a>`);
}

// ---- Laboratorio ----
function pLab(){
  return shell("laboratorio", `
    <div class="enc"><h1>Laboratorio de Límites</h1>
      <p class="tenue">Practicar también es aprender.</p></div>
    <span class="rotulo">Ejemplo pendiente de aprobación</span>
    <div class="card" style="margin-top:8px"><h3>Trabajo</h3>
      <p class="mini tenue">Cuando te piden quedarte y ya tenías planes.</p>
      <a class="btn sec" href="#/laboratorio/1">Practicar</a></div>
    <div class="card"><h3>Amistades</h3>
      <p class="mini tenue">Cuando te piden un favor y realmente no puedes.</p>
      <a class="btn sec" onclick="alert('Segunda práctica de demostración.')">Practicar</a></div>
    <div class="card" style="opacity:.6"><h3>Familia · Pareja</h3><p class="mini tenue">Próximamente</p></div>
    <p class="mini"><a href="#/ayuda">Esta situación no se siente segura</a></p>`);
}

function pPractica(){
  return shell("laboratorio", `
    <div class="enc"><a class="btn texto" href="#/laboratorio">← Volver</a>
      <h1>Cuando te piden quedarte</h1></div>
    <div class="aviso-seg mini">Esta práctica es educativa. Si en tu caso poner un límite podría ponerte en riesgo, no la uses como guía. <a href="#/ayuda">Esta situación no se siente segura</a></div>
    <div class="card" style="margin-top:12px">
      <p>Es viernes y ya terminaste. Una compañera te pide que te quedes a ayudarle. Ya tenías planes y estás cansada.</p>
      <p><em>«¿Te puedes quedar un rato? Es que tú siempre me ayudas.»</em></p>
    </div>
    <p class="mini tenue">Ninguna respuesta es la correcta. Elige una para ver qué comunica.</p>
    ${[
      ["«Sí, claro, no hay problema.»","¿Lo elegiste, o se sintió como la única opción?"],
      ["«Hoy no puedo. El lunes lo vemos a primera hora.»","Un límite con una alternativa. ¿El lunes sí puedes ofrecerlo?"],
      ["«Déjame revisar y te digo en diez minutos.»","Te da espacio para pensar."],
    ].map(([o,r])=>`<div class="card"><strong>${o}</strong><p class="mini tenue" style="margin:.3rem 0 0">${r}</p></div>`).join("")}
    <div class="card suave"><p class="mini">No todas las respuestas son seguras ni adecuadas para todas las situaciones.</p>
      <a class="btn sec" onclick="alert('Guardado solo para ti (demostración).')">Guardar para mí</a>
      <a class="btn texto" href="#/laboratorio">Salir sin guardar</a></div>`);
}

function pBiblioteca(){
  return shell("biblioteca", `
    <div class="enc"><h1>Biblioteca</h1></div>
    <span class="rotulo">Ejemplos pendientes de aprobación</span>
    <div style="margin-top:8px">${RECURSOS.map(([t,d])=>`<div class="card"><h3>${t}</h3>
      <p class="mini tenue">${d}</p><a class="btn sec" onclick="alert('Reproducir / descargar (demostración).')">Abrir</a></div>`).join("")}</div>`);
}

function pPerfil(){
  return shell("perfil", `
    <div class="enc"><h1>Perfil y privacidad</h1></div>
    <div class="card"><h3>Mi cuenta</h3>
      <p class="mini tenue">${window.MiAuth && window.MiAuth.user ? esc(window.MiAuth.user.email) : "Sesión iniciada."}</p>
      <button class="btn sec" onclick="cerrarSesion()">Cerrar sesión</button></div>
    <div class="card"><h3>Mis datos</h3><p class="mini tenue">Nombre preferido, zona horaria y recordatorios.</p></div>
    <div class="card"><h3>Tu diario</h3>
      <p class="mini">Es un espacio confidencial con Diana: ella puede leerlo como parte de tu acompañamiento. No lo ve nadie más del equipo.</p></div>
    <div class="card"><h3>Seguridad</h3><p class="mini tenue">Contraseña, dispositivos y cerrar sesión en todos.</p></div>
    <div class="card"><h3>Mis datos y consentimientos</h3><p class="mini tenue">Solicitar copia o eliminación.</p></div>
    <hr class="sep">
    <a class="btn sec bloque" href="#/panel"><span class="rotulo">Solo demostración</span> &nbsp; Ver el panel de Diana →</a>
    <p class="mini tenue" style="text-align:center;margin-top:8px">En la app real, el panel tiene acceso y contraseña propios.</p>`);
}

function pAyuda(){
  return shell("ayuda", `
    <div class="enc"><h1>Ayuda y seguridad</h1></div>
    <div class="card suave"><strong>Si estás en peligro inmediato</strong>
      <p class="mini">Esta plataforma no atiende emergencias ni responde en tiempo real. Contacta los servicios de emergencia de tu localidad.</p>
      <p class="mini rotulo">Recursos de El Salvador: pendientes de confirmar con Diana</p></div>
    <div class="card"><h3>Qué es y qué no es</h3>
      <p class="mini tenue">Mi Espacio acompaña tu proceso. No sustituye tus sesiones ni es un canal de urgencias.</p></div>
    <div class="card"><h3>Salir rápido</h3>
      <p class="mini tenue">El botón «Salir rápido» cierra la vista, pero no borra el historial de tu navegador.</p></div>
    <div class="card"><h3>Contacto administrativo</h3><p class="mini tenue">Horario de atención (pendiente).</p></div>`);
}

// ---- Onboarding ----
const OB = [
  ["assets/onboarding-01-espacio.webp","Tu espacio para volver a ti","Aquí encuentras tus sesiones, tus ejercicios y tus recursos en un solo lugar."],
  ["assets/onboarding-02-emociones.webp","Comprenderte también es avanzar","Puedes escribir cuando te resulte útil. No es obligatorio y no hay una forma correcta."],
  ["assets/onboarding-03-proceso.webp","Cada paso tiene su propio valor","Avanza a tu ritmo. Aquí no hay calificaciones ni comparaciones."],
];
function pOnboarding(paso){
  paso = +paso || 1;
  const puntos = n => `<div class="ob-puntos">${[1,2,3,4].map(i=>`<span class="${i<=n?'on':''}"></span>`).join("")}</div>`;
  if(paso<=3){
    const [img,t,d] = OB[paso-1];
    return `<div class="ob">
      <div class="ob-img"><img src="${img}" alt=""></div>
      <div class="ob-cont"><h1>${t}</h1><p>${d}</p>${puntos(paso)}</div>
      <div class="ob-acc">
        <button class="btn texto" onclick="go('#/bienvenida/4')">Saltar</button>
        <button class="btn" onclick="go('#/bienvenida/${paso+1}')">Siguiente</button>
      </div></div>`;
  }
  return `<div class="ob">
    <div class="ob-cont" style="overflow:auto">
      <h1>Tu privacidad, en claro</h1>
      <ul class="lista-priv">
        <li>📔 Tu diario es un espacio confidencial con Diana. Ella puede leerlo como parte de tu acompañamiento; no lo ve nadie más del equipo.</li>
        <li>🗓️ Diana ve tus sesiones y los ejercicios que te asigna, con su estado.</li>
        <li>🔒 Tú decides qué prácticas guardas y qué llevas a sesión.</li>
      </ul>
      <div class="aviso-seg mini">Esta app no atiende urgencias y nadie la vigila en tiempo real. <a href="#/ayuda">Ver ayuda</a></div>
      ${puntos(4)}
    </div>
    <div class="ob-acc" style="justify-content:flex-end">
      <button class="btn" onclick="estado.obVisto=true;go('#/inicio')">Entrar a Mi Espacio</button>
    </div></div>`;
}

// ================= PANEL DE DIANA =================
const PARTICIPANTES = [
  { id:1, nombre:"Lucía", plan:"Premium", estado:"Activa", sesion:"9 mar · 5:00 p. m.", pend:"1 ejercicio por asignar" },
  { id:2, nombre:"Marta", plan:"Esencial", estado:"Activa", sesion:"11 mar · 10:00 a. m.", pend:"—" },
  { id:3, nombre:"Rocío", plan:"Élite", estado:"En pausa", sesion:"—", pend:"Reanudación acordada" },
];
const PANELNAV = [
  ["panel","Resumen"],["panel/participantes","Participantes"],["panel/agenda","Agenda"],
  ["panel/asignaciones","Asignaciones"],["panel/recursos","Recursos"],["panel/seguridad","Seguridad"],
];

function panelShell(sub, cont){
  const act = r => (("panel/"+r)===sub || (r==="panel"&&sub==="panel")) ? "activo":"";
  const item = ([r,t]) => `<a href="#/${r}" class="${sub===r?'activo':''}">${t}</a>`;
  return `
  <div class="app">
    <header class="panel-head">
      <div class="marca"><img src="assets/icono-mi-espacio.webp" alt="">Panel · Diana Ayala</div>
      <a class="salida" href="#/perfil">Salir del panel (demo)</a>
    </header>
    <div class="cuerpo">
      <aside class="lateral"><nav>
        ${PANELNAV.map(item).join("")}
      </nav></aside>
      <main class="principal" id="main" tabindex="-1">${cont}</main>
    </div>
  </div>`;
}

function panResumen(){
  return panelShell("panel", `
    <div class="enc"><h1>Resumen</h1><p class="tenue">Martes 23 de noviembre</p></div>
    <div class="card destacada">
      <span class="etq rosa">Hoy</span>
      <h3 style="margin:8px 0 2px">5:00 p. m. · Lucía (ficticia)</h3>
      <a class="btn sec" href="#/panel/ficha/1">Abrir ficha</a>
    </div>
    <div class="card"><h3>Por resolver</h3>
      <ul class="mini"><li>1 ejercicio por asignar a Lucía</li><li>1 enlace de sesión sin registrar</li><li>Reanudación de Rocío por confirmar</li></ul>
    </div>
    <div class="card"><h3>Actividad</h3>
      <p class="mini tenue">3 participantes · 2 sesiones esta semana. Sin interpretaciones sobre su estado emocional.</p></div>`);
}

function panParticipantes(){
  return panelShell("panel/participantes", `
    <div class="enc"><h1>Participantes</h1></div>
    <div class="card" style="overflow:auto">
      <table class="tabla"><thead><tr><th>Nombre</th><th>Plan</th><th>Estado</th><th>Próxima</th><th>Pendiente</th><th></th></tr></thead>
      <tbody>${PARTICIPANTES.map(p=>`<tr>
        <td><strong>${p.nombre}</strong></td><td>${p.plan}</td>
        <td><span class="pill ${p.estado==='En pausa'?'pausa':''}">${p.estado}</span></td>
        <td>${p.sesion}</td><td class="mini tenue">${p.pend}</td>
        <td><a class="btn texto" href="#/panel/ficha/${p.id}">Abrir</a></td></tr>`).join("")}</tbody></table>
    </div>
    <a class="btn sec" onclick="alert('Crear participante: nombre, correo, plan e invitación (demostración).')">Nueva participante</a>`);
}

function panFicha(id, tab){
  const p = PARTICIPANTES.find(x=>x.id==id) || PARTICIPANTES[0];
  tab = tab || "resumen";
  const tabs = [["resumen","Resumen"],["sesiones","Sesiones"],["ejercicios","Ejercicios"],
    ["diario","Diario"],["notas","Notas"],["permisos","Permisos"]];
  let c = "";
  if(tab==="resumen") c = `<div class="card"><p><strong>Plan:</strong> ${p.plan} · 90 días</p>
    <p><strong>Estado:</strong> ${p.estado}</p><p><strong>Sesiones:</strong> 3 de 10 realizadas</p>
    <p class="mini tenue">Objetivos acordados en sesión. Esta ficha no es la historia clínica.</p></div>`;
  else if(tab==="sesiones") c = `<div class="card"><p>Próxima: ${p.sesion}</p><p class="mini tenue">Historial administrativo de asistencia. Sin notas de sesión aquí.</p>
    <a class="btn sec" onclick="alert('Registrar o reprogramar (demostración).')">Registrar sesión</a></div>`;
  else if(tab==="ejercicios") c = `<div class="card"><p>Reconocer lo que necesito — <span class="pill">Pendiente</span></p>
    <p class="mini tenue">Ves el estado; las respuestas privadas no, salvo que sea una entrega.</p>
    <a class="btn sec" href="#/panel/asignaciones">Asignar ejercicio</a></div>`;
  else if(tab==="diario") c = `
    <div class="aviso-calido"><strong>Acércate con calidez.</strong> Puedes leer su diario como parte del acompañamiento. Evita confrontarla con lo que leíste («¿cómo estás?», no «vi que escribiste…»). Ella no recibe aviso de que lo abriste.</div>
    <div class="card">${estado.diario.map(e=>`<div style="padding:10px 0;border-bottom:1px solid var(--linea)">
      <strong>${esc(e.titulo||"Reflexión")}</strong> <span class="mini tenue">· ${e.fecha} · ${esc(e.emocion)}</span>
      ${e.sesion?' <span class="pill">Quiere hablarlo en sesión</span>':''}
      <p class="mini">${esc(e.texto)}</p></div>`).join("")}</div>`;
  else if(tab==="notas") c = `<div class="card"><h3>Nota profesional</h3>
    <p class="mini tenue">Privada, solo tú. Para datos reales deberá ir cifrada y auditada; no es una historia clínica validada.</p>
    <textarea placeholder="Comentario de seguimiento..."></textarea>
    <a class="btn sec" onclick="alert('Nota guardada (demostración).')">Guardar nota</a></div>
    <div class="card"><h3>Seguimiento</h3><p class="mini">12 nov · Asignó «Reconocer lo que necesito» tras la sesión 2. Revisión en sesión 4.</p></div>`;
  else c = `<div class="card"><p class="mini">Qué puede ver y desde cuándo. El diario es confidencial contigo (la participante lo aceptó en el onboarding). Administración técnica y analítica: sin acceso.</p></div>`;
  return panelShell("panel/participantes", `
    <div class="enc"><a class="btn texto" href="#/panel/participantes">← Participantes</a>
      <h1>${p.nombre} <span class="mini tenue">(ficticia)</span></h1></div>
    <div class="tabs">${tabs.map(([k,t])=>`<a href="#/panel/ficha/${id}/${k}" class="${tab===k?'activo':''}">${t}</a>`).join("")}</div>
    ${c}`);
}

function panAgenda(){
  return panelShell("panel/agenda", `
    <div class="enc"><h1>Agenda</h1></div>
    <div class="card"><p class="mini tenue">Comprueba también tu agenda principal: la videollamada se coordina y se realiza fuera de la app.</p>
      <table class="tabla"><tbody>
      <tr><td>Lun 8</td><td>—</td></tr>
      <tr><td>Mar 9</td><td>5:00 p. m. · Lucía</td></tr>
      <tr><td>Jue 11</td><td>10:00 a. m. · Marta</td></tr></tbody></table></div>`);
}

function panAsignaciones(){
  return panelShell("panel/asignaciones", `
    <div class="enc"><h1>Asignaciones</h1></div>
    <div class="card">
      <label>Plantilla aprobada</label>
      <select><option>Reconocer lo que necesito</option><option>Identificar mis límites</option></select>
      <label>Participante</label>
      <select>${PARTICIPANTES.map(p=>`<option>${p.nombre}</option>`).join("")}</select>
      <label>Visibilidad</label>
      <select><option>Uso privado (ves solo el estado)</option><option>Con entrega (ves sus respuestas)</option></select>
      <a class="btn" onclick="alert('Vista previa como la verá ella, y asignar (demostración).')">Revisar y asignar</a>
    </div>`);
}

function panRecursos(){
  return panelShell("panel/recursos", `
    <div class="enc"><h1>Recursos</h1></div>
    <div class="card"><p>Volver a la calma — <span class="pill">Publicado</span></p></div>
    <div class="card"><p>La historia que se repite — <span class="pill pausa">Borrador</span></p>
      <p class="mini tenue">Enlace de video privado + transcripción antes de publicar.</p></div>
    <a class="btn sec" onclick="alert('Nuevo recurso: título, pilar, enlace o audio, transcripción (demostración).')">Nuevo recurso</a>`);
}

function panSeguridad(){
  return panelShell("panel/seguridad", `
    <div class="enc"><h1>Seguridad</h1></div>
    <div class="card"><p>Doble factor: <span class="pill">Obligatorio</span></p>
      <p class="mini tenue">Dispositivos, registro de aperturas y plantillas de consentimiento (maqueta).</p></div>`);
}

// ---------- LOGIN (Firebase Auth) ----------
function pantallaCarga(){
  return `<div style="min-height:70vh;display:grid;place-items:center;color:var(--tinta2)"><p>Cargando…</p></div>`;
}
function marcaLogin(){
  return `<div style="text-align:center;margin-bottom:18px"><img src="assets/icono-mi-espacio.webp" alt="" style="width:72px;margin:0 auto 8px"><h1>Mi Espacio</h1><p class="tenue">Tu espacio para volver a ti</p></div>`;
}
function pLogin(){
  return `<div class="ob"><div class="ob-cont">
    ${marcaLogin()}
    <form onsubmit="hacerLogin(event)">
      <label>Correo</label>
      <input type="email" name="email" autocomplete="username" required placeholder="tucorreo@ejemplo.com">
      <label>Contraseña</label>
      <input type="password" name="pwd" autocomplete="current-password" required>
      <p id="login-err" role="alert" style="color:var(--negro);background:var(--rosa35);border-radius:10px;margin:10px 0 0"></p>
      <button class="btn bloque" type="submit" style="margin-top:14px">Entrar</button>
    </form>
    <p class="mini" style="text-align:center;margin-top:12px"><a href="#/recuperar">¿Olvidaste tu contraseña?</a></p>
    <p class="mini" style="text-align:center">¿No tienes cuenta? <a href="#/registro">Crear una</a></p>
    <p class="mini tenue" style="text-align:center">En la versión real, el acceso será por invitación de Diana.</p>
    <p class="mini tenue" style="text-align:center">Versión de prueba con contenido de ejemplo.</p>
    <p class="mini" style="text-align:center"><a href="#/ayuda">Ayuda</a></p>
  </div></div>`;
}
function pRegistro(){
  return `<div class="ob"><div class="ob-cont">
    ${marcaLogin()}
    <h2 style="text-align:center">Crear cuenta</h2>
    <form onsubmit="hacerRegistro(event)">
      <label>Correo</label>
      <input type="email" name="email" autocomplete="username" required placeholder="tucorreo@ejemplo.com">
      <label>Contraseña <span class="op">(mínimo 6 caracteres)</span></label>
      <input type="password" name="pwd" autocomplete="new-password" minlength="6" required>
      <p id="reg-err" role="alert" style="color:var(--negro);background:var(--rosa35);border-radius:10px;margin:10px 0 0"></p>
      <button class="btn bloque" type="submit" style="margin-top:14px">Crear cuenta</button>
    </form>
    <p class="mini" style="text-align:center;margin-top:12px">¿Ya tienes cuenta? <a href="#/entrar">Entrar</a></p>
    <p class="mini tenue" style="text-align:center">En la versión real, el acceso será por invitación de Diana.</p>
  </div></div>`;
}
async function hacerRegistro(ev){
  ev.preventDefault();
  const f=ev.target, err=document.getElementById("reg-err");
  err.style.padding="0"; err.textContent="";
  const btn=f.querySelector("button"); btn.disabled=true;
  try{
    await window.MiAuth.signUp(f.email.value.trim(), f.pwd.value);
  }catch(e){
    err.style.padding="8px 10px";
    err.textContent = e.code==="auth/email-already-in-use" ? "Ya existe una cuenta con ese correo."
      : e.code==="auth/weak-password" ? "La contraseña debe tener al menos 6 caracteres."
      : e.code==="auth/invalid-email" ? "Ese correo no es válido."
      : e.code==="auth/unauthorized-domain" ? "Este dominio aún no está autorizado en Firebase."
      : e.code==="auth/network-request-failed" ? "Sin conexión con el servidor."
      : "No se pudo crear la cuenta.";
    console.warn("registro:", e.code, e.message);
    btn.disabled=false;
  }
}
function pRecuperar(){
  return `<div class="ob"><div class="ob-cont">
    ${marcaLogin()}
    <h2 style="text-align:center">Recuperar acceso</h2>
    <form onsubmit="enviarReset(event)">
      <label>Correo</label>
      <input type="email" name="email" required placeholder="tucorreo@ejemplo.com">
      <p id="reset-msg" role="status" class="mini" style="margin-top:8px"></p>
      <button class="btn bloque" type="submit" style="margin-top:12px">Enviar enlace</button>
    </form>
    <p class="mini" style="text-align:center;margin-top:12px"><a href="#/entrar">Volver a entrar</a></p>
  </div></div>`;
}
async function hacerLogin(ev){
  ev.preventDefault();
  const f=ev.target, err=document.getElementById("login-err");
  err.style.padding="0"; err.textContent="";
  const btn=f.querySelector("button"); btn.disabled=true;
  try{
    await window.MiAuth.signIn(f.email.value.trim(), f.pwd.value);
  }catch(e){
    const cred=["auth/invalid-credential","auth/wrong-password","auth/user-not-found","auth/invalid-email"];
    err.style.padding="8px 10px";
    err.textContent = cred.includes(e.code) ? "El correo o la contraseña no coinciden."
      : e.code==="auth/too-many-requests" ? "Demasiados intentos. Espera un momento."
      : e.code==="auth/unauthorized-domain" ? "Este dominio aún no está autorizado en Firebase."
      : e.code==="auth/network-request-failed" ? "Sin conexión con el servidor."
      : "No se pudo iniciar sesión.";
    console.warn("login:", e.code, e.message);
    btn.disabled=false;
  }
}
async function enviarReset(ev){
  ev.preventDefault();
  const f=ev.target, m=document.getElementById("reset-msg");
  try{ await window.MiAuth.reset(f.email.value.trim()); }catch(e){ console.warn("reset:", e.code); }
  m.textContent="Si existe una cuenta con ese correo, recibirás un enlace.";
}
async function cerrarSesion(){
  try{ await window.MiAuth.signOut(); }catch(e){}
  estado.obVisto=false; location.hash="#/entrar";
}

// ---------- ROUTER ----------
const PUBLICOS = ["entrar","registro","recuperar","ayuda"];
let cargaAviso=false;
function render(){
  const A = window.MiAuth;
  const h = (location.hash || "").replace(/^#\//,"");
  const [sec, a, b, c] = h.split("/");
  if(!A || !A.ready){ document.getElementById("root").innerHTML = pantallaCarga(); return; }
  if(!A.user && !PUBLICOS.includes(sec)){ location.hash="#/entrar"; return; }
  if(A.user && (sec==="" || sec==="entrar")){ location.hash = estado.obVisto ? "#/inicio" : "#/bienvenida/1"; return; }
  let html;
  // Panel de Diana: vista separada, no exige onboarding de participante.
  if(sec==="panel"){
    switch(a){
      case undefined: case "": html = panResumen(); break;
      case "participantes": html = panParticipantes(); break;
      case "ficha": html = panFicha(b, c); break;
      case "agenda": html = panAgenda(); break;
      case "asignaciones": html = panAsignaciones(); break;
      case "recursos": html = panRecursos(); break;
      case "seguridad": html = panSeguridad(); break;
      default: html = panResumen();
    }
    document.getElementById("root").innerHTML = html;
    const mm = document.getElementById("main"); if(mm) mm.focus({preventScroll:true});
    window.scrollTo(0,0); return;
  }
  if(A.user && !estado.obVisto && sec!=="bienvenida" && !PUBLICOS.includes(sec)){ location.hash="#/bienvenida/1"; return; }
  switch(sec){
    case "entrar": html = pLogin(); break;
    case "registro": html = pRegistro(); break;
    case "recuperar": html = pRecuperar(); break;
    case "bienvenida": html = pOnboarding(a); break;
    case "inicio": html = pInicio(); break;
    case "camino": html = pCamino(); break;
    case "sesiones": html = pSesiones(); break;
    case "diario":
      html = a==="nueva" ? pDiarioNueva() : a ? pEntrada(a) : pDiario(); break;
    case "laboratorio": html = a ? pPractica() : pLab(); break;
    case "biblioteca": html = pBiblioteca(); break;
    case "perfil": html = pPerfil(); break;
    case "ayuda": html = pAyuda(); break;
    default: html = A.user ? pInicio() : pLogin();
  }
  document.getElementById("root").innerHTML = html;
  const m = document.getElementById("main"); if(m) m.focus({preventScroll:true});
  window.scrollTo(0,0);
}
window.__authChanged = render;
window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", ()=>{
  render();
  setTimeout(()=>{ if((!window.MiAuth || !window.MiAuth.ready) && !cargaAviso){ cargaAviso=true;
    document.getElementById("root").innerHTML = '<div style="min-height:70vh;display:grid;place-items:center;text-align:center;color:#555;padding:20px"><div><p>No se pudo cargar el inicio de sesión.</p><p class="mini">Revisa tu conexión o la configuración de Firebase.</p></div></div>'; } }, 8000);
});
