/**
 * Manages cooldown periods to prevent spam-opening of URLs
 */

const COOLDOWN_DURATION_MS = 30000; // 30 seconds
const lastTriggered: Record<string, number> = {}

/**
 * Check if a beacon can trigger URL opening (not in cooldown)
 */
export function canTrigger(beaconName: string): boolean {
  const now = Date.now();
  const lastTime = lastTriggered[beaconName] || 0;
  
  if (now - lastTime >= COOLDOWN_DURATION_MS) {
    lastTriggered[beaconName] = now;
    return true;
  }
  
  return false;
}

/**
 * Reset cooldown for a specific beacon (for testing)
 */
export function resetCooldown(beaconName: string): void {
  delete lastTriggered[beaconName];
}

/**
 * Reset all cooldowns (for testing)
 */
export function resetAllCooldowns(): void {
  Object.keys(lastTriggered).forEach(key => delete lastTriggered[key]);
}
