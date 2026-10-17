const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.i);toast.i=setTimeout(()=>t.classList.remove('show'),2400)};
// Hero photo: a warm light follows your cursor
const hi=$('#hi');hi.addEventListener('pointermove',e=>{const r=hi.getBoundingClientRect();hi.style.setProperty('--x',e.clientX-r.left+'px');hi.style.setProperty('--y',e.clientY-r.top+'px')});
// Products
const P=[['luma','Luma',129,'Table lamp','Bestseller',[['#d9d2c0','Chalk'],['#b89a7e','Sand'],['#6e7556','Olive']]],
['arc','Arc',289,'Floor lamp','A house favorite',[['#b5934f','Aged brass'],['#4f3f33','Bronze']]],
['sol','Sol',89,'Portable lamp','Goes anywhere',[['#c08a3e','Honey'],['#e5dcc4','Cream'],['#6b4a38','Cocoa']]],
['forma','Forma',179,'Pendant','Soft by nature',[['#b5934f','Natural'],['#e8dfc8','Ivory']]]];
$('#grid').innerHTML=P.map(p=>`<article class="card"><div class="pi"><img src="${p[0]}.jpg" alt="${p[1]} ${p[3].toLowerCase()}" loading="lazy"><span class="badge">${p[4]}</span><button class="heart" aria-label="Save ${p[1]}">♡</button><button class="add" data-n="${p[1]}">Add to bag — $${p[2]}</button></div>
<div class="r"><h3>${p[1]}</h3><span>$${p[2]}</span></div><small>${p[3]} · Warm glow, always</small>
<div class="sw">${p[5].map((c,i)=>`<button class="${i?'':'on'}" style="background:${c[0]}" data-c="${c[1]}" aria-label="${c[1]}"></button>`).join('')}</div><small class="cn">${p[5].map(c=>c[1]).join(' · ')}</small></article>`).join('');
$('#grid').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.classList.contains('heart')){const on=b.classList.toggle('on');b.textContent=on?'♥':'♡'}
 if(b.dataset.n)add(b.dataset.n);
 if(b.dataset.c){const c=b.closest('.card');c.querySelectorAll('.sw button').forEach(s=>s.classList.toggle('on',s===b));c.querySelector('.cn').textContent=b.dataset.c}});
$('#cart').onclick=()=>openD(true);
// Light off / on slider
const cmp=$('#cmp'),rng=$('#rng'),set=v=>cmp.style.setProperty('--p',v+'%');
rng.oninput=()=>{set(rng.value);dem=false};let dem=true;set(50);
new IntersectionObserver(([e],o)=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now();
 (function f(t){if(!dem)return;const k=Math.min((t-t0)/2600,1),v=90-80*(1-Math.pow(1-k,3))*1+ (k<1?0:0);rng.value=v;set(v);if(k<1)requestAnimationFrame(f)})(t0)},{threshold:.6}).observe(cmp);
// Kelvin tryout colours the sign-off wordmark glow
const k=$('#k');k.oninput=()=>{$('#ko').textContent=k.value+'K';const t=(k.value-2200)/1800;document.documentElement.style.setProperty('--tan',`rgb(${212-t*40|0},${180+t*10|0},${131+t*90|0})`)};
// Footer wordmark lights up where you point
const w=$('#word');w.addEventListener('pointermove',e=>{const r=w.getBoundingClientRect();w.style.setProperty('--x',e.clientX-r.left+'px')});
// Newsletter
$('#f').addEventListener('submit',e=>{e.preventDefault();const i=$('#em'),ok=/^\S+@\S+\.\S+$/.test(i.value);i.classList.toggle('bad',!ok);
 $('#msg').textContent=ok?'You’re in. Your 10% off is on its way.':'Enter an email like name@home.com to get your 10% off.';if(ok)i.value=''});

