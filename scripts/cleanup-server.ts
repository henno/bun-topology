#!/usr/bin/env bun
// Kill any process running on port 8080 (cross-platform)

const PORT = 8080;

async function killProcessOnPort(port: number) {
  try {
    // Use Bun's cross-platform process management
    const isWindows = process.platform === 'win32';

    let command: string;
    let args: string[];

    if (isWindows) {
      // Windows: netstat + taskkill
      command = 'cmd';
      args = ['/c', `for /f "tokens=5" %a in ('netstat -aon ^| findstr :${port}') do taskkill /F /PID %a`];
    } else {
      // Unix: lsof + kill
      command = 'sh';
      args = ['-c', `lsof -ti:${port} | xargs kill -9 2>/dev/null || true`];
    }

    const proc = Bun.spawn([command, ...args], {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const output = await new Response(proc.stdout).text();
    const exitCode = await proc.exited;

    if (output.trim()) {
      console.log(`Killed existing server on port ${port}`);
    }
  } catch (error) {
    // Ignore errors - port might not be in use
  }
}

await killProcessOnPort(PORT);
process.exit(0);
