import { Linking } from 'react-native';

export async function launchArtifactUrl(url: string): Promise<boolean> {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
      return true;
    } else {
      console.warn("Cannot open URL:", url);
      return false;
    }
  } catch (error) {
    console.error("Error opening URL:", error);
    return false;
  }
}
  

