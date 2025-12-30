import { View, Text, Pressable } from "react-native";
import { router, Stack } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "600" }}>Choose App</Text>

        <Pressable
          onPress={() => router.push("/todo")}
          style={{
            width: 200,
            padding: 16,
            backgroundColor: "#000",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>To-Do App</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/calculator")}
          style={{
            width: 200,
            padding: 16,
            backgroundColor: "#ff9500",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Calculator</Text>
        </Pressable>
      </View>
    </>
  );
}
