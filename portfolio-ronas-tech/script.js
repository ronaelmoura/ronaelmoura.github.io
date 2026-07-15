const root=document.documentElement;
const themeButton=document.querySelector('.theme-toggle');
const savedTheme=localStorage.getItem('ronas-theme');
if(savedTheme) root.dataset.theme=savedTheme;
themeButton.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';root.dataset.theme=next;localStorage.setItem('ronas-theme',next)});

const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
menuButton.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileNav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));

const header=document.querySelector('.site-header');
const navLinks=[...document.querySelectorAll('.desktop-nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>20);let current='';sections.forEach(section=>{if(window.scrollY>=section.offsetTop-160)current=section.id});navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+current))}
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();

const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
reveals.forEach(el=>observer.observe(el));

document.getElementById('year').textContent=new Date().getFullYear();
const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',event=>{glow.style.left=event.clientX+'px';glow.style.top=event.clientY+'px'},{passive:true});
