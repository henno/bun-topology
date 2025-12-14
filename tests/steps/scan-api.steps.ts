import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

// Test context to store scan ID between steps
let scanId: string;
let lastResponse: any;

When('I POST to \\/scans with network {string} and core switch {string}', async ({ request }, network: string, coreSwitch: string) => {
  lastResponse = await request.post('http://localhost:8080/scans', {
    data: {
      network,
      core_switch: coreSwitch,
    },
  });

  if (lastResponse.ok()) {
    const data = await lastResponse.json();
    scanId = data.scan_id;
  }
});

Then('I receive a scan ID', async ({}) => {
  if (!lastResponse.ok()) {
    const errorText = await lastResponse.text();
    console.error('Response error:', lastResponse.status(), errorText);
  }
  expect(lastResponse.ok()).toBe(true);
  const data = await lastResponse.json();
  expect(data.scan_id).toBeDefined();
  expect(typeof data.scan_id).toBe('string');
});

Then('the response status is {string}', async ({}, expectedStatus: string) => {
  const data = await lastResponse.json();
  expect(data.status).toBe(expectedStatus);
});

Given('a scan is running', async ({ request }) => {
  // Wait for any existing scan to complete
  let retries = 0;
  let response;
  while (retries < 10) {
    response = await request.post('http://localhost:8080/scans', {
      data: {
        network: '192.168.1.0/24',
        core_switch: '192.168.1.1',
      },
    });

    if (response.status() === 409) {
      // Scan already running, wait and retry
      await new Promise((resolve) => setTimeout(resolve, 200));
      retries++;
    } else {
      break;
    }
  }

  const data = await response.json();
  scanId = data.scan_id;
});

When('I GET the scan by ID', async ({ request }) => {
  lastResponse = await request.get(`http://localhost:8080/scans/${scanId}`);
});

Then('I see the scan status and discovered count', async ({}) => {
  if (!lastResponse.ok()) {
    const errorText = await lastResponse.text();
    console.error('Response error:', lastResponse.status(), errorText);
    console.error('scanId was:', scanId);
  }
  expect(lastResponse.ok()).toBe(true);
  const data = await lastResponse.json();
  expect(data.status).toBeDefined();
  expect(data.discovered).toBeDefined();
  expect(typeof data.discovered).toBe('number');
});

When('I POST to \\/scans', async ({ request }) => {
  lastResponse = await request.post('http://localhost:8080/scans', {
    data: {
      network: '10.0.0.0/24',
      core_switch: '10.0.0.1',
    },
  });
});

Then('I receive a 409 Conflict error', async ({}) => {
  expect(lastResponse.status()).toBe(409);
  const data = await lastResponse.json();
  expect(data.error).toBeDefined();
  expect(data.error.code).toBe('SCAN_ALREADY_RUNNING');
});

When('I DELETE the scan by ID', async ({ request }) => {
  lastResponse = await request.delete(`http://localhost:8080/scans/${scanId}`);
});

Then('the scan is cancelled', async ({}) => {
  if (lastResponse.status() !== 204) {
    const errorText = await lastResponse.text();
    console.error('Response error:', lastResponse.status(), errorText);
    console.error('scanId was:', scanId);
  }
  expect(lastResponse.status()).toBe(204);
});
