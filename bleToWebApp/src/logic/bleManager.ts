import { BleManager, Device, ScanMode } from 'react-native-ble-plx';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

export const bleManager = new BleManager();

/**
 * Request necessary permissions for BLE scanning
 */
export async function requestPermissions(): Promise<void> {
  if (Platform.OS === 'android') {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const permissions = [
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ];
          // Only request these on Android 12+ (API 31+)
          if (Number(Platform.Version) >= 31) {
            permissions.push(
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
            );
          }
          await PermissionsAndroid.requestMultiple(permissions);
          resolve();
        } catch (error) {
          console.error('Failed to request permissions:', error);
          reject(error);
        }
      }, 300); // Delay to ensure Activity is attached
    });
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
