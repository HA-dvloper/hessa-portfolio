/* Hessa Albinali — project gallery rendering and page navigation. */
const esc=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image=(src,alt,klass='')=>`<img class="${klass}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.hidden=true;this.closest('.project-image,.gallery-frame,.portrait')?.classList.add('missing-image')">`;
const grid=document.querySelector('#projects');
if(grid){grid.innerHTML=PROJECTS.map(p=>{
 const lead=p.images?.[0]?.[0];
 return `<a class="project" href="project.html?slug=${encodeURIComponent(p.slug)}"><div class="project-image">${lead?image(lead,p.title):''}<div class="no-image" aria-hidden="true">${esc(p.title)}</div></div><div class="project-kicker">${esc(p.type)}</div><h3>${esc(p.title)}</h3><span class="project-link">VIEW PROJECT ↗</span></a>`;
}).join('');}
const view=document.querySelector('#case');
if(view){
 const slug=new URLSearchParams(location.search).get('slug');
 const p=PROJECTS.find(v=>v.slug===slug);
 if(!p){view.innerHTML='<section class="case-content"><h2>Project not found.</h2><a class="back" href="index.html#work">← BACK TO WORK</a></section>';}
 else{
 document.title=p.title+' | Hessa Albinali';
 const gallery=(p.images||[]).map(([src,caption],i)=>`<figure><div class="gallery-frame">${image(src,caption)}<div class="gallery-fallback">Original project artwork will appear here when uploaded.</div></div><figcaption>${String(i+1).padStart(2,'0')} / ${esc(caption)} — Concept render</figcaption></figure>`).join('');
 view.innerHTML=`<section class="case-head"><span class="eyebrow">HESSA ALBINALI / SELECTED WORK</span><h1>${esc(p.title)}</h1><p>${esc(p.summary)}</p><span class="concept">CREATIVE CONCEPT / PROPOSED PROJECT</span></section><section class="case-content"><span class="eyebrow">01 / CREATIVE CONCEPT</span><h2>Beyond the ordinary.</h2><p>${esc(p.concept)}</p><div class="case-gallery-heading"><span class="eyebrow">02 / SELECTED DESIGNS</span><h2>Project Gallery</h2></div><div class="gallery">${gallery||'<p>Original project visuals pending import.</p>'}</div><a class="back" href="index.html#work">← BACK TO ALL PROJECTS</a></section>`;
 }
}
document.querySelectorAll('.portrait img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.parentElement.classList.add('missing-image')}));
