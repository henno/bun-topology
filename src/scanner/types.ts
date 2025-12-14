// Device types
export type DeviceType = 'router' | 'switch' | 'ap' | 'printer' | 'phone' | 'server' | 'computer' | 'iot' | 'unknown';

export interface Device {
  ip: string;
  mac?: string;
  hostname?: string;
  device_type: DeviceType;
  vendor?: string;
  model?: string;
}

// Scanner interface for dependency injection
export interface Scanner {
  // Scan a network and return discovered devices
  // onDeviceDiscovered callback is called for each device as it's discovered
  scan(
    network: string,
    coreSwitchIp: string,
    onDeviceDiscovered?: (device: Device) => void
  ): Promise<Device[]>;
}
