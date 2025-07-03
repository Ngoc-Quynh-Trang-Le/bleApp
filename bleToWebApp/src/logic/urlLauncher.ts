import { Linking } from 'react-native';

// Always try to open the URL directly for standard web links
export async function launchArtifactUrl(url: string): Promise<boolean> {
  try {
    await Linking.openURL(url);
    return true;
  } catch (error) {
    console.error("Error opening URL:", error);
    return false;
  }
}

