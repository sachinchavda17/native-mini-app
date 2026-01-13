import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { checkForUpdate } from "./utils/UpdateCheck";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout() {
  useEffect(() => {
    checkForUpdate();
  }, []);
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

