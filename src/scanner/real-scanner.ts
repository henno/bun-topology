import type { Scanner, Device } from './types';

// Real scanner for actual network discovery
export class RealScanner implements Scanner {
  private readonly concurrency: number;
  private readonly pingTimeout: number;

  constructor(concurrency = 100, pingTimeout = 1000) {
    this.concurrency = concurrency;
    this.pingTimeout = pingTimeout;
  }

  async scan(
    network: string,
    coreSwitchIp: string,
    onDeviceDiscovered?: (device: Device) => void
  ): Promise<Device[]> {
    const ips = this.parseNetwork(network);
    const devices: Device[] = [];

    // Get ARP table for MAC address lookups
    const arpTable = await this.getArpTable();

    // Scan IPs in parallel with concurrency limit
    await this.parallelScan(ips, async (ip) => {
      const isAlive = await this.pingHost(ip);

      if (isAlive) {
        const device: Device = {
          ip,
          mac: arpTable.get(ip),
          device_type: 'unknown',
        };

        devices.push(device);

        if (onDeviceDiscovered) {
          onDeviceDiscovered(device);
        }
      }
    });

    return devices;
  }

  private parseNetwork(cidr: string): string[] {
    const [network, prefixStr] = cidr.split('/');
    const prefix = parseInt(prefixStr);

    if (!network || !prefix) {
      throw new Error(`Invalid CIDR notation: ${cidr}`);
    }

    const ips: string[] = [];
    const parts = network.split('.').map(Number);

    if (prefix === 32) {
      // Single IP
      return [network];
    }

    if (prefix === 24) {
      // /24 network
      for (let i = 1; i <= 254; i++) {
        ips.push(`${parts[0]}.${parts[1]}.${parts[2]}.${i}`);
      }
      return ips;
    }

    // For other prefixes, implement more complex logic
    // For now, throw an error
    throw new Error(`Unsupported CIDR prefix: /${prefix}. Currently only /32 and /24 are supported.`);
  }

  private async pingHost(ip: string): Promise<boolean> {
    try {
      const platform = process.platform;
      let command: string;

      if (platform === 'darwin' || platform === 'linux') {
        // macOS and Linux: ping -c 1 -W 1 <ip>
        command = `ping -c 1 -W 1 ${ip}`;
      } else if (platform === 'win32') {
        // Windows: ping -n 1 -w 1000 <ip>
        command = `ping -n 1 -w 1000 ${ip}`;
      } else {
        throw new Error(`Unsupported platform: ${platform}`);
      }

      const proc = Bun.spawn(command.split(' '), {
        stdout: 'pipe',
        stderr: 'pipe',
      });

      const exitCode = await proc.exited;
      return exitCode === 0;
    } catch (error) {
      // Ping failed or command not found
      return false;
    }
  }

  private async getArpTable(): Promise<Map<string, string>> {
    const arpTable = new Map<string, string>();

    try {
      const platform = process.platform;
      let command: string[];

      if (platform === 'darwin' || platform === 'linux') {
        command = ['arp', '-a'];
      } else if (platform === 'win32') {
        command = ['arp', '-a'];
      } else {
        // Unsupported platform
        return arpTable;
      }

      const proc = Bun.spawn(command, {
        stdout: 'pipe',
        stderr: 'pipe',
      });

      const output = await new Response(proc.stdout).text();

      // Parse ARP output
      // macOS/Linux format: hostname (192.168.1.1) at aa:bb:cc:dd:ee:ff [ether] on en0
      // Windows format: 192.168.1.1           aa-bb-cc-dd-ee-ff     dynamic
      const lines = output.split('\n');

      for (const line of lines) {
        const match = line.match(/\(?([\d.]+)\)?[\s]+(?:at\s+)?([0-9a-fA-F:]{17}|[0-9a-fA-F-]{17})/);

        if (match) {
          const ip = match[1];
          let mac = match[2];

          // Normalize MAC address format (convert hyphens to colons, uppercase)
          mac = mac.replace(/-/g, ':').toUpperCase();

          arpTable.set(ip, mac);
        }
      }
    } catch (error) {
      console.error('Failed to get ARP table:', error);
    }

    return arpTable;
  }

  private async parallelScan(
    items: string[],
    callback: (item: string) => Promise<void>
  ): Promise<void> {
    const chunks: string[][] = [];

    // Split into chunks of size = concurrency
    for (let i = 0; i < items.length; i += this.concurrency) {
      chunks.push(items.slice(i, i + this.concurrency));
    }

    // Process each chunk in parallel
    for (const chunk of chunks) {
      await Promise.all(chunk.map(callback));
    }
  }
}
