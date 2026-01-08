import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { checkForUpdate } from "./utils/UpdateCheck";

export default function RootLayout() {
  useEffect(() => {
    checkForUpdate();
  }, []);
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
