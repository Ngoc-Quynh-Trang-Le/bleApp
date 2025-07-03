import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Device } from 'react-native-ble-plx';

import { requestPermissions, scanForBeacons } from '../logic/bleManager';
import { beaconToUrl, getFormattedBeaconName } from '../logic/beaconMap';
import { canTrigger } from '../logic/cooldownManager';
import { launchArtifactUrl } from '../logic/urlLauncher';
import BeaconList from '../components/BeaconList';

export default function HomeScreen() {
  const [nearbyBeacons, setNearbyBeacons] = useState<Set<string>>(new Set());

  // Handle when a new beacon is discovered
  const handleDeviceFound = useCallback((device: Device) => {
    const name = device.name!;
    if (beaconToUrl[name] && canTrigger(name)) {
      setNearbyBeacons(prev => new Set(prev).add(name));
    }
  }, []);

  // Set up BLE scanning
  useEffect(() => {
    const setupBLE = async () => {
      await requestPermissions();
      return scanForBeacons(handleDeviceFound);
    };

    // Start scanning and get cleanup function
    let stopScan: (() => void) | undefined;
    setupBLE().then(cleanupFn => {
      stopScan = cleanupFn;
    });

    // Clean up on component unmount
    return () => {
      if (stopScan) stopScan();
    };
  }, [handleDeviceFound]);

  // Auto-open URL if exactly one beacon is nearby
  useEffect(() => {
    if (nearbyBeacons.size === 1) {
      const name = Array.from(nearbyBeacons)[0];
      launchArtifactUrl(beaconToUrl[name]);
    }
  }, [nearbyBeacons]);

  // Handle selection from the beacon list
  const handleBeaconSelect = useCallback((beaconName: string) => {
    launchArtifactUrl(beaconToUrl[beaconName]);
  }, []);

  // Render appropriate UI based on number of beacons
  return (
    <SafeAreaView style={styles.container}>
      {nearbyBeacons.size === 0 ? (
        <Text style={styles.scanningText}>🔍 Scanning for Cham artifact beacons...</Text>
      ) : nearbyBeacons.size === 1 ? (
        <Text style={styles.openingText}>
          📖 Opening story for {getFormattedBeaconName(Array.from(nearbyBeacons)[0])}
        </Text>
      ) : (
        <BeaconList 
          beaconNames={Array.from(nearbyBeacons)} 
          onSelect={handleBeaconSelect} 
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scanningText: {
    fontSize: 16,
    textAlign: 'center',
  },
  openingText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
