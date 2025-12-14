let currentScanId = null;
let ws = null;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-scan');
  if (startButton) {
    startButton.addEventListener('click', startScan);
  }
});

async function startScan() {
  const network = document.getElementById('network').value;
  const coreSwitch = document.getElementById('core-switch').value;

  if (!network || !coreSwitch) {
    alert('Please enter both network and core switch IP');
    return;
  }

  try {
    // Start the scan
    const response = await fetch('/scans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        network,
        core_switch: coreSwitch,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.error?.message || 'Failed to start scan'}`);
      return;
    }

    const data = await response.json();
    currentScanId = data.scan_id;

    // Show results section and clear previous results
    document.getElementById('scan-results').style.display = 'block';
    document.getElementById('device-list').innerHTML = '';
    document.getElementById('scan-status').textContent = 'Status: Scanning...';

    // Connect to WebSocket for live updates
    connectWebSocket(currentScanId);
  } catch (error) {
    console.error('Error starting scan:', error);
    alert('Failed to start scan');
  }
}

function connectWebSocket(scanId) {
  const wsUrl = `ws://${window.location.host}/scans/${scanId}/stream`;
  ws = new WebSocket(wsUrl);

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    handleWebSocketMessage(message);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };
}

function handleWebSocketMessage(message) {
  const deviceList = document.getElementById('device-list');
  const scanStatus = document.getElementById('scan-status');

  switch (message.type) {
    case 'discovered':
      // Add device to the list
      const deviceItem = document.createElement('div');
      deviceItem.className = 'device-item';
      deviceItem.innerHTML = `
        <div class="device-ip">${message.device.ip}</div>
        <div class="device-hostname">${message.device.hostname || 'Unknown'}</div>
        <div class="device-type">${message.device.device_type}</div>
      `;
      deviceList.appendChild(deviceItem);
      break;

    case 'complete':
      scanStatus.textContent = `Status: Complete (${message.total} devices discovered)`;
      if (ws) {
        ws.close();
      }
      break;

    case 'cancelled':
      scanStatus.textContent = 'Status: Cancelled';
      if (ws) {
        ws.close();
      }
      break;

    case 'error':
      scanStatus.textContent = `Status: Error - ${message.message}`;
      if (ws) {
        ws.close();
      }
      break;
  }
}
