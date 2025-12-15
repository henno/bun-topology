import { expect, type Page } from '@playwright/test';

export async function startScanAndWaitForCompletion(page: Page, network = '192.168.1.0/24', coreSwitch = '192.168.1.1') {
  await page.fill('[name="network"]', network);
  await page.fill('[name="core-switch"]', coreSwitch);
  await page.click('button:has-text("Start Scan")');

  // Wait for completion
  await expect(page.locator('.scan-status')).toContainText('Complete', { timeout: 5000 });
}
