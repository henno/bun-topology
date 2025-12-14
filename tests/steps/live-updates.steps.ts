import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

When('I start a scan', async ({ page }) => {
  await page.fill('[name="network"]', '192.168.1.0/24');
  await page.fill('[name="core-switch"]', '192.168.1.1');
  await page.click('button:has-text("Start Scan")');
});

Then('devices appear one by one as they are discovered', async ({ page }) => {
  // Wait for first device to appear
  await expect(page.locator('.device-list .device-item').first()).toBeVisible({ timeout: 3000 });

  // Check that we have multiple devices
  await expect(page.locator('.device-list .device-item')).toHaveCount(5, { timeout: 5000 });
});

Then('I see the scan status change to {string} when finished', async ({ page }, status: string) => {
  await expect(page.locator('.scan-status')).toContainText(status, { timeout: 5000 });
});

Then('the final device count matches the number discovered', async ({ page }) => {
  const deviceCount = await page.locator('.device-list .device-item').count();
  const statusText = await page.locator('.scan-status').textContent();

  // Status should mention the count
  expect(statusText).toContain(deviceCount.toString());
});
