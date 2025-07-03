export type BeaconInfo = {
  name: string;
  lastSeen: Date;
};
export type BeaconMap = Record<string, BeaconInfo>;
