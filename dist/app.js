document.body.classList.add('js');
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
const close = document.querySelector('.menu-close');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
toggle.hidden = false;
let menuAnimation;
function closeMenu() {
  menuAnimation?.kill();
  toggle.setAttribute('aria-expanded', 'false');
  if (window.gsap && !reduced.matches) {
    menuAnimation = gsap.to(menu, {opacity:0, y:-12, duration:.22, onComplete:()=>{menu.close(); gsap.set(menu,{clearProps:'all'}); toggle.focus();}});
  } else {menu.close(); toggle.focus();}
}
toggle.addEventListener('click', () => {
  if (menu.open) {closeMenu(); return;}
  menuAnimation?.kill();
  menu.showModal();
  toggle.setAttribute('aria-expanded', 'true');
  close.focus();
  if (window.gsap && !reduced.matches) {
    menuAnimation = gsap.timeline().fromTo(menu,{opacity:0,y:-18},{opacity:1,y:0,duration:.45,ease:'power3.out'}).fromTo(menu.querySelectorAll('nav a'),{opacity:0,y:26},{opacity:1,y:0,duration:.55,stagger:.055,ease:'power3.out'},.1);
  }
});
close.addEventListener('click',closeMenu);
menu.addEventListener('cancel', e=>{e.preventDefault(); closeMenu();});
window.matchMedia('(min-width: 801px)').addEventListener('change',e=>{if(e.matches&&menu.open)closeMenu();});
let scheduled = false;
function updateScroll() {
  header.classList.toggle('scrolled', window.scrollY>10);
  const max = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('.reading-progress').style.transform=`scaleX(${max>0?window.scrollY/max:0})`;
  scheduled=false;
}
window.addEventListener('scroll',()=>{if(!scheduled){requestAnimationFrame(updateScroll);scheduled=true;}},{passive:true});
updateScroll();
if(window.gsap && window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 gsap.matchMedia().add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.from('.intro',{y:28,opacity:0,duration:1,stagger:.1,ease:'power3.out',clearProps:'all'});
  gsap.utils.toArray('.reveal').forEach(el=>{
   gsap.from(el,{y:30,opacity:0,duration:.85,ease:'power2.out',clearProps:'all',scrollTrigger:{trigger:el,start:'top 94%',once:true}});
  });
 });
 window.addEventListener('load',()=>ScrollTrigger.refresh());
}
