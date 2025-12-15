import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { startScanAndWaitForCompletion } from './helpers';

const { Given, When, Then } = createBdd();

When('I start a scan and it completes', async ({ page }) => {
  await startScanAndWaitForCompletion(page);
});

Then('each device row shows: type icon, IP, hostname, vendor', async ({ page }) => {
  const firstDevice = page.locator('.device-item').first();

  // Should have all columns
  await expect(firstDevice.locator('.device-icon')).toBeVisible();
  await expect(firstDevice.locator('.device-ip')).toBeVisible();
  await expect(firstDevice.locator('.device-hostname')).toBeVisible();
  await expect(firstDevice.locator('.device-vendor')).toBeVisible();
});

Given('I started a scan and it completed', async ({ page }) => {
  await page.goto('/scan');
  await page.waitForLoadState('domcontentloaded');
  await startScanAndWaitForCompletion(page);
});

Then('routers show a router icon', async ({ page }) => {
  // Find all device items in the device list (not detected networks)
  const allDevices = page.locator('#device-list .device-item');
  const routerDevice = allDevices.filter({ has: page.locator('.device-ip', { hasText: '192.168.1.1' }) }).first();
  const icon = routerDevice.locator('.device-icon');

  await expect(icon).toHaveAttribute('data-type', 'router');
});

Then('switches show a switch icon', async ({ page }) => {
  const allDevices = page.locator('#device-list .device-item');
  const switchDevice = allDevices.filter({ has: page.locator('.device-ip', { hasText: '192.168.1.2' }) }).first();
  const icon = switchDevice.locator('.device-icon');

  await expect(icon).toHaveAttribute('data-type', 'switch');
});

Then('computers show a computer icon', async ({ page }) => {
  const allDevices = page.locator('#device-list .device-item');
  const computerDevice = allDevices.filter({ has: page.locator('.device-ip', { hasText: '192.168.1.100' }) }).first();
  const icon = computerDevice.locator('.device-icon');

  await expect(icon).toHaveAttribute('data-type', 'computer');
});

Then('unknown devices show a question mark icon', async ({ page }) => {
  const allDevices = page.locator('#device-list .device-item');
  const unknownDevice = allDevices.filter({ has: page.locator('.device-ip', { hasText: '192.168.1.150' }) }).first();
  const icon = unknownDevice.locator('.device-icon');

  await expect(icon).toHaveAttribute('data-type', 'unknown');
});

When('I look at the device with no hostname', async ({ page }) => {
  // Device at 192.168.1.150 has no hostname
  const allDevices = page.locator('#device-list .device-item');
  const device = allDevices.filter({ has: page.locator('.device-ip', { hasText: '192.168.1.150' }) }).first();
  await expect(device).toBeVisible();
});

Then('the hostname column shows {string}', async ({ page }, expected: string) => {
  const allDevices = page.locator('#device-list .device-item');
  const device = allDevices.filter({ has: page.locator('.device-ip', { hasText: '192.168.1.150' }) }).first();
  const hostname = device.locator('.device-hostname');

  await expect(hostname).toHaveText(expected);
});

When('I look at the device with no vendor', async ({ page }) => {
  // Device at 192.168.1.150 has no vendor
  const allDevices = page.locator('#device-list .device-item');
  const device = allDevices.filter({ has: page.locator('.device-ip', { hasText: '192.168.1.150' }) }).first();
  await expect(device).toBeVisible();
});

Then('the vendor column shows {string}', async ({ page }, expected: string) => {
  const allDevices = page.locator('#device-list .device-item');
  const device = allDevices.filter({ has: page.locator('.device-ip', { hasText: '192.168.1.150' }) }).first();
  const vendor = device.locator('.device-vendor');

  await expect(vendor).toHaveText(expected);
});

When('I run a scan in mock mode', async ({ page }) => {
  await page.fill('[name="network"]', '192.168.1.0/24');
  await page.fill('[name="core-switch"]', '192.168.1.1');
  await page.click('button:has-text("Start Scan")');

  // Wait for completion
  await expect(page.locator('.scan-status')).toContainText('Complete', { timeout: 5000 });
});

Then('I see exactly {int} devices', async ({ page }, count: number) => {
  await expect(page.locator('.device-item')).toHaveCount(count);
});
