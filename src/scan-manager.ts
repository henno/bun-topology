import type { Scanner, Device } from './scanner/types';
import { MockScanner } from './scanner/mock-scanner';

export type ScanStatus = 'scanning' | 'complete' | 'cancelled' | 'failed';

export interface Scan {
  scan_id: string;
  status: ScanStatus;
  network: string;
  core_switch: string;
  discovered: number;
  devices: Device[];
  started_at: string;
  completed_at?: string;
}

export class ScanManager {
  private currentScan: Scan | null = null;
  private scanner: Scanner;

  constructor(isMock: boolean) {
    this.scanner = isMock ? new MockScanner() : new MockScanner(); // TODO: Add real scanner
  }

  async startScan(network: string, coreSwitch: string): Promise<Scan> {
    // Only one scan at a time
    if (this.currentScan && this.currentScan.status === 'scanning') {
      throw new Error('SCAN_ALREADY_RUNNING');
    }

    const scanId = crypto.randomUUID();
    const scan: Scan = {
      scan_id: scanId,
      status: 'scanning',
      network,
      core_switch: coreSwitch,
      discovered: 0,
      devices: [],
      started_at: new Date().toISOString(),
    };

    this.currentScan = scan;

    // Run scan asynchronously
    this.runScan(scan).catch((error) => {
      console.error('Scan error:', error);
      scan.status = 'failed';
      scan.completed_at = new Date().toISOString();
    });

    return scan;
  }

  private async runScan(scan: Scan) {
    try {
      const devices = await this.scanner.scan(scan.network, scan.core_switch);

      scan.devices = devices;
      scan.discovered = devices.length;
      scan.status = 'complete';
      scan.completed_at = new Date().toISOString();
    } catch (error) {
      scan.status = 'failed';
      scan.completed_at = new Date().toISOString();
      throw error;
    }
  }

  getScan(scanId: string): Scan | null {
    if (this.currentScan && this.currentScan.scan_id === scanId) {
      return this.currentScan;
    }
    return null;
  }

  getCurrentScan(): Scan | null {
    return this.currentScan;
  }

  cancelScan(scanId: string): boolean {
    if (this.currentScan && this.currentScan.scan_id === scanId) {
      if (this.currentScan.status === 'scanning') {
        this.currentScan.status = 'cancelled';
        this.currentScan.completed_at = new Date().toISOString();
        return true;
      }
    }
    return false;
  }
}
