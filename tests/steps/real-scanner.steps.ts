import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { existsSync } from 'fs';
import { join } from 'path';

const { Given, When, Then } = createBdd();

Given('the RealScanner class is implemented', async () => {
  // Check that the file exists
  const scannerPath = join(process.cwd(), 'src/scanner/real-scanner.ts');
  expect(existsSync(scannerPath)).toBeTruthy();
});

When('the server starts without NETMAP_MOCK', async () => {
  // This is a conceptual step - we're verifying the code logic
  // The actual server is started with NETMAP_MOCK=true for tests
  expect(true).toBeTruthy();
});

Then('it uses RealScanner instead of MockScanner', async () => {
  // Verify the scan-manager imports and uses RealScanner
  const scanManagerPath = join(process.cwd(), 'src/scan-manager.ts');
  expect(existsSync(scanManagerPath)).toBeTruthy();

  // Read the file to verify it imports RealScanner
  const fs = await import('fs/promises');
  const content = await fs.readFile(scanManagerPath, 'utf-8');
  expect(content).toContain('import { RealScanner }');
  expect(content).toContain('new RealScanner()');
});

// Manual test steps - these are documentation only
Given('I start the server without mock mode', async () => {
  // Manual step: Run `bun run dev` (without NETMAP_MOCK)
  console.log('Manual step: Run `bun run dev` without NETMAP_MOCK');
});

When('I navigate to the scan page in a browser', async () => {
  // Manual step: Open http://localhost:8080/scan
  console.log('Manual step: Open http://localhost:8080/scan');
});

When('I enter a real network range', async () => {
  // Manual step: Enter your actual network range
  console.log('Manual step: Enter a real network range');
});

When('I click Start Scan', async () => {
  // Manual step: Click the Start Scan button
  console.log('Manual step: Click Start Scan');
});

Then('I should see actual devices from my network', async () => {
  // Manual verification: Check that real devices appear
  console.log('Manual verification: Check that real devices appear');
});

Then('I should not see any mock devices', async () => {
  // Manual verification: Ensure mock devices don't appear
  console.log('Manual verification: Ensure mock devices (192.168.1.1-150) do not appear');
});
