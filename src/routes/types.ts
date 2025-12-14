export interface DetectedNetwork {
  cidr: string;        // e.g., "192.168.1.0/24"
  gateway: string;     // e.g., "192.168.1.1" (first usable IP)
  interface: string;   // e.g., "en0"
}
