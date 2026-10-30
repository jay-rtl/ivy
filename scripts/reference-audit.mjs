import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import sharp from 'sharp';
import jsQR from 'jsqr';
import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const base=process.argv.includes('--live')?'https://ivy.independentliteraryagent.net/':'http://127.0.0.1:4173/';
const context=await browser.newContext();const page=await context.newPage();const results=[];const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,900,768,390,320]){
 await page.setViewportSize({width,height:1000});let response=await page.goto(base+'credentials/');
 if(response.status()===403){await page.waitForFunction(()=>!!document.querySelector('.reference-page'));response=await page.reload();}
 assert.equal(response.status(),200);await page.waitForTimeout(1300);
 const facts=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));
 assert(!facts.overflow,`Overflow ${width}`);assert(facts.images);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.equal(axe.violations.length,0,JSON.stringify(axe.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))));
 const qrImage=await page.locator('.ref-qr-link img').screenshot();const {data,info}=await sharp(qrImage).ensureAlpha().raw().toBuffer({resolveWithObject:true});assert.equal(jsQR(new Uint8ClampedArray(data),info.width,info.height)?.data,'https://www.caa.com/about-us','Screen QR '+width);
 if(width===1440||width===390){await page.evaluate(()=>{document.activeElement?.blur();scrollTo({top:0,behavior:'instant'});});await page.waitForTimeout(200);await page.screenshot({path:`test-results/reference-red-${width}.png`,fullPage:true});}
 results.push({width,...facts,qr:'decoded correct destination',axeViolations:0});
}
await page.evaluate(()=>{window.print=()=>{window.__printed=true;};});await page.getByRole('button',{name:'Print reference',exact:true}).click();assert(await page.evaluate(()=>window.__printed));
for(const format of ['A4','Letter']){
 await page.emulateMedia({media:'print'});await page.setViewportSize({width:794,height:1123});
 const pdf=await page.pdf({format,printBackground:true,preferCSSPageSize:format==='A4'});await writeFile(`test-results/ivy-reference-${format}.pdf`,pdf);
 const pages=(pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length;
 assert.equal(pages,1,format+' must print on one sheet');
 console.log(format+' PDF page count: '+pages);
 const qrImage=await page.locator('.ref-qr-link img').screenshot();const {data,info}=await sharp(qrImage).ensureAlpha().raw().toBuffer({resolveWithObject:true});assert.equal(jsQR(new Uint8ClampedArray(data),info.width,info.height)?.data,'https://www.caa.com/about-us','Print QR '+format);
 await page.screenshot({path:`test-results/reference-print-${format}.png`,fullPage:true});results.push({format,pages,qr:'decoded print-sized QR'});
}
assert.equal(errors.length,0);await writeFile(`test-results/reference-red-${process.argv.includes('--live')?'live':'local'}-results.json`,JSON.stringify({base,results,errors},null,2));await browser.close();console.log('Responsive/axe/QR/print checks complete.');
