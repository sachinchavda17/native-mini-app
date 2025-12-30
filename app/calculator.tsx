import * as Haptics from "expo-haptics";
import { useReducer } from "react";
import { Animated, Text, View } from "react-native";
import CalcButton from "./components/CalcBtn";
import { Stack } from "expo-router";

export default function CalculatorScreen() {
  type CalcState = {
    input: string;
    operation: string;
    previousValue: string | null;
    operator: string | null;
    result: string;
  };

  const initialState: CalcState = {
    input: "",
    operation: "",
    previousValue: null,
    operator: null,
    result: "",
  };

  type CalcAction =
    | { type: "PRESS_NUMBER"; payload: string }
    | { type: "PRESS_OPERATOR"; payload: string }
    | { type: "PRESS_EQUAL" }
    | { type: "CLEAR" }
    | { type: "BACKSPACE" };

  function calculatorReducer(state: CalcState, action: CalcAction): CalcState {
    switch (action.type) {
      case "PRESS_NUMBER": {
        const btn = action.payload;

        // Start fresh after result
        if (state.result) {
          return {
            ...initialState,
            input: btn === "." ? "0." : btn,
          };
        }

        if (btn === "." && state.input.includes(".")) return state;

        if (state.input === "0" && btn !== ".") {
          return {
            ...state,
            input: btn,
            operation: state.operation.slice(0, -1) + btn,
          };
        }

        return {
          ...state,
          input: state.input + btn,
          operation: state.operation + btn,
        };
      }

      case "PRESS_OPERATOR": {
        const btn = action.payload;

        if (state.operator && !state.input) {
          // replace operator instead of stacking
          return {
            ...state,
            operator: btn,
            operation: state.operation.slice(0, -1) + btn,
          };
        }

        // Continue from result
        if (state.result) {
          return {
            ...state,
            previousValue: state.result,
            operator: btn,
            operation: state.result + btn,
            input: "",
            result: "",
          };
        }

        if (!state.input) return state;

        return {
          ...state,
          previousValue: state.input,
          operator: btn,
          operation: state.operation + btn,
          input: "",
        };
      }

      case "PRESS_EQUAL": {
        if (!state.previousValue || !state.operator || !state.input)
          return state;

        const a = parseFloat(state.previousValue);
        const b = parseFloat(state.input);

        let res = 0;
        switch (state.operator) {
          case "+":
            res = a + b;
            break;
          case "-":
            res = a - b;
            break;
          case "*":
            res = a * b;
            break;
          case "/":
            res = b !== 0 ? a / b : 0;
            break;
          case "%":
            res = a * (b / 100);
            break;
        }

        res = Number(res.toFixed(7));

        return {
          ...state,
          result: res.toString(),
          previousValue: null,
          operator: null,
          input: "",
        };
      }

      case "BACKSPACE": {
        if (state.result) {
          return {
            ...state,
            result: "",
            operation: "",
          };
        }

        if (!state.input) return state;

        return {
          ...state,
          input: state.input.slice(0, -1),
          operation: state.operation.slice(0, -1),
        };
      }

      case "CLEAR":
        return initialState;

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const resultScale = new Animated.Value(1);

  if (state.result) {
    Animated.sequence([
      Animated.timing(resultScale, {
        toValue: 1.15,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(resultScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const buttons = [
    ["C", "⌫", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "00", ".", "="],
  ];

  return (
    <>
      <Stack.Screen options={{ title: "Calculator" }} />
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#fff",
            padding: 20,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {!!state.result && (
            <Animated.Text
              style={{
                fontSize: 50,
                transform: [{ scale: resultScale }],
              }}
            >
              {state.result}
            </Animated.Text>
          )}
          {!!state.operation && (
            <Text style={{ flex: 1, color: "#000", fontSize: 45 }}>
              {state.operation}
            </Text>
          )}
          <Text style={{ flex: 1, color: "#000", fontSize: 40 }}>
            {state.input ? state.input : "0"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {buttons.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={{ flexDirection: "row", flexWrap: "wrap" }}
            >
              {row.map((btn) => (
                <CalcButton
                  label={btn}
                  isActive={state.operator === btn}
                  isEqual={btn === "="}
                  onPress={() => {
                    // Numbers
                    if (!isNaN(Number(btn)) || btn === "." || btn === "00") {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      dispatch({ type: "PRESS_NUMBER", payload: btn });
                    }

                    // Operators
                    else if (["+", "-", "*", "/", "%"].includes(btn)) {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      dispatch({ type: "PRESS_OPERATOR", payload: btn });
                    }

                    // Equal
                    else if (btn === "=") {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                      dispatch({ type: "PRESS_EQUAL" });
                    }

                    // Clear
                    else if (btn === "C") {
                      Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Warning
                      );
                      dispatch({ type: "CLEAR" });
                    }

                    // Backspace
                    else if (btn === "⌫") {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      dispatch({ type: "BACKSPACE" });
                    }
                  }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
