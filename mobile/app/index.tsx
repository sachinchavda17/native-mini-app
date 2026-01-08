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
});

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <View style={styles.container}>
        <Text style={styles.title}>Choose App</Text>
        <View style={{ gap: 16 }}>
          <Card
            path="/todo"
            icon="checkmark-circle-outline"
            color="#4CAF50"
            title="To-Do App"
            desc="Tasks & reminders"
          />
          <Card
            path="/calculator"
            icon="calculator-outline"
            color="#FF9800"
            title="Calculator"
            desc="Quick calculations"
          />
          <Card
            path="/expense"
            icon="wallet-outline"
            color="#E53935"
            title="Expense Tracker"
            desc="Track daily spending"
          />
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
  path: "/todo" | "/calculator" | "/expense";
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <Pressable onPress={() => router.push(path)} style={styles.cardStyle}>
      <View>
        <Text style={{ fontSize: 22 }}>
          <Ionicons name={icon} size={28} color={color} />
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 4 }}>
          {title}
        </Text>
        <Text style={{ color: "#666", marginTop: 2 }}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#999" />
    </Pressable>
  );
}
