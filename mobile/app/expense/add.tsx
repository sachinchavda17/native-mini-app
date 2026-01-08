import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, Stack } from "expo-router";
import React, { useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { ExpenseContext } from "../context/ExpenseContext";
import styles from "../styles/add";

const CATEGORIES = [
  { name: "Food", icon: "fast-food", color: "#FF6B6B" },
  { name: "Travel", icon: "car", color: "#4D96FF" },
  { name: "Shopping", icon: "cart", color: "#FFD93D" },
  { name: "Bills", icon: "receipt", color: "#6BCB77" },
  { name: "Other", icon: "ellipsis-horizontal-circle", color: "#9E9E9E" },
];

export default function AddExpenseScreen() {
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const expenseCtx = useContext(ExpenseContext);
  if (!expenseCtx) return null;

  const { addExpense } = expenseCtx;

  const handleSaveExpense = () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Please enter a valid amount.");
      return;
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }

    addExpense({
      id: Date.now().toString(),
      amount: Number(amount),
      category,
      note,
      date: date.toISOString().slice(0, 10),
    });

    router.back();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Stack.Screen
        options={{
          title: "Add Expense",
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="cash-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.name}
                style={[styles.categoryItem, category === cat.name && styles.categoryItemSelected]}
                onPress={() => {
                  setCategory(cat.name);
                  Keyboard.dismiss();
                }}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: `${cat.color}15` }]}>
                  <Ionicons name={cat.icon as any} size={24} color={cat.color} />
                </View>
                <Text style={[styles.categoryText, category === cat.name && styles.categoryTextSelected]}>{cat.name}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Note</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="create-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput placeholder="What was this for?" placeholderTextColor="#9CA3AF" style={styles.input} value={note} onChangeText={setNote} />
          </View>

          <Text style={styles.label}>Date</Text>
          <Pressable
            style={styles.dateButton}
            onPress={() => {
              Keyboard.dismiss();
              setShowDatePicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </Pressable>

          <Pressable style={styles.saveButton} onPress={handleSaveExpense}>
            <Text style={styles.saveButtonText}>Save Expense</Text>
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

