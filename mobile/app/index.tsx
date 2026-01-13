import { router, Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  cardStyle: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  authCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#6366F1",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  authIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  authTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  authDesc: {
    color: "#E0E7FF",
    marginTop: 2,
    marginBottom: 10,
  },

  authBtnRow: {
    flexDirection: "row",
    gap: 10,
  },

  loginBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  signupBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  btnText: {
    fontWeight: "600",
    color: "#3730A3",
  },
});

import NetInfo from "@react-native-community/netinfo";
import { useAuth } from "./context/AuthContext";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";

export default function HomeScreen() {
  const { token, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <View style={[styles.container, { alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log("Is connected?", state.isConnected);
    });
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <View style={styles.container}>
        <Text style={styles.title}>{token ? "My Apps" : "Welcome"}</Text>

        <View style={{ gap: 16 }}>
          {!token && <AuthCard />}
          <Card path="/todo" icon="checkmark-circle-outline" color="#4CAF50" title="To-Do App" desc="Tasks & reminders" />
          <Card path="/calculator" icon="calculator-outline" color="#FF9800" title="Calculator" desc="Quick calculations" />
          <Card path="/expense" icon="wallet-outline" color="#E53935" title="Expense Tracker" desc="Track daily spending" />
          {token && (
            <Pressable onPress={logout} style={[styles.cardStyle, { marginTop: 20, backgroundColor: "#fee2e2" }]}>
              <View>
                <Text style={{ fontSize: 22 }}>
                  <Ionicons name="log-out-outline" size={28} color="#EF4444" />
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 4, color: "#EF4444" }}>Logout</Text>
                <Text style={{ color: "#EF4444", marginTop: 2 }}>Sign out of account</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#EF4444" />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
}

function Card({
  path,
  icon,
  title,
  desc,
  color,
}: {
  path: "/todo" | "/calculator" | "/expense" | "/auth/login";
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <Pressable onPress={() => router.push(path as any)} style={styles.cardStyle}>
      <View>
        <Text style={{ fontSize: 22 }}>
          <Ionicons name={icon} size={28} color={color} />
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 4 }}>{title}</Text>
        <Text style={{ color: "#666", marginTop: 2 }}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#999" />
    </Pressable>
  );
}

function AuthCard() {
  return (
    <Pressable
      onPress={() => router.push("/auth/login")}
      style={({ pressed }) => [styles.authCard, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <View style={styles.authIconWrap}>
          <Ionicons name="key-outline" size={26} color="#fff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.authTitle}>Authentication</Text>
          <Text style={styles.authDesc}>Login or create an account</Text>

          <View style={styles.authBtnRow}>
            <View style={styles.loginBtn}>
              <Text style={styles.btnText}>Login</Text>
            </View>
            <View style={styles.signupBtn}>
              <Text style={styles.btnText}>Sign Up</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

