/**
 * Mapping between BLE beacon names and their corresponding story URLs
 */

export const beaconToUrl: Record<string, string> = {
  //"Cham_Dancing_Shiva": "https://namhung276.github.io/Indigenous_Cipheria/Cham_Dancing_Shiva.html",
  //"Ancient_Cham_Tower": "https://namhung276.github.io/Indigenous_Cipheria/Ancient_Cham_Tower.html",
  "TraKieu_Apsara_Relief": "https://namhung276.github.io/Indigenous_Cipheria/Vu_Nu_Apsara.html",
  "Tara_Bodhisattva_Statue": "https://namhung276.github.io/Indigenous_Cipheria/Bo_Tat_Tara.html"
};

/**
 * Format beacon name for display (replace underscores with spaces)
 */
export function getFormattedBeaconName(beaconName: string): string {
  return beaconName.replace(/_/g, ' ');
}