import { router, Stack } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
  },
  innerContainer: {},

  title: {
    fontSize: 20,
    fontWeight: "bold",
    // margin: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: "#1f35dcb9",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },

  text: {
    textAlign: "left",
  },
  btnContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});

const ExpenseScreen = () => {
  const expenseCtx = useContext(ExpenseContext);
  if (!expenseCtx) return null;
  const { expenses } = expenseCtx;

  let totalAmount = 0;
  expenses.forEach((item) => {
    totalAmount += item.amount;
  });

  return (
    <>
      <Stack.Screen options={{ title: "Expenses" }} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Expense Today</Text>
          <Text style={styles.title}>
            Total: <Text style={{ color: "#1f35dcb9" }}>₹{totalAmount}</Text>
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.innerContainer}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
        >
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <View key={expense.id} style={styles.box}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {expense.category}
                  </Text>
                  <Text style={{ color: "#666" }}>{expense.note}</Text>
                  <Text style={{ color: "#999", fontSize: 12 }}>
                    {expense.date}
                  </Text>
                </View>

                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  ₹{expense.amount}
                </Text>
              </View>
            ))
          ) : (
            <Text
              style={{
                textAlign: "center",
                marginTop: 50,
              }}
            >
              No expenses added yet.
            </Text>
          )}
        </ScrollView>
        <View style={styles.btnContainer}>
          <Pressable
            style={styles.btn}
            onPress={() => router.push("/expense/add")}
          >
            <Text style={styles.btnText}>+ Add Expense</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default ExpenseScreen;
