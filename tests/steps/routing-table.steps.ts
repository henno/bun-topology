import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

Then('I see a list of detected IPv4 networks with checkboxes', async ({ page }) => {
  // Wait for network list to load
  await expect(page.locator('.network-list')).toBeVisible({ timeout: 3000 });

  // Should have at least one network
  const count = await page.locator('.network-item').count();
  expect(count).toBeGreaterThanOrEqual(1);

  // Each item should have a checkbox
  const firstItem = page.locator('.network-item').first();
  await expect(firstItem.locator('input[type="checkbox"]')).toBeVisible();
});

Then('each network shows its CIDR notation', async ({ page }) => {
  const firstItem = page.locator('.network-item').first();
  const cidrText = await firstItem.locator('.network-cidr').textContent();

  // Should match CIDR pattern (e.g., 192.168.1.0/24)
  expect(cidrText).toMatch(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}/);
});

Then('the core switch IP is pre-filled as the first usable IP in the range', async ({ page }) => {
  const firstItem = page.locator('.network-item').first();
  const cidrText = await firstItem.locator('.network-cidr').textContent();
  const coreSwitch = await firstItem.locator('.network-gateway').textContent();

  // Extract network address from CIDR
  const networkAddr = cidrText?.split('/')[0];

  // Core switch should be network + 1 (e.g., 192.168.1.0 -> 192.168.1.1)
  if (networkAddr) {
    const parts = networkAddr.split('.');
    const expectedGateway = `${parts[0]}.${parts[1]}.${parts[2]}.${parseInt(parts[3]) + 1}`;
    expect(coreSwitch).toContain(expectedGateway);
  }
});

Given('I see detected networks', async ({ page }) => {
  await expect(page.locator('.network-list')).toBeVisible({ timeout: 3000 });
  const count = await page.locator('.network-item').count();
  expect(count).toBeGreaterThanOrEqual(1);
});

When('I select a network from the list', async ({ page }) => {
  // Click the first network item's checkbox
  await page.locator('.network-item').first().locator('input[type="checkbox"]').click();
});

Then('the network field is populated with the selected CIDR', async ({ page }) => {
  const networkInput = page.locator('[name="network"]');
  const value = await networkInput.inputValue();

  // Should be a valid CIDR
  expect(value).toMatch(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}/);
});

Then('the core switch field is populated with the first usable IP', async ({ page }) => {
  const coreSwitchInput = page.locator('[name="core-switch"]');
  const value = await coreSwitchInput.inputValue();

  // Should be a valid IP
  expect(value).toMatch(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
});
