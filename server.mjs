import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(fileURLToPath(import.meta.url));
try { const env = await readFile(path.join(root, '.env'), 'utf8'); for (const line of env.split(/\r?\n/)) { const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, ''); } } catch {}
const html = await readFile(path.join(root, 'index.html'));
const server = http.createServer(async (req,res) => {
  if (req.method==='GET' && req.url==='/') {res.writeHead(200,{'content-type':'text/html; charset=utf-8'});return res.end(html)}
  if(req.method==='POST'&&req.url==='/api/chat') {try {let raw='';for await(const c of req){raw+=c;if(raw.length>100000)throw new Error('Request too large')}const {message,history=[]}=JSON.parse(raw||'{}');if(!process.env.OPENROUTER_API_KEY){res.writeHead(503,{'content-type':'application/json'});return res.end(JSON.stringify({error:'OPENROUTER_API_KEY env var add cheyyali.'}))}const upstream=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,'Content-Type':'application/json','X-Title':'AI Talky'},body:JSON.stringify({model:'openrouter/free',messages:[...history.slice(-12),{role:'user',content:String(message||'').slice(0,8000)}],max_tokens:1200})});const data=await upstream.json();if(!upstream.ok)throw new Error(data.error?.message||`OpenRouter error ${upstream.status}`);res.writeHead(200,{'content-type':'application/json'});return res.end(JSON.stringify({answer:data.choices?.[0]?.message?.content||''}))}catch(e){res.writeHead(500,{'content-type':'application/json'});return res.end(JSON.stringify({error:e.message||'Request failed'}))}}
  res.writeHead(404);res.end('Not found')
});server.listen(Number(process.env.PORT||3000),()=>console.log('AI Talky at http://localhost:3000'));
