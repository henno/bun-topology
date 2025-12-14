import type { Scanner, Device } from './types';

// Mock scanner for testing without real network
export class MockScanner implements Scanner {
  private readonly fixtures: Device[] = [
    {
      ip: '192.168.1.1',
      mac: 'AA:BB:CC:DD:EE:01',
      hostname: 'core-router',
      device_type: 'router',
      vendor: 'Routerboard.com',
      model: 'RB5009',
    },
    {
      ip: '192.168.1.2',
      mac: 'AA:BB:CC:DD:EE:02',
      hostname: 'floor2-switch',
      device_type: 'switch',
      vendor: 'Zyxel',
      model: 'GS1900-24',
    },
    {
      ip: '192.168.1.100',
      mac: 'AA:BB:CC:DD:EE:64',
      hostname: 'workstation-01',
      device_type: 'computer',
      vendor: 'Dell',
    },
    {
      ip: '192.168.1.200',
      mac: 'AA:BB:CC:DD:EE:C8',
      hostname: 'printer-hp',
      device_type: 'printer',
      vendor: 'HP',
      model: 'LaserJet Pro',
    },
    {
      ip: '192.168.1.150',
      mac: 'AA:BB:CC:DD:EE:96',
      device_type: 'unknown',
    },
  ];

  async scan(network: string, coreSwitchIp: string): Promise<Device[]> {
    // Simulate network delay (longer for testing API endpoints)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return this.fixtures;
  }
}
