/**
 * Type definitions for the BLE-to-Web app
 */

export interface BeaconInfo {
  id: string;
  name: string;
  rssi?: number;
  distance?: number;
}

export interface ArtifactStory {
  beaconName: string;
  url: string;
  title: string;
  description?: string;
}
