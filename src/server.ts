// Minimal server stub for Issue #1 test infrastructure
// Full implementation will come in Issue #2

const server = Bun.serve({
  port: 8080,
  fetch(req) {
    return new Response('NetMap - Test Infrastructure Ready', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
