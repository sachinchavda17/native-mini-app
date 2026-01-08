import { Stack } from "expo-router";
import ExpenseProvider from "../context/ExpenseContext";

export default function ExpenseLayout() {
  return (
    <ExpenseProvider>
      <Stack />
    </ExpenseProvider>
  );
}

