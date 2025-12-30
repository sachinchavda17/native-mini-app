import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const style = StyleSheet.create({
    text: {
      backgroundColor: "#fff",
      color: "#000",
      fontSize: 40,
      borderRadius: 5,
      textAlign: "center",
      textAlignVertical: "center",
      padding: 1,
      margin: 2,
      width: 75,
      height: 75,
      lineHeight: 75,
    },
    operatorActive: {
      backgroundColor: "#222",
      color: "#fff",
    },
  });

  const buttons = [
    ["C", "⌫", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "00", ".", "="],
  ];

  const handleNumberPress = (btn: string) => {
    // If result exists, start new calculation
    if (result) {
      // Start completely fresh after =
      setResult("");
      setPreviousValue(null);
      setOperator(null);
      setOperation("");
      setInput(btn === "." ? "0." : btn);
      return;
    }

    if (btn === "." && input.includes(".")) return;

    if (input === "0" && btn !== ".") {
      setInput(btn);
      setOperation(operation.slice(0, -1) + btn);
      return;
    }

    setInput(input + btn);
    setOperation((prev) => prev + btn);
  };

  const handleOperatorPress = (btn: string) => {
    // If result exists, continue from it
    if (result) {
      setPreviousValue(result);
      setOperator(btn);
      setOperation(result + btn);
      setInput("");
      setResult("");
      return;
    }

    if (input === "") return;

    setPreviousValue(input);
    setOperator(btn);
    setInput("");
    setOperation((prev) => prev + btn);
  };


  

  const handleEqualPress = (btn: string) => {
    if (!previousValue || !operator || input === "") return;
    const a = parseFloat(previousValue);
    const b = parseFloat(input);

    let calculationResult = 0;
    switch (operator) {
      case "+":
        calculationResult = a + b;
        break;
      case "-":
        calculationResult = a - b;
        break;
      case "*":
        calculationResult = a * b;
        break;
      case "/":
        calculationResult = b !== 0 ? a / b : 0;
        break;
      case "%":
        calculationResult = a % b;
        break;
      default:
        return;
    }
    setResult(calculationResult.toString());
    setPreviousValue(null);
    setOperator(null);
    setInput("");
  };

  const hanldeClearPress = (btn: string) => {
    setInput("");
    setPreviousValue(null);
    setOperator(null);
    setOperation("");
    setResult("");
  };
  const handleBackspacePress = () => {
    // If result is shown, clear it
    if (result) {
      setResult("");
      setOperation("");
      return;
    }

    // If input is empty, do nothing
    if (!input) return;

    // Remove last character
    setInput(input.slice(0, -1));

    // Keep operation string in sync
    setOperation(operation.slice(0, -1));
  };

  return (
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
        {!!result && (
          <Text style={{ flex: 1, color: "#000", fontSize: 50 }}>{result}</Text>
        )}
        {!!operation && (
          <Text style={{ flex: 1, color: "#000", fontSize: 45 }}>
            {operation}
          </Text>
        )}
        <Text style={{ flex: 1, color: "#000", fontSize: 40 }}>
          {input ? input : "0"}
        </Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {buttons.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            {row.map((btn) => (
              <Pressable
                key={btn}
                onPress={() => {
                  if (!isNaN(Number(btn)) || btn === "." || btn === "00") {
                    handleNumberPress(btn);
                  } else if (["+", "-", "*", "/", "%"].includes(btn)) {
                    handleOperatorPress(btn);
                  } else if (btn === "=") {
                    handleEqualPress(btn);
                  } else if (btn === "C") {
                    hanldeClearPress(btn);
                  } else if (btn === "⌫") {
                    handleBackspacePress();
                  }
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text
                  style={[
                    style.text,
                    operator === btn && style.operatorActive,
                    btn === "=" && {
                      backgroundColor: "#ff9500",
                      color: "#fff",
                    },
                  ]}
                >
                  {btn}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
