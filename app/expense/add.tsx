import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack } from "expo-router";
import React, { useState, useContext } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ExpenseContext } from "../context/ExpenseContext";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#555",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#1f35dcb9",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 10,
  },
  modalItem: {
    padding: 12,
  },
  modalText: {
    fontSize: 16,
  },
});

export default function AddExpenseScreen() {
  const CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Other"];
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const expenseCtx = useContext(ExpenseContext);
  if (!expenseCtx) return null;

  const { addExpense } = expenseCtx;

  const handleSaveExpense = () => {
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
    <>
      <Stack.Screen options={{ title: "Add Expense" }} />
      <View style={styles.container}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="Enter amount"
          keyboardType="numeric"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Category</Text>
        <Pressable
          style={styles.input}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={{ color: category ? "#000" : "#999" }}>
            {category || "Select Category"}
          </Text>
        </Pressable>

        <Text style={styles.label}>Note</Text>
        <TextInput
          placeholder="Optional note"
          style={styles.input}
          value={note}
          onChangeText={setNote}
        />

        <Text style={styles.label}>Date</Text>
        <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text>{date.toDateString()}</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={handleSaveExpense}>
          <Text style={styles.btnText}>Save Expense</Text>
        </Pressable>
      </View>

      {showCategoryModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={styles.modalItem}
                onPress={() => {
                  setCategory(cat);
                  setShowCategoryModal(false);
                }}
              >
                <Text style={styles.modalText}>{cat}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

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
    </>
  );
}
