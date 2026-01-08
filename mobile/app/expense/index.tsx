import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React, { useContext } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { ExpenseContext } from "../context/ExpenseContext";
import styles from "../styles/expense";

const CATEGORY_ICONS: { [key: string]: any } = {
  Food: { name: "fast-food", color: "#FF6B6B", type: "Ionicons" },
  Travel: { name: "car", color: "#4D96FF", type: "Ionicons" },
  Shopping: { name: "cart", color: "#FFD93D", type: "Ionicons" },
  Bills: { name: "receipt", color: "#6BCB77", type: "Ionicons" },
  Other: { name: "ellipsis-horizontal-circle", color: "#9E9E9E", type: "Ionicons" },
};

const ExpenseScreen = () => {
  const expenseCtx = useContext(ExpenseContext);
  if (!expenseCtx) return null;
  const { expenses, removeExpense } = expenseCtx;

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  const renderIcon = (category: string) => {
    const config = CATEGORY_ICONS[category] || CATEGORY_ICONS["Other"];
    return (
      <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
        <Ionicons name={config.name} size={24} color={config.color} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Expenses" }} />
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Expense</Text>
          <Text style={styles.summaryAmount}>₹{totalAmount.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryIconContainer}>
          <Ionicons name="wallet-outline" size={32} color="#6366F1" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.expenseList}>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <View key={expense.id} style={styles.expenseCard}>
              {renderIcon(expense.category)}
              <View style={styles.expenseInfo}>
                <Text style={styles.categoryText}>{expense.category}</Text>
                {expense.note ? (
                  <Text style={styles.noteText} numberOfLines={1}>
                    {expense.note}
                  </Text>
                ) : null}
                <Text style={styles.dateText}>{expense.date}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.amountText}>₹{expense.amount.toLocaleString()}</Text>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => removeExpense(expense.id),
                      },
                    ]);
                  }}
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color="#E5E7EB" />
            <Text style={styles.emptyText}>No expenses recorded yet</Text>
          </View>
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => router.push("/expense/add")}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </Pressable>
    </View>
  );
};

export default ExpenseScreen;

