// This component displays a list of nearby beacons (artifacts)
// It allows the user to select one to view more details
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getFormattedBeaconName } from '../logic/beaconMap';

type Props = {
  beaconNames: string[];
  onSelect: (name: string) => void;
};

export default function BeaconList({ beaconNames, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Multiple artifacts nearby. Choose one:
      </Text>
      <FlatList
        data={beaconNames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={styles.item}
          >
            <Text style={styles.itemText}>
              📍 {getFormattedBeaconName(item)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#eee',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  }
});
