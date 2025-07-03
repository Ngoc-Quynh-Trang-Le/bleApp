// src/logic/bleManager.ts
import { BleManager, Device, ScanMode } from 'react-native-ble-plx';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';

export const bleManager = new BleManager();

export async function requestPermissions() {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);
  }
}
