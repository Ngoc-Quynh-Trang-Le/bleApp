import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules, Platform, PermissionsAndroid, DeviceEventEmitter } from 'react-native';
const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

let bleInitialized = false;

export async function initializeBleManager(): Promise<void> {
  if (!bleInitialized) {
    await BleManager.start({ showAlert: false });
    bleInitialized = true;
  }
}

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
  onDeviceFound: (device: { id: string; name?: string }) => void
): () => void {
  let scanListener: any;
  try {
    BleManager.scan([], 5, true);
    scanListener = DeviceEventEmitter.addListener('BleManagerDiscoverPeripheral', (device) => {
      if (device && device.name) {
        onDeviceFound(device);
      }
    });
  } catch (error) {
    console.error('Failed to start BLE scan:', error);
  }
  // Return cleanup function
  return () => {
    BleManager.stopScan();
    if (scanListener) scanListener.remove();
  };
}
