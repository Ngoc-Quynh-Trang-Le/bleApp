import { BleManager, Device, ScanMode } from 'react-native-ble-plx';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

export const bleManager = new BleManager();

/**
 * Request necessary permissions for BLE scanning
 */
export async function requestPermissions(): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
    } catch (error) {
      console.error('Failed to request permissions:', error);
    }
  }
}

/**
 * Start scanning for BLE beacons
 * @param onDeviceFound Callback when a device with name is found
 * @returns Function to stop scanning
 */
export function scanForBeacons(
  onDeviceFound: (device: Device) => void
): () => void {
  try {
    bleManager.startDeviceScan(
      null, // no filter UUIDs
      { scanMode: ScanMode.LowLatency },
      (error, device) => {
        if (error) {
          console.warn("BLE scan error:", error);
          return;
        }
        if (device?.name) {
          onDeviceFound(device);
        }
      }
    );
  } catch (error) {
    console.error("Failed to start BLE scan:", error);
  }

  // Return cleanup function
  return () => bleManager.stopDeviceScan();
}
