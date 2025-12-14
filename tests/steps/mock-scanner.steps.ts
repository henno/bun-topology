import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, Then } = createBdd();

Given('the server is running in mock mode', async ({}) => {
  // The server is started in mock mode via playwright.config.ts webServer command
  // This step is just a precondition verification
});

Then('I see a {string} indicator', async ({ page }, text: string) => {
  await expect(page.locator(`text=${text}`)).toBeVisible();
});
