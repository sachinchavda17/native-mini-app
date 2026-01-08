import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { todoStyles } from "../styles/todo";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}
const STORAGE_KEY = "MY_TASKS";

export default function TodoScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setTasks(JSON.parse(stored));
      } catch (e) {
        console.log("Failed to load tasks", e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: task.trim(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTask("");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const addButtonScale = useRef(new Animated.Value(1)).current;

  const animatePressIn = () => {
    Animated.spring(addButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const animatePressOut = () => {
    Animated.spring(addButtonScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const renderEmptyState = () => (
    <View style={todoStyles.emptyContainer}>
      <Ionicons name="clipboard-outline" size={80} color="#dee2e6" />
      <Text style={todoStyles.emptyText}>No tasks yet</Text>
      <Text style={todoStyles.emptySubtext}>Add a task to get started!</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Tasks",
          // headerLargeTitle: true,
          // headerShadowVisible: false,
          // headerStyle: { backgroundColor: "#f8f9fa" },
        }}
      />

      <View style={todoStyles.container}>
        {/* Input Area */}
        <View style={todoStyles.inputContainer}>
          <TextInput
            placeholder="What needs to be done?"
            placeholderTextColor="#adb5bd"
            value={task}
            onChangeText={setTask}
            style={todoStyles.input}
            onSubmitEditing={addTask}
          />
          <Animated.View style={{ transform: [{ scale: addButtonScale }] }}>
            <Pressable onPressIn={animatePressIn} onPressOut={animatePressOut} onPress={addTask} style={todoStyles.addButton}>
              <Ionicons name="add" size={30} color="#fff" />
            </Pressable>
          </Animated.View>
        </View>

        {/* Task List */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={todoStyles.listContainer}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Animated.View style={todoStyles.taskCard}>
              <Pressable onPress={() => toggleTask(item.id)} style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <Ionicons name={item.completed ? "checkbox" : "square-outline"} size={24} color={item.completed ? "#40c057" : "#adb5bd"} />
                <View style={todoStyles.taskTextContainer}>
                  <Text style={[todoStyles.taskText, item.completed && todoStyles.completedTaskText]}>{item.text}</Text>
                </View>
              </Pressable>

              <Pressable onPress={() => deleteTask(item.id)} style={todoStyles.deleteButton}>
                <Ionicons name="trash-outline" size={20} color="#fa5252" />
              </Pressable>
            </Animated.View>
          )}
        />
      </View>
    </>
  );
}

