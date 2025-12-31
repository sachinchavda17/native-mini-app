import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Expense = {
  id: string;
  amount: number;
  category: string;
  note: string;
  date: string;
};

const STORAGE_KEY = "EXPENSES";

export const ExpenseContext = createContext<{
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
} | null>(null);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setExpenses(JSON.parse(stored));
      } catch (e) {
        console.log("Failed to load expenses", e);
      }
    };
    loadExpenses();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}
