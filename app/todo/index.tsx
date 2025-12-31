import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";

export default function TodoScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <Stack.Screen options={{ title: "To-Do" }} />

      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 16 }}>
          To-Do List
        </Text>

        {/* Input */}
        <TextInput
          placeholder="Add a task..."
          value={task}
          onChangeText={setTask}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        />

        {/* Add Button */}
        <Pressable
          onPress={addTask}
          style={{
            backgroundColor: "#000",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Add Task</Text>
        </Pressable>

        {/* List */}
        <FlatList
          data={tasks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 12,
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>{item}</Text>

              <Pressable onPress={() => deleteTask(index)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </>
  );
}
