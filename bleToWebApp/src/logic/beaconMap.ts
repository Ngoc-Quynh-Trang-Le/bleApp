/**
 * Maps beacon names to their corresponding URLs
 * Update this when adding new artifacts to the museum
 */
export const beaconToUrl: Record<string, string> = {
  'TraKieu_Apsara_Relief': 'https://google.com',
  'Tara_Bodhisattva_Statue': 'https://youtube.com',
};

/**
 * Maps beacon names to human-readable artifact names
 * Used for display in the UI
 */
export const beaconToName: Record<string, string> = {
  'TraKieu_Apsara_Relief': 'Trà Kiệu Apsara Relief',
  'Tara_Bodhisattva_Statue': 'Tara Bodhisattva Statue',
};

/**
 * Gets the formatted name for a beacon
 * @param beaconName The beacon identifier
 * @returns Formatted human-readable name
 */
export function getFormattedBeaconName(beaconName: string): string {
  return beaconToName[beaconName] || beaconName.replace(/_/g, ' ');
}