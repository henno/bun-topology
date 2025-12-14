// NetMap Application JS

// Check if running in mock mode and show indicator
async function checkMockMode() {
  try {
    const response = await fetch('/api/status');
    const data = await response.json();

    if (data.mock) {
      const indicator = document.createElement('div');
      indicator.className = 'mock-indicator';
      indicator.textContent = 'Mock Mode';
      document.body.prepend(indicator);
    }
  } catch (error) {
    console.error('Failed to check mock mode:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkMockMode();
});
