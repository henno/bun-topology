import { join } from 'path';
import { ScanManager } from './scan-manager';
import { detectNetworks } from './routes/route-detector';

const WEB_DIR = join(import.meta.dir, '../web');
const PORT = 8080;
const IS_MOCK = process.env.NETMAP_MOCK === 'true';

// Initialize scan manager
const scanManager = new ScanManager(IS_MOCK);

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
  async fetch(req, server) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const method = req.method;

    // WebSocket upgrade for /scans/{id}/stream
    if (pathname.match(/^\/scans\/[^/]+\/stream$/)) {
      const scanId = pathname.split('/')[2];
      const scan = scanManager.getScan(scanId);

      if (!scan) {
        return new Response('Scan not found', { status: 404 });
      }

      // Upgrade to WebSocket
      const upgraded = server.upgrade(req, { data: { scanId } });
      if (!upgraded) {
        return new Response('WebSocket upgrade failed', { status: 500 });
      }
      return undefined;
    }

    // API endpoints
    if (pathname === '/api/status') {
      return new Response(
        JSON.stringify({ mock: IS_MOCK }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // GET /api/networks - Get detected networks from routing table
    if (pathname === '/api/networks' && method === 'GET') {
      try {
        const networks = await detectNetworks();
        return new Response(
          JSON.stringify({ networks }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (error: any) {
        return new Response(
          JSON.stringify({ error: { code: 'DETECTION_FAILED', message: error.message } }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // POST /scans - Start a new scan
    if (pathname === '/scans' && method === 'POST') {
      try {
        const body = await req.json();
        const { network, core_switch } = body;

        if (!network || !core_switch) {
          return new Response(
            JSON.stringify({ error: { code: 'INVALID_REQUEST', message: 'Missing network or core_switch' } }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        const scan = await scanManager.startScan(network, core_switch);

        return new Response(
          JSON.stringify({
            scan_id: scan.scan_id,
            status: scan.status,
            network: scan.network,
            core_switch: scan.core_switch,
            started_at: scan.started_at,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error: any) {
        if (error.message === 'SCAN_ALREADY_RUNNING') {
          return new Response(
            JSON.stringify({ error: { code: 'SCAN_ALREADY_RUNNING', message: 'A scan is already running' } }),
            { status: 409, headers: { 'Content-Type': 'application/json' } }
          );
        }
        return new Response(
          JSON.stringify({ error: { code: 'INTERNAL_ERROR', message: error.message } }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // GET /scans/current - Get current scan
    if (pathname === '/scans/current' && method === 'GET') {
      const scan = scanManager.getCurrentScan();
      if (!scan) {
        return new Response(
          JSON.stringify({ error: { code: 'NO_SCAN', message: 'No scan running' } }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          scan_id: scan.scan_id,
          status: scan.status,
          discovered: scan.discovered,
          network: scan.network,
          started_at: scan.started_at,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // GET /scans/{id} - Get scan by ID
    if (pathname.startsWith('/scans/') && method === 'GET' && pathname !== '/scans/current') {
      const scanId = pathname.split('/')[2];
      const scan = scanManager.getScan(scanId);

      if (!scan) {
        return new Response(
          JSON.stringify({ error: { code: 'SCAN_NOT_FOUND', message: 'Scan not found' } }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          scan_id: scan.scan_id,
          status: scan.status,
          discovered: scan.discovered,
          network: scan.network,
          started_at: scan.started_at,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // DELETE /scans/{id} - Cancel scan
    if (pathname.startsWith('/scans/') && method === 'DELETE') {
      const scanId = pathname.split('/')[2];
      const cancelled = scanManager.cancelScan(scanId);

      if (!cancelled) {
        return new Response(
          JSON.stringify({ error: { code: 'SCAN_NOT_FOUND', message: 'Scan not found or already completed' } }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(null, { status: 204 });
    }

    // Static file serving
    let filePath = pathname;

    // Default to index.html for root
    if (filePath === '/') {
      filePath = '/index.html';
    }

    // Route page paths to .html files
    if (filePath === '/scan' || filePath === '/devices') {
      filePath = `${filePath}.html`;
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

  websocket: {
    open(ws) {
      const { scanId } = ws.data;
      scanManager.addWebSocketClient(scanId, ws);
      console.log(`WebSocket client connected for scan ${scanId}`);
    },

    close(ws) {
      const { scanId } = ws.data;
      scanManager.removeWebSocketClient(scanId, ws);
      console.log(`WebSocket client disconnected from scan ${scanId}`);
    },

    message(ws, message) {
      // We don't expect messages from the client for now
      console.log('Received WebSocket message:', message);
    },
  },
});

console.log(`Server running at http://localhost:${server.port}`);
if (IS_MOCK) {
  console.log('⚠️  Running in MOCK mode');
}
