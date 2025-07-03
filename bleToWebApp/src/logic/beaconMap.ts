/**
 * Mapping between BLE beacon names and their corresponding story URLs
 */

export const beaconToUrl: Record<string, string> = {
  // "TraKieu_Apsara_Relief": "https://mercury.swin.edu.au/cos10025/project-group1/TraKieu_Apsara_Relief.html",
  // "Tara_Bodhisattva_Statue": "https://mercury.swin.edu.au/cos10025/project-group1/Tara_Bodhisattva_Statue.html",
  "TraKieu_Apsara_Relief": "https://google.com",
  "Tara_Bodhisattva_Statue": "https://youtube.com",
  "Cham_Dancing_Shiva": "https://mercury.swin.edu.au/cos10025/project-group1/Cham_Dancing_Shiva.html",
  "Ancient_Cham_Tower": "https://mercury.swin.edu.au/cos10025/project-group1/Ancient_Cham_Tower.html"
};

/**
 * Format beacon name for display (replace underscores with spaces)
 */
export function getFormattedBeaconName(beaconName: string): string {
  return beaconName.replace(/_/g, ' ');
}