import {chromium} from 'playwright';
import {writeFile, readdir, stat} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.addInitScript(()=>{
 window.lab={lcp:0,cls:0};
 new PerformanceObserver(list=>{for(const e of list.getEntries())window.lab.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
 new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.lab.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
});
await page.goto('http://127.0.0.1:4173/');await page.waitForTimeout(2500);
const metrics=await page.evaluate(()=>({...window.lab,requests:performance.getEntriesByType('resource').length,transferBytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0)}));
const assets={};for(const f of await readdir('dist/assets'))assets[f]=(await stat('dist/assets/'+f)).size;
const report={environment:'Headless Chrome on Windows, local HTTP, desktop 1440×1000, no CPU/network throttling, single cold-page navigation. Synthetic only; not field Core Web Vitals. INP not measured.',metrics,assets};
await writeFile('test-results/performance.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
