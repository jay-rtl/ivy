import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async(req,res)=>{
 try {
  const url=new URL(req.url,'http://localhost');
  const route=decodeURIComponent(url.pathname);
  if (/^\/(about|representation|journal|contact)\.html$/.test(route)) {res.writeHead(301,{Location:route.replace(/\.html$/,'/')+url.search}).end();return;}
  let file=path.resolve(root,'.'+route);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if((await stat(file)).isDirectory()){
   if(!route.endsWith('/')){res.writeHead(301,{Location:route+'/'+url.search}).end();return;}
   file=path.join(file,'index.html');
  }
  const data=await readFile(file);
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'}).end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Page not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
