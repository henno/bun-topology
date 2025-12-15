import type { DetectedNetwork } from './types';

export async function detectNetworks(): Promise<DetectedNetwork[]> {
  // Return mock networks in mock mode
  if (process.env.NETMAP_MOCK === 'true') {
    return [
      {
        cidr: '192.168.1.0/24',
        gateway: '192.168.1.1',
        interface: 'en0',
      },
      {
        cidr: '10.0.0.0/24',
        gateway: '10.0.0.1',
        interface: 'en1',
      },
    ];
  }

  const platform = process.platform;

  if (platform === 'darwin') {
    return detectNetworksMac();
  } else if (platform === 'linux') {
    return detectNetworksLinux();
  } else if (platform === 'win32') {
    return detectNetworksWindows();
  }

  return [];
}

async function detectNetworksMac(): Promise<DetectedNetwork[]> {
  try {
    // Get routing table
    const proc = Bun.spawn(['netstat', '-rn', '-f', 'inet'], {
      stdout: 'pipe',
    });

    const output = await new Response(proc.stdout).text();
    await proc.exited;

    return parseNetstatOutput(output);
  } catch (error) {
    console.error('Error detecting networks on macOS:', error);
    return [];
  }
}

async function detectNetworksLinux(): Promise<DetectedNetwork[]> {
  try {
    // Get routing table
    const proc = Bun.spawn(['ip', 'route'], {
      stdout: 'pipe',
    });

    const output = await new Response(proc.stdout).text();
    await proc.exited;

    return parseIpRouteOutput(output);
  } catch (error) {
    console.error('Error detecting networks on Linux:', error);
    return [];
  }
}

async function detectNetworksWindows(): Promise<DetectedNetwork[]> {
  try {
    // Get routing table
    const proc = Bun.spawn(['route', 'print', '-4'], {
      stdout: 'pipe',
    });

    const output = await new Response(proc.stdout).text();
    await proc.exited;

    return parseWindowsRouteOutput(output);
  } catch (error) {
    console.error('Error detecting networks on Windows:', error);
    return [];
  }
}

function parseNetstatOutput(output: string): DetectedNetwork[] {
  const networks: DetectedNetwork[] = [];
  const lines = output.split('\n');

  for (const line of lines) {
    // Look for lines with network/mask format
    // Example: 192.168.1/24        link#4             UCS            en0
    const match = line.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})\s+.*\s+(\w+)\s*$/);

    if (match) {
      const [, network, prefix, iface] = match;

      // Skip loopback, link-local, multicast, and broadcast
      if (network.startsWith('127.') ||
          network.startsWith('169.254.') ||
          network.startsWith('224.') ||
          network.startsWith('255.')) {
        continue;
      }

      const cidr = `${network}.0/${prefix}`;
      const gateway = `${network}.1`;

      networks.push({
        cidr,
        gateway,
        interface: iface,
      });
    }
  }

  return networks;
}

function parseIpRouteOutput(output: string): DetectedNetwork[] {
  const networks: DetectedNetwork[] = [];
  const lines = output.split('\n');

  for (const line of lines) {
    // Look for directly connected networks
    // Example: 192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100
    const match = line.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2})\s+dev\s+(\S+)/);

    if (match) {
      const [, cidr, iface] = match;
      const network = cidr.split('/')[0];

      // Skip loopback, link-local, multicast, and broadcast
      if (network.startsWith('127.') ||
          network.startsWith('169.254.') ||
          network.startsWith('224.') ||
          network.startsWith('255.')) {
        continue;
      }

      // Calculate first usable IP
      const parts = network.split('.');
      const gateway = `${parts[0]}.${parts[1]}.${parts[2]}.${parseInt(parts[3]) + 1}`;

      networks.push({
        cidr,
        gateway,
        interface: iface,
      });
    }
  }

  return networks;
}

function parseWindowsRouteOutput(output: string): DetectedNetwork[] {
  const networks: DetectedNetwork[] = [];
  const lines = output.split('\n');

  for (const line of lines) {
    // Look for network routes
    // Example: 192.168.1.0    255.255.255.0    192.168.1.100    192.168.1.100     25
    const parts = line.trim().split(/\s+/);

    if (parts.length >= 3) {
      const network = parts[0];
      const netmask = parts[1];

      // Skip default route, loopback, and link-local
      if (network === '0.0.0.0' || network.startsWith('127.') || network.startsWith('169.254.')) {
        continue;
      }

      // Convert netmask to CIDR prefix
      const prefix = netmaskToCidr(netmask);
      if (prefix === 0) continue;

      const cidr = `${network}/${prefix}`;
      const networkParts = network.split('.');
      const gateway = `${networkParts[0]}.${networkParts[1]}.${networkParts[2]}.${parseInt(networkParts[3]) + 1}`;

      networks.push({
        cidr,
        gateway,
        interface: 'Unknown',
      });
    }
  }

  return networks;
}

function netmaskToCidr(netmask: string): number {
  const parts = netmask.split('.').map(Number);
  let cidr = 0;

  for (const part of parts) {
    cidr += part.toString(2).split('1').length - 1;
  }

  return cidr;
}
