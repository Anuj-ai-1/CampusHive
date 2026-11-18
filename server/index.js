import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { app } from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

// Serve production Vite build when dist/ exists
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.method !== 'GET') return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
  console.log(`UniHive Backend + SQLite API running at http://${HOST}:${PORT}`);
});
