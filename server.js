const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT      = parseInt(process.env.PORT || '3000', 10);
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'gartenplaner.json');
const HTML_FILE = path.join(__dirname, 'gartenplaner.html');

// Ensure data directory exists (important: runs at startup, after volume mount)
try {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  console.log(`📁 Datenverzeichnis: ${path.dirname(DATA_FILE)}`);
} catch (e) {
  console.error('⚠️  Konnte Datenverzeichnis nicht erstellen:', e.message);
}

// ── helpers ──────────────────────────────────────────────────────────────────
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    JSON.parse(raw); // validate
    return raw;
  } catch {
    const empty = JSON.stringify({ beete: [], pflanzen: [] });
    // Write initial file so it exists for next time
    try { fs.writeFileSync(DATA_FILE, empty, 'utf8'); } catch {}
    return empty;
  }
}

function writeData(body, res) {
  try {
    JSON.parse(body); // validate before writing
    fs.writeFileSync(DATA_FILE, body, 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"ok":true}');
  } catch (e) {
    console.error('Speichern fehlgeschlagen:', e.message);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: e.message }));
  }
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end',  () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// ── router ───────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  try {
    // GET /api/data
    if (req.method === 'GET' && url === '/api/data') {
      const data = readData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
      return;
    }

    // POST /api/data
    if (req.method === 'POST' && url === '/api/data') {
      const body = await collectBody(req);
      writeData(body, res);
      return;
    }

    // GET / or /index.html → serve frontend
    if (req.method === 'GET' && (url === '/' || url === '/index.html')) {
      const html = fs.readFileSync(HTML_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');

  } catch (e) {
    console.error('Server-Fehler:', e);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: e.message }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🌱 Gartenplaner läuft auf http://0.0.0.0:${PORT}`);
  console.log(`   HTML:  ${HTML_FILE}`);
  console.log(`   Daten: ${DATA_FILE}`);
});

server.on('error', e => {
  console.error('❌ Server konnte nicht starten:', e.message);
  process.exit(1);
});
