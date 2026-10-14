'use strict';
const lang=document.body.dataset.lang||'en';
const locales={en:'en-US',fr:'fr-FR',es:'es-ES',de:'de-DE',nl:'nl-NL',pt:'pt-PT'};
const number=new Intl.NumberFormat(locales[lang],{maximumFractionDigits:0});
const price=document.querySelector('#price');
function updatePrice(){const amount=Number(price.value);document.querySelector('#price-output').textContent='AED '+number.format(amount);document.querySelectorAll('[data-amount]').forEach(el=>{const currency=el.dataset.currency;const value=amount*Number(el.dataset.amount)/100/(currency==='USD'?3.6725:1);el.textContent=(currency==='USD'?'≈ ':'')+currency+' '+number.format(value);});}
if(price){price.addEventListener('input',updatePrice);updatePrice();}
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window){
 if(!reduce){const nodes=[...document.querySelectorAll('.reveal')];nodes.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)el.classList.add('is-visible');});const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.06});nodes.forEach(el=>observer.observe(el));document.body.classList.add('motion-ready');}
 const sticky=document.querySelector('.mobile-cta');const formObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{sticky?.classList.toggle('is-hidden',e.isIntersecting);if(e.isIntersecting)loadForm();});},{threshold:.05});formObserver.observe(document.querySelector('#enquire'));
}
const dialog=document.querySelector('#plan-dialog');const data=JSON.parse(document.querySelector('#page-data').textContent);const plans=['studio','one-bedroom','two-bedroom'];let trigger;
document.querySelectorAll('.floorplan-trigger').forEach(btn=>btn.addEventListener('click',()=>{trigger=btn;const i=Number(btn.dataset.plan);document.querySelector('#plan-title').textContent=data.types[i]+' · '+data.plan;const photo=document.querySelector('#plan-image');photo.src='/assets/samana-downtown-one-'+plans[i]+'-floorplan.webp';photo.alt=data.types[i]+' — SAMANA Downtown One';dialog.showModal();}));
const closeDialog=()=>{dialog.close();trigger?.focus();};document.querySelector('#close-plan').addEventListener('click',closeDialog);dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});dialog.querySelector('a').addEventListener('click',()=>dialog.close());
let formLoaded=false;
function loadForm(){if(formLoaded)return;formLoaded=true;const frame=document.querySelector('#tally-frame');frame.src=frame.dataset.tallySrc;const script=document.createElement('script');script.src='https://tally.so/widgets/embed.js';script.async=true;document.body.appendChild(script);document.querySelector('#load-form').hidden=true;}
document.querySelector('#load-form').addEventListener('click',loadForm);
window.addEventListener('message',event=>{if(event.origin!=='https://tally.so'||event.source!==document.querySelector('#tally-frame').contentWindow)return;let info=event.data;try{if(typeof info==='string')info=JSON.parse(info);}catch{return;}if(info?.event==='Tally.FormLoaded')document.querySelector('#load-form').hidden=true;});
document.addEventListener('click',e=>{const menu=document.querySelector('.language-menu');if(!menu.contains(e.target))menu.open=false;});document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelector('.language-menu').open=false;});
// Motion follows scroll without intercepting native scrolling.
const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.appendChild(progress);
let scrollQueued=false;
function paintScroll(){const height=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(height>0?scrollY/height:0)+')';if(!reduce&&innerWidth>700){const hero=document.querySelector('.hero-photo');if(scrollY<hero.offsetHeight+hero.offsetTop)hero.style.setProperty('--hero-shift',Math.min(scrollY*.035,24)+'px');}scrollQueued=false;}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(paintScroll);}},{passive:true});paintScroll();
if(!reduce){price.addEventListener('input',()=>{document.querySelectorAll('.step-money strong').forEach(el=>el.animate([{opacity:.45,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'}));});}
const unitType=document.querySelector('#unit-type');
function chooseUnit(i){unitType.value=String(i);price.min=String(data.prices[i]);price.value=String(data.prices[i]);updatePrice();}
unitType.addEventListener('change',()=>chooseUnit(Number(unitType.value)));
document.querySelectorAll('.residence-select').forEach(a=>a.addEventListener('click',()=>chooseUnit(Number(a.dataset.unit))));
document.querySelectorAll('[data-payment-plan]').forEach(button=>button.addEventListener('click',()=>{
 const isPdc=button.dataset.paymentPlan==='pdc';document.querySelectorAll('[data-payment-plan]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 const booking=document.querySelector('[data-step="0"]');booking.querySelector('.payment-num b').textContent=isPdc?'10':'15';booking.querySelectorAll('[data-amount]').forEach(el=>el.dataset.amount=isPdc?'10':'15');
 const monthlyStep=document.querySelector('[data-step="3"]');monthlyStep.querySelector('h3').textContent=isPdc?data.payment.monthly80:data.monthly75;monthlyStep.querySelector('p').textContent=isPdc?data.payment.total80:data.total75;
 document.querySelector('#payment-note').textContent=isPdc?data.payment.pdc_math:data.nonpdcNote;updatePrice();
 if(!reduce)document.querySelector('.payment-grid').animate([{opacity:.5,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});
}));
