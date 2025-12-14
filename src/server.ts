import { join } from 'path';

const WEB_DIR = join(import.meta.dir, '../web');
const PORT = 8080;
const IS_MOCK = process.env.NETMAP_MOCK === 'true';

// MIME type mapping
const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function getContentType(filePath: string): string {
  const ext = filePath.substring(filePath.lastIndexOf('.'));
  return MIME_TYPES[ext] || 'application/octet-stream';
}

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // API endpoints
    if (pathname === '/api/status') {
      return new Response(
        JSON.stringify({ mock: IS_MOCK }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Static file serving
    let filePath = pathname;

    // Default to index.html for root
    if (filePath === '/') {
      filePath = '/index.html';
    }

    // Try to serve static file from web directory
    const fullPath = join(WEB_DIR, filePath);
    const file = Bun.file(fullPath);

    if (await file.exists()) {
      return new Response(file, {
        headers: {
          'Content-Type': getContentType(filePath),
        },
      });
    }

    // 404 for missing files
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
if (IS_MOCK) {
  console.log('⚠️  Running in MOCK mode');
}
