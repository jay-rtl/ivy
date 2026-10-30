import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {mkdir, writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const errors=[];const report=[];
const context=await browser.newContext();
const page=await context.newPage();
page.on('pageerror',error=>errors.push(error.message));
const routes=['','about/','representation/','journal/','credentials/','contact/'];
for(const width of [1440,768,390,320]){
 await page.setViewportSize({width,height:1000});
 for(const route of routes){
  const response=await page.goto(`http://127.0.0.1:4173/${route}`);assert.equal(response.status(),200);
  await page.waitForTimeout(1150);
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}});
  await page.waitForTimeout(950);
  const facts=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),sticky:getComputedStyle(document.querySelector('header')).position,links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href'))}));
  assert(facts.title&&facts.description&&facts.h1===1&&facts.images&&!facts.overflow&&facts.sticky==='sticky',`${width} ${route}: ${JSON.stringify(facts)}`);
  assert.equal(await page.locator('.menu-toggle').isVisible(), width<=800, 'Menu visibility at '+width);
  if(route==='representation/'){
   const markers=await page.locator('.service-detail li').evaluateAll(items=>items.map(el=>getComputedStyle(el,'::before').content));
   assert.equal(markers.length,9);
   assert(markers.every(marker=>marker==='"\u2197"'),'Service list arrows must render as one intact arrow: '+JSON.stringify(markers));
  }
  for(const href of new Set(facts.links))if(href&&!/^(#|mailto:|tel:|https?:)/.test(href)){const res=await context.request.get(new URL(href,'http://127.0.0.1:4173/').href);assert.equal(res.status(),200,href);}
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  assert.equal(axe.violations.length,0,JSON.stringify(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))));
  report.push({route,width,status:'PASS',axeViolations:axe.violations.length});
  if(width===1440||width===390||(width===768&&route==='')){await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);await page.screenshot({path:`test-results/${route.replace('/','')||'index'}-${width}.png`,fullPage:true});}
 }
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/');await page.waitForTimeout(1300);
await page.getByRole('button',{name:'Menu',exact:true}).click();await page.waitForTimeout(800);
assert(await page.locator('dialog').evaluate(e=>e.open));
assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
await page.screenshot({path:'test-results/mobile-menu.png'});
await page.keyboard.press('Shift+Tab');
assert(await page.locator('dialog').evaluate(e=>e.contains(document.activeElement)),'Focus escaped modal');
await page.keyboard.press('Escape');await page.waitForTimeout(400);
assert(!await page.locator('dialog').evaluate(e=>e.open));assert(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement));
await page.getByRole('button',{name:'Menu',exact:true}).click();await page.waitForTimeout(600);
await page.locator('dialog').getByRole('link',{name:/About/}).click();await page.waitForURL('**/about/');
report.push({check:'Mobile menu open, focus containment, Escape, focus restoration, navigation',status:'PASS'});
await page.getByRole('button',{name:'Menu',exact:true}).click();await page.waitForTimeout(600);
await page.locator('dialog').getByRole('link',{name:/Credentials/}).click();await page.waitForURL('**/credentials/');
assert.equal(await page.locator('main iframe').count(),0,'Credentials must be a native page');
assert(await page.locator('#reference-record').isVisible());
assert(await page.getByText('MTEVD2358462',{exact:true}).isVisible());
await page.evaluate(()=>{window.print=()=>{window.__printRequested=true;};});
await page.getByRole('button',{name:'Print reference',exact:true}).click();
assert(await page.evaluate(()=>window.__printRequested===true));
await page.emulateMedia({media:'print'});
assert.equal(await page.locator('.ref-record').evaluate(e=>getComputedStyle(e).opacity),'1');
await page.pdf({path:'test-results/credentials-reference.pdf',format:'A4',printBackground:true});
await page.emulateMedia({media:'screen'});
report.push({check:'Native Credentials page, mobile navigation, visible reference record, print action and print content visibility',status:'PASS'});
await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:4173/');
assert.equal(await page.locator('h1').evaluate(e=>getComputedStyle(e).opacity),'1');
assert.equal(await page.evaluate(()=>ScrollTrigger.getAll().length),0);
report.push({check:'Reduced motion: content visible and no ScrollTrigger animations',status:'PASS'});
const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await noJS.newPage();await plain.goto('http://127.0.0.1:4173/');
assert(await plain.locator('.no-js-nav').isVisible());assert(await plain.locator('h1').isVisible());
await plain.locator('.no-js-nav').getByRole('link',{name:'About',exact:true}).click();await plain.waitForURL('**/about/');
report.push({check:'JavaScript disabled: visible content and mobile navigation',status:'PASS'});
assert.equal(errors.length,0,errors.join('\n'));
await writeFile('test-results/audit.json',JSON.stringify({environment:'Local headless Chrome / Windows; synthetic checks',report,runtimeErrors:errors},null,2));
console.log(`${report.length} audit cases passed. No runtime errors. Screenshots and audit.json saved in test-results/.`);
await browser.close();
