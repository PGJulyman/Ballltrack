const current = location.pathname.split('/').pop()?.replace(/\.html$/, '') || 'index';
const route = { form: ['01','wireless'], wireless: ['02','control'], project: ['03','form'], control: ['04','project'] };
const languages = [['en','English'], ['fr','Français'], ['it','Italiano']];
const palette = [['cyan','#7ee5f6'], ['yellow','#f4d66c'], ['green','#00c896']];
const wordmark = 'Ba<span class="triple">lll</span>track';
const arrow = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
const backArrow = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M20 12H4m7-7-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
function readPreference(storage, key, fallback) { try { return window[storage].getItem(key) || fallback; } catch { return fallback; } }
function savePreference(storage, key, value) { try { window[storage].setItem(key, value); } catch {} }
function resolveLanguage() {
  const query = new URLSearchParams(location.search).get('lang');
  const chosen = query ?? readPreference('localStorage','balll-language','en');
  return Object.hasOwn(translations, chosen) ? chosen : 'en';
}
let language = resolveLanguage();
let t = translations[language];
let selected = readPreference('sessionStorage','balll-color','cyan');
function href(name='') { return `./${name ? name+'.html' : ''}?lang=${language}`; }
function controls() {
  return `<div class="color-control" aria-label="${t.lightLabel}"><span>${t.light}</span>${palette.map(([id,color],i)=>`<button type="button" class="swatch" data-color="${id}" style="--swatch:${color}" aria-label="${t.colourNames[i]} — ${t.colourLabel}" aria-pressed="${selected===id}"></button>`).join('')}</div>`;
}
function languageControl() {
  return `<div class="language-control"><select id="language" aria-label="${t.language}">${languages.map(([code,name])=>`<option value="${code}" lang="${code}" ${language===code?'selected':''}>${name}</option>`).join('')}</select><svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="m2 3 3 3 3-3" fill="none" stroke="currentColor"/></svg></div>`;
}
function device(interactive=false){
 const wrap=(name,path,label)=>interactive?`<a href="${href(name)}" aria-label="${label}"><path class="corner" d="${path}"/></a>`:`<path class="corner" d="${path}"/>`;
 return `<div class="device"><svg class="device-svg" viewBox="0 0 600 460" role="${interactive?'group':'img'}" aria-label="${t.deviceAlt}">
 <defs><linearGradient id="body" x1=".1" y1="0" x2=".9" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="#555758"/><stop offset=".2" stop-color="#303233"/><stop offset=".5" stop-color="#242627"/><stop offset="1" stop-color="#141617"/></linearGradient><linearGradient id="button" x1="0" x2=".7" y1="0" y2="1"><stop stop-color="#3a3c3d"/><stop offset=".55" stop-color="#27292a"/><stop offset="1" stop-color="#191b1c"/></linearGradient><radialGradient id="bulge" cx=".42" cy=".42" r=".6"><stop stop-color="#5d6061" stop-opacity=".38"/><stop offset="1" stop-color="#111415" stop-opacity="0"/></radialGradient><radialGradient id="sphere" cx=".29" cy=".22" r=".85"><stop stop-color="#ffffff" stop-opacity=".8"/><stop offset=".2" stop-color="#ffffff" stop-opacity=".15"/><stop offset=".5" stop-color="#00202b" stop-opacity=".25"/><stop offset=".9" stop-color="#001215" stop-opacity=".85"/><stop offset="1" stop-color="#000707" stop-opacity=".95"/></radialGradient><linearGradient id="rim" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#101213"/><stop offset=".5" stop-color="#080a0b"/><stop offset="1" stop-color="#686b6c"/></linearGradient><filter id="edge-soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation=".65"/></filter><filter id="ball-soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation=".4"/></filter><filter id="blur"><feGaussianBlur stdDeviation="13"/></filter><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".1"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter><clipPath id="shell"><path d="M300 52 C310 52 317 64 330 89 Q391 223 509 356 C527 379 514 397 487 394 Q300 358 113 394 C86 397 73 379 91 356 Q209 223 270 89 C283 64 290 52 300 52Z"/></clipPath></defs>
 <ellipse cx="300" cy="390" rx="200" ry="20" fill="#000" opacity=".6" filter="url(#blur)"/>
 <path d="M300 63 C310 63 317 75 330 100 Q391 234 509 367 C527 390 514 408 487 405 Q300 369 113 405 C86 408 73 390 91 367 Q209 234 270 100 C283 75 290 63 300 63Z" fill="#080a0b" stroke="#343739" stroke-opacity=".3" stroke-width="1.4" filter="url(#edge-soft)"/>
 <path d="M300 52 C310 52 317 64 330 89 Q391 223 509 356 C527 379 514 397 487 394 Q300 358 113 394 C86 397 73 379 91 356 Q209 223 270 89 C283 64 290 52 300 52Z" fill="url(#body)"/>
 <path d="M300 52 C310 52 317 64 330 89 Q391 223 509 356 C527 379 514 397 487 394 Q300 358 113 394 C86 397 73 379 91 356 Q209 223 270 89 C283 64 290 52 300 52Z" fill="none" stroke="#b6bcc0" stroke-opacity=".17" stroke-width="1.8" filter="url(#edge-soft)" pointer-events="none"/>
 <rect x="60" y="48" width="480" height="360" fill="url(#bulge)" clip-path="url(#shell)" filter="url(#grain)" pointer-events="none"/>
 ${wrap('form','M300 53 C310 53 317 65 329 90 Q342 117 359 148 Q300 131 241 148 Q258 117 271 90 C283 65 290 53 300 53Z',`01 — ${t.pages.form.label}`)}
 ${wrap('wireless','M133 303 Q174 329 184 380 Q147 385 113 393 C87 397 75 380 92 357 Q114 331 133 303Z',`02 — ${t.pages.wireless.label}`)}
 ${wrap('project','M467 303 Q426 329 416 380 Q453 385 487 393 C513 397 525 380 508 357 Q486 331 467 303Z',`03 — ${t.pages.project.label}`)}
 <circle cx="300" cy="250" r="83" fill="url(#rim)"/><circle class="orb-glow" cx="300" cy="248" r="82"/>
 ${interactive?`<a href="${href('control')}" class="ball-link" aria-label="04 — ${t.pages.control.label}">`:'<g>'}<circle cx="300" cy="248" r="71" class="ball-lit" filter="url(#ball-soft)"/><circle cx="300" cy="248" r="71" fill="url(#sphere)" filter="url(#ball-soft)"/><circle class="ball-outline" cx="300" cy="248" r="74" fill="none" stroke="transparent" stroke-width="2"/><ellipse cx="276" cy="217" rx="21" ry="10" fill="#eaffff" opacity=".17" transform="rotate(-36 276 217)"/>${interactive?'</a>':'</g>'}
 <text class="device-inscription" aria-hidden="true" x="300" y="358" text-anchor="middle" fill="#b8bbbd" font-size="15" font-family="Arial,sans-serif" letter-spacing=".1">Ballltrack</text></svg></div>`;
}
function profile(){return `<svg class="profile" viewBox="0 0 600 380" role="img" aria-label="${t.profileAlt}"><defs><linearGradient id="side" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#646769"/><stop offset=".25" stop-color="#343739"/><stop offset="1" stop-color="#101315"/></linearGradient><radialGradient id="sideball" cx=".3" cy=".2"><stop stop-color="#edffff"/><stop offset=".25" class="sideball-color"/><stop offset="1" stop-color="#163d3e"/></radialGradient></defs><ellipse cx="295" cy="290" rx="245" ry="23" fill="#000"/><circle cx="302" cy="185" r="70" fill="url(#sideball)"/><path d="M65 248 Q135 195 229 185 Q333 160 446 215 L540 258 Q545 280 524 283 L76 283 Q49 278 65 248Z" fill="url(#side)"/><path d="M65 264 Q310 248 540 267" fill="none" stroke="#0a0d0f" stroke-width="3"/><rect x="315" y="243" width="56" height="19" rx="9" fill="#050608" stroke="#8c9194"/><rect x="325" y="250" width="35" height="4" rx="2" fill="#666b6e"/><path d="M343 285 V330 H430" stroke="#6c775c" fill="none"/><text x="440" y="334" fill="#a8b29b" font-size="12" font-family="Arial">${t.profileText}</text></svg>`}
function art() {
  if(current==='wireless') return profile();
  if(current==='control') return `<div class="orbit"></div><div class="big-orb" role="img" aria-label="${t.orbAlt}"></div>`;
  if(current==='project') return `<div class="project-visual" role="img" aria-label="${t.lettersAlt}"><span class="project-ls">lll</span><span class="project-caption">BALL + L + TRACK</span></div>`;
  return device();
}
function render() {
  t = translations[language];
  const page = t.pages[current];
  document.documentElement.lang = language;
  document.title = page ? `${page.label} — Ballltrack` : t.siteTitle;
  document.querySelector('meta[name="description"]').content = page ? page.lead : t.description;
  document.getElementById('app').innerHTML = `<header><a class="wordmark" href="${href()}" aria-label="${t.homeLabel}">${wordmark}</a><div class="header-right"><div class="stage-label"><span class="status-dot"></span>${t.status}</div>${languageControl()}<a class="project-link" href="${href(current==='project'?'':'project')}">${current==='project'?t.back:t.about}${arrow}</a></div></header>${page?`<main class="detail page-enter"><section class="detail-copy"><a class="back" href="${href()}">${backArrow}<span>${t.back}</span></a><p class="eyebrow">${route[current][0]} / ${page.label}</p><h1>${page.title}</h1><p class="lead">${page.lead}</p>${current==='control'?controls()+'<p class="mode-preview" aria-live="polite"></p>':''}<div class="facts">${page.facts.map(([key,value])=>`<div class="fact"><span>${key}</span><strong>${value}</strong></div>`).join('')}</div><p class="note">${page.note}</p><nav class="detail-nav" aria-label="${t.nav}"><a class="text-link" href="${href(route[current][1])}">${page.nextLabel} ${arrow}</a></nav></section><div class="detail-art"><span class="art-index">B / ${route[current][0]}</span>${art()}<span class="art-caption">${t.captions[current]}</span></div></main>`:`<main class="home page-enter"><div class="home-title"><p class="eyebrow">${t.homeTag}</p><h1>${t.homeTitle}</h1></div><div class="ghost-word" aria-hidden="true">Ballltrack</div><div class="stage">${device(true)}${[['form','top'],['wireless','left'],['project','right'],['control','center']].map(([key,position])=>`<a class="callout ${position}" href="${href(key)}"><b>${route[key][0]}</b> ${t.pages[key].label} ${arrow}</a>`).join('')}</div><div class="home-bottom"><div class="hint"><span class="hint-icon">${arrow}</span><span>${t.hint}</span></div>${controls()}</div></main>`}<footer><span>Ballltrack © ${new Date().getFullYear()} <span aria-hidden="true">/</span> ${t.concept}</span><span class="footer-center">${t.motto}</span><span><span class="footer-number">${page?route[current][0]:'00'}</span> / 04</span></footer>`;
  setColor(selected);
  document.querySelectorAll('[data-color]').forEach(button=>button.addEventListener('click',()=>setColor(button.dataset.color)));
  document.getElementById('language').addEventListener('change', event=>{
    language=event.target.value;
    savePreference('localStorage','balll-language',language);
    const url=new URL(location.href); url.searchParams.set('lang',language);
    history.replaceState(null,'',url);
    render();
    document.getElementById('language').focus({preventScroll:true});
  });
}
function setColor(id) {
  const index=Math.max(0,palette.findIndex(colour=>colour[0]===id));
  const [key,value]=palette[index]; selected=key;
  document.documentElement.style.setProperty('--ball',value);
  document.querySelectorAll('[data-color]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.color===key)));
  const preview=document.querySelector('.mode-preview');
  if(preview) preview.textContent=`${t.colourNames[index]} — ${t.colourLabel}`;
  savePreference('sessionStorage','balll-color',key);
}
window.addEventListener('popstate',()=>{language=resolveLanguage();render();});
render();