// Cart drawer
const cart=[],byN=Object.fromEntries(P.map(p=>[p[1],p]));
const openD=o=>{$('#drawer').classList.toggle('on',o);$('#veil').classList.toggle('on',o)};$('#dx').onclick=$('#veil').onclick=()=>openD(false);
function add(n){const f=cart.find(c=>c.n===n);f?f.q++:cart.push({n,q:1});render();openD(true)}
function render(){const tot=cart.reduce((s,c)=>s+byN[c.n][2]*c.q,0);$('#count').textContent=cart.reduce((s,c)=>s+c.q,0);$('#sub').textContent='$'+tot;
$('#items').innerHTML=cart.length?cart.map((c,i)=>`<li><img src="${byN[c.n][0]}.jpg" alt=""><div>${c.n}<small>${byN[c.n][3]} · ×${c.q}</small><button data-r="${i}">Remove</button></div><b>$${byN[c.n][2]*c.q}</b></li>`).join(''):'<li class="empty">Your bag is empty. Find your glow first.</li>';
$('#fsb').style.width=Math.min(tot/150*100,100)+'%';$('#fst').textContent=tot>=150?'You’ve unlocked free shipping ✦':'$'+(150-tot)+' away from free shipping'}
$('#items').addEventListener('click',e=>{const r=e.target.dataset.r;if(r!==undefined){cart.splice(r,1);render()}});
$('#chk').onclick=()=>toast(cart.length?'Demo checkout — this is where payment would begin':'Add a lamp first');render();
// Glow Studio
const R=[['off.jpg','Arc',[56,45],'A tall, arcing glow that reaches over a sofa. Best around 2700K.'],['cozy.jpg','Luma',[66,38],'A soft shaded glow for one more chapter. Dim it low for evenings.'],['focus.jpg','Sol',[80,35],'Compact, warm, and bright enough for a clear desk.'],['statement.jpg','Forma',[28,25],'A pendant pool of light that gathers everyone at the table.']];
let ri=0;const st=$('#stage'),orb=$('#orb');
const col=K=>{const t=(K-2200)/1800;return[255,Math.round(170+t*75),Math.round(90+t*140)]};
function glow(){const h=+$('#hr').value,K=+$('#wm').value,d=+$('#dm').value,[r,g,b]=col(K),a=d/100;
 $('#dusk').style.opacity=(.15+h/100*.7).toFixed(2);
 $('#beam').style.background=`radial-gradient(circle at var(--lx,56%) var(--ly,45%),rgba(${r},${g},${b},${(.75*a).toFixed(2)}) 0,rgba(${r},${g},${b},${(.3*a).toFixed(2)}) ${10+a*22}%,transparent ${25+a*40}%)`;
 st.style.setProperty('--lc',`rgb(${r},${g},${b})`);orb.style.setProperty('--lc',`rgb(${r},${g},${b})`);
 $('#o1').textContent=h<25?'Afternoon':h<60?'Dusk':'Evening';$('#o2').textContent=K+'K';$('#o3').textContent=d+'%'}
function room(i){ri=i;const x=R[i];$('#simg').src=x[0];st.style.setProperty('--lx',x[2][0]+'%');st.style.setProperty('--ly',x[2][1]+'%');
 $$('#chips button').forEach((b,j)=>b.classList.toggle('on',j===i));const p=byN[x[1]];$('#pimg').src=''+p[0]+'.jpg';$('#pn').textContent=p[1]+' · $'+p[2];$('#pd').textContent=x[3];glow()}
$$('#chips button').forEach(b=>b.onclick=()=>room(+b.dataset.i));$$('.ctl input').forEach(i=>i.oninput=glow);
const mv=e=>{const r=st.getBoundingClientRect();st.style.setProperty('--lx',Math.min(Math.max((e.clientX-r.left)/r.width*100,3),97)+'%');st.style.setProperty('--ly',Math.min(Math.max((e.clientY-r.top)/r.height*100,3),97)+'%')};
orb.addEventListener('pointerdown',e=>{orb.setPointerCapture(e.pointerId);orb.onpointermove=mv;$('.hint')?.remove()});orb.addEventListener('pointerup',()=>orb.onpointermove=null);
$('#padd').onclick=()=>add(R[ri][1]);room(0);
