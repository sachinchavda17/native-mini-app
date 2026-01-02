import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Alert, Linking } from "react-native";

const VERSION_URL = "https://raw.githubusercontent.com/sachinchavda17/native-mini-app/main/version.json";

export async function checkForUpdate() {
  try {
    const res = await fetch(VERSION_URL);
    const { latest, apkUrl } = await res.json();

    const currentVersion = Constants.expoConfig?.version || "1.0.0";

    if (currentVersion === latest) return;

    const key = `update_prompt_shown_${latest}`;
    const shown = await AsyncStorage.getItem(key);
    if (shown) return;

    Alert.alert("Update Available", `A new version (${latest}) is available.`, [
      { text: "Update", onPress: () => Linking.openURL(apkUrl) },
      { text: "Later", style: "cancel" },
    ]);

    await AsyncStorage.setItem(key, "true");
  } catch (e) {
    console.log("Update check failed", e);
  }
}

