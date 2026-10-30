import {execFileSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const pages=['index','about','representation','journal','credentials','contact'];
const build=env=>execFileSync(process.execPath,['scripts/build.mjs'],{env:{...process.env,...env},stdio:'pipe'});
try {
 build({SITE_URL:'https://example.invalid'});
 const titles=new Set(), descriptions=new Set();
 for(const page of pages){
  const route=page==='index'?'':page+'/';
  const html=await readFile(`dist/${route}index.html`,'utf8');
  titles.add(html.match(/<title>(.*?)<\/title>/)[1]);descriptions.add(html.match(/name="description" content="(.*?)"/)[1]);
  assert(html.includes('<meta name="robots" content="index,follow">'));
  assert(html.includes(`<link rel="canonical" href="https://example.invalid/${route}">`));
  assert(!/href="(?:\.\.\/)?(?:index|about|representation|journal|credentials|contact)\.html/.test(html));
  assert(html.includes('<meta property="og:image" content="https://example.invalid/assets/portrait-1200.webp">'));
 }
 assert.equal(titles.size,6);assert.equal(descriptions.size,6);
 const sitemap=await readFile('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,6);
 assert((await readFile('dist/robots.txt','utf8')).includes('Sitemap: https://example.invalid/sitemap.xml'));
 console.log('PASS: 6 unique titles/descriptions, production canonicals, social images, sitemap and robots.');
} finally {build({SITE_URL:''});}
assert((await readFile('dist/index.html','utf8')).includes('noindex,nofollow'));
assert((await readFile('dist/robots.txt','utf8')).includes('Disallow: /'));
console.log('PASS: final local preview restored with indexing disabled. No production domain assumed.');
