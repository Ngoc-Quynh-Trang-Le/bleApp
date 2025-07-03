const cooldowns: Record<string, Date> = {};
const COOLDOWN_MS = 30000; // 30 seconds cooldown

/**
 * Checks if a device can trigger an action based on cooldown period
 * @param deviceName The name of the BLE device/beacon
 * @returns true if enough time has passed since last trigger
 */
export function canTrigger(deviceName: string): boolean {
  const now = new Date();
  const lastTime = cooldowns[deviceName];
  
  if (!lastTime || now.getTime() - lastTime.getTime() > COOLDOWN_MS) {
    cooldowns[deviceName] = now;
    return true;
  }
  
  return false;
}
