import { createContext, useState, useEffect, useCallback, useRef } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { syncExpense, pullExpenses, deleteExpense } from "@/app/utils/expenseApi";

//  TYPES

export type Expense = {
  local_id: string;
  amount: number;
  category: string;
  note?: string;
  date: string; // ISO string
  updated_at: string; // ISO string
  is_deleted?: boolean;
  needsSync?: boolean; // local-only
};

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "local_id" | "updated_at" | "needsSync" | "is_deleted">) => void;
  removeExpense: (local_id: string) => void;
  syncExpenses: () => Promise<void>;
};

export const ExpenseContext = createContext<ExpenseContextType | null>(null);

//  CONSTANTS & HELPERS

const STORAGE_KEY = "EXPENSES_V2";
const LAST_SYNC_KEY = "LAST_SYNC";

const nowISO = () => new Date().toISOString();

const generateLocalId = () => `exp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

//  PROVIDER

export default function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isOnline, setIsOnline] = useState(false);

  //  LOAD FROM STORAGE
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setExpenses(JSON.parse(stored));
        }
      } catch (e) {
        console.log("Failed to load expenses", e);
      }
    };

    loadExpenses();
  }, []);

  //  SAVE TO STORAGE
  useEffect(() => {
    const persist = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (e) {
        console.log("Failed to save expenses", e);
      }
    };

    persist();
  }, [expenses]);

  //  NETWORK STATUS
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  //  ADD EXPENSE
  const addExpense = (expenseInput: Omit<Expense, "local_id" | "updated_at" | "needsSync" | "is_deleted">) => {
    const expense: Expense = {
      ...expenseInput,
      local_id: generateLocalId(),
      updated_at: nowISO(),
      needsSync: true,
      is_deleted: false,
    };

    setExpenses((prev) => [expense, ...prev]);

    // fire-and-forget
    if (isOnline) {
      syncSingleExpense(expense);
    }
  };

  //  REMOVE (SOFT DELETE)
  const removeExpense = (local_id: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.local_id === local_id
          ? {
              ...e,
              is_deleted: true,
              updated_at: nowISO(),
              needsSync: true,
            }
          : e
      )
    );

    if (isOnline) {
      syncDeleteExpense(local_id);
    }
  };

  //  SYNC SINGLE EXPENSE
  const syncSingleExpense = async (expense: Expense) => {
    try {
      await syncExpense(expense);

      setExpenses((prev) => prev.map((e) => (e.local_id === expense.local_id ? { ...e, needsSync: false } : e)));
    } catch {
      // keep needsSync = true
    }
  };

  //  SYNC DELETE
  const syncDeleteExpense = async (local_id: string) => {
    try {
      await deleteExpense(local_id);
    } catch {
      // retry later
    }
  };

  //  FULL SYNC (RETRY + PULL)

  const expensesRef = useRef(expenses);

  useEffect(() => {
    expensesRef.current = expenses;
  }, [expenses]);

  //  FULL SYNC (RETRY + PULL)
  const syncExpenses = useCallback(async () => {
    if (!isOnline) return;

    //  PUSH LOCAL CHANGES FIRST
    const currentExpenses = expensesRef.current;
    const pending = currentExpenses.filter((e) => e.needsSync);

    for (const expense of pending) {
      try {
        if (expense.is_deleted) {
          await deleteExpense(expense.local_id);
        } else {
          await syncExpense(expense);
        }

        setExpenses((prev) => prev.map((e) => (e.local_id === expense.local_id ? { ...e, needsSync: false } : e)));
      } catch {
        // still pending
      }
    }

    // PULL REMOTE CHANGES
    const lastSync = await AsyncStorage.getItem(LAST_SYNC_KEY);
    const remoteExpenses = await pullExpenses(lastSync || undefined);

    setExpenses((local) => {
      const map = new Map(local.map((e) => [e.local_id, e]));

      for (const remote of remoteExpenses) {
        const localExp = map.get(remote.local_id);

        if (!localExp || remote.updated_at > localExp.updated_at) {
          map.set(remote.local_id, {
            ...remote,
            needsSync: false,
          });
        }
      }

      return Array.from(map.values());
    });

    await AsyncStorage.setItem(LAST_SYNC_KEY, nowISO());
  }, [isOnline]);

  // Trigger sync when coming online
  useEffect(() => {
    if (isOnline) {
      syncExpenses();
    }
  }, [isOnline, syncExpenses]);

  //  PROVIDER
  return (
    <ExpenseContext.Provider
      value={{
        expenses: expenses.filter((e) => !e.is_deleted),
        addExpense,
        removeExpense,
        syncExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

