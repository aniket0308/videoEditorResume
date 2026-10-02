(function(){
const D = window.PORTFOLIO, $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const grads = [['#5B5BF5','#8B7BFF'],['#FF8A5B','#FFB36B'],['#2FC4A8','#5B9BF5'],['#8B5BF5','#FF8A9B']];

/* Turn any video link into an embeddable player */
function player(url){
  if(!url) return '<div class="empty" style="display:grid;place-items:center;height:100%;color:#fff">Video coming soon</div>';
  let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if(m) return `<iframe src="https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0" allow="autoplay;fullscreen" allowfullscreen></iframe>`;
  m = url.match(/vimeo\.com\/(\d+)/);
  if(m) return `<iframe src="https://player.vimeo.com/video/${m[1]}?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>`;
  m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if(m) return `<iframe src="https://drive.google.com/file/d/${m[1]}/preview" allow="autoplay;fullscreen" allowfullscreen></iframe>`;
  return `<video src="${esc(url)}" controls autoplay playsinline></video>`;
}
function ytThumb(url){const m=(url||'').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);return m?`https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`:'';}
const thumbHTML = (img,i,extra='') => `<div class="thumb" style="--g1:${grads[i%4][0]};--g2:${grads[i%4][1]}">${img?`<img src="${esc(img)}" alt="" loading="lazy">`:''}${extra}</div>`;

/* Basic info */
document.title = `${D.name} | ${D.role}`;
$('logo').textContent = D.name;
$('role').textContent = D.role;
$('tagline').textContent = D.tagline;
$('about').textContent = D.about;
$('foot').textContent = `© ${new Date().getFullYear()} ${D.name}. All rights reserved.`;
$('loc').textContent = D.location;
$('stats').innerHTML = (D.stats||[]).map(s=>`<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join('');

/* Showreel */
const media = $('reelMedia'), reel = D.showreel;
const reelImg = ytThumb(reel) || D.photo;
media.innerHTML = (reelImg?`<img src="${esc(reelImg)}" alt="">`:'') + (reel?'<div class="play"><span>&#9654;</span></div>':'');
$('reelFrame').addEventListener('click',()=>{ if(reel) media.innerHTML = player(reel); });

/* Fake timecode */
let f=0; setInterval(()=>{f++;const p=n=>String(n).padStart(2,'0');$('tc').textContent=`00:00:${p(Math.floor(f/24)%60)}:${p(f%24)}`},42);

/* Projects + filters */
const cats = ['All', ...new Set(D.projects.map(p=>p.category).filter(Boolean))];
function drawProjects(cat){
  const list = D.projects.map((p,i)=>({p,i})).filter(x=>cat==='All'||x.p.category===cat);
  $('projects').innerHTML = list.map(({p,i})=>`
    <button class="card" data-i="${i}">
      ${thumbHTML(p.thumbnail||ytThumb(p.video),i,`${p.video?'<div class="play"><span>&#9654;</span></div>':''}<span class="badge">${esc(p.category)}</span>`)}
      <div class="card-body"><h3>${esc(p.title)}</h3><p>${esc(p.year)}${p.client?' · '+esc(p.client):''}</p></div>
    </button>`).join('') || '<p class="empty">No projects yet.</p>';
}
$('filters').innerHTML = cats.length>2 ? cats.map((c,i)=>`<button class="chip${i?'':' on'}">${esc(c)}</button>`).join('') : '';
$('filters').addEventListener('click',e=>{
  if(!e.target.classList.contains('chip')) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));
  e.target.classList.add('on'); drawProjects(e.target.textContent);
});
drawProjects('All');

/* Modal */
const modal=$('modal'), body=$('modalBody');
function open(html){body.innerHTML=html;modal.hidden=false;document.body.style.overflow='hidden';}
function shut(){modal.hidden=true;body.innerHTML='';document.body.style.overflow='';}
$('close').onclick=shut;
modal.addEventListener('click',e=>{if(e.target===modal)shut()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')shut()});

$('projects').addEventListener('click',e=>{
  const c=e.target.closest('.card'); if(!c) return;
  const p=D.projects[c.dataset.i];
  open(`<div class="player">${player(p.video)}</div>
    <h3>${esc(p.title)}</h3>
    <div class="meta"><span>${esc(p.category)}</span><span>${esc(p.year)}</span>${p.client?`<span>Client: ${esc(p.client)}</span>`:''}${p.role?`<span>${esc(p.role)}</span>`:''}</div>
    <p class="lead" style="margin:.5rem 0">${esc(p.description)}</p>
    <div class="meta">${(p.tools||[]).map(t=>`<span>${esc(t)}</span>`).join('')}</div>
    ${(p.screenshots||[]).length?`<div class="shots">${p.screenshots.map(s=>`<a href="${esc(s)}" target="_blank" rel="noopener"><img src="${esc(s)}" alt="Screenshot of ${esc(p.title)}" loading="lazy"></a>`).join('')}</div>`:''}`);
});

/* Reviews */
$('reviewList').innerHTML = D.reviews.map((r,i)=> r.type==='video'
  ? `<div class="vcard"><div class="thumb" data-v="${i}" style="--g1:${grads[i%4][0]};--g2:${grads[i%4][1]}">${(r.poster||ytThumb(r.video))?`<img src="${esc(r.poster||ytThumb(r.video))}" alt="" loading="lazy">`:''}<div class="play"><span>&#9654;</span></div></div><div class="who"><b>${esc(r.name)}</b><span>${esc(r.company)}</span></div></div>`
  : `<figure class="quote"><q>${esc(r.quote)}</q><figcaption class="who"><b>${esc(r.name)}</b><span>${esc(r.company)}</span></figcaption></figure>`).join('');
$('reviewList').addEventListener('click',e=>{
  const t=e.target.closest('[data-v]'); if(!t) return;
  open(`<div class="player">${player(D.reviews[t.dataset.v].video)}</div>`);
});

/* Resume */
const tl = a => a.map(x=>`<li><small>${esc(x.period)}</small><b>${esc(x.title)}</b><span>${esc(x.place)}</span>${x.detail?`<p>${esc(x.detail)}</p>`:''}</li>`).join('');
$('exp').innerHTML = tl(D.experience); $('edu').innerHTML = tl(D.education);
$('tools').innerHTML = D.tools.map(t=>`<div class="tool"><div><span>${esc(t.name)}</span><span>${+t.level}%</span></div><div class="bar"><i style="width:${+t.level}%"></i></div></div>`).join('');
if(D.resumePDF){const a=$('pdf');a.href=D.resumePDF;a.hidden=false;}

/* Contact */
const wa = (D.phone||'').replace(/\D/g,'');
$('contactBtns').innerHTML = `<a class="btn" href="mailto:${esc(D.email)}">${esc(D.email)}</a>`
  + (wa?`<a class="btn ghost" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>`:'')
  + (D.social||[]).map(s=>`<a class="btn ghost" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('');

/* Mobile menu */
const burger=$('burger'), menu=$('menu');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.addEventListener('click',e=>{if(e.target.tagName==='A')menu.classList.remove('open')});
})();
