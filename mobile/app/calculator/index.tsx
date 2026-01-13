import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import CalcButton from "../components/CalcBtn";
import styles from "../styles/calc";

export default function CalculatorScreen() {
  const [expression, setExpression] = useState("");
  const [current, setCurrent] = useState("");
  const [result, setResult] = useState("");

  const displayValue = result || current || "0";

  const resultScale = useRef(new Animated.Value(1)).current;

  const animateResult = () => {
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
  };

  const handleNumberPress = (btn: string) => {
    if (result) {
      setResult("");
      setExpression("");
      if (btn === ".") setCurrent("0.");
      else if (btn === "00") setCurrent("0");
      else setCurrent(btn);
      return;
    }

    if (btn === ".") {
      if (current.includes(".")) return;
      setCurrent((prev) => (prev === "" ? "0." : prev + "."));
      return;
    }

    if (btn === "00") {
      if (current === "" || current === "0") setCurrent("0");
      else setCurrent((prev) => prev + "00");
      return;
    }

    if (current.length >= 15) return;

    if (current === "0") setCurrent(btn);
    else setCurrent((prev) => prev + btn);
  };

  const evaluateExpression = (expr: string): string => {
    try {
      const tokens = expr.trim().split(/\s+/);
      if (tokens.length === 0) return "0";

      let res = parseFloat(tokens[0]);
      if (isNaN(res)) return "Error";

      for (let i = 1; i < tokens.length; i += 2) {
        const op = tokens[i];
        const valStr = tokens[i + 1];

        if (!valStr && op !== "%") break;

        const val = parseFloat(valStr);

        switch (op) {
          case "+":
            res += val;
            break;
          case "-":
            res -= val;
            break;
          case "*":
            res *= val;
            break;
          case "/":
            if (val === 0) return "Error";
            res /= val;
            break;
          case "%":
            // Percentage logic: if it's the last token or followed by another op
            // e.g., "100 + 10 %" -> 100 + (100 * 0.1) = 110
            // e.g., "100 * 10 %" -> 100 * 0.1 = 10
            // For simplicity in this UI, we'll treat % as (prev * (current/100))
            // but the tokens are [100, +, 10, %].
            // Let's use a simpler rule: val % means (val/100)
            if (i > 0) {
              const prevOp = tokens[i - 1];
              if (prevOp === "+" || prevOp === "-") {
                // 100 + 10% = 100 + (100 * 0.1)
                // But our loop already added 10 to res if we are at %
                // This is tricky. Let's stick to a simpler left-to-right:
                // 100 + 10 = 110, then 110 % = 1.1
                res = res / 100;
              } else {
                res = res / 100;
              }
            } else {
              res = res / 100;
            }
            i--; // % only consumed itself in this logic
            break;
        }
      }
      return Number(res.toFixed(7)).toString();
    } catch (e) {
      return "Error";
    }
  };

  const handleOperatorPress = (op: string) => {
    if (result && result !== "Error") {
      setExpression(result + " " + op + " ");
      setResult("");
      setCurrent("");
      return;
    }

    if (!current && !expression) return;

    if (current) {
      const normalizedCurrent = current === "." ? "0" : current;
      setExpression((prev) => prev + normalizedCurrent + " " + op + " ");
      setCurrent("");
    } else if (expression) {
      setExpression((prev) => prev.trim().split(" ").slice(0, -1).join(" ") + " " + op + " ");
    }
  };

  const handleEqualPress = () => {
    if (!current && !expression) return;

    const finalExpr = expression + (current || "");
    const res = evaluateExpression(finalExpr);

    setExpression(finalExpr);
    setResult(res);
    setCurrent("");
    animateResult();
  };

  const clearAll = () => {
    setExpression("");
    setCurrent("");
    setResult("");
  };

  const handleBackspace = () => {
    if (result) {
      setResult("");
      setExpression("");
      return;
    }
    if (current) {
      setCurrent((prev) => prev.slice(0, -1));
    } else if (expression) {
      const tokens = expression.trim().split(" ");
      tokens.pop(); // Remove operator
      setExpression(tokens.join(" ") + (tokens.length > 0 ? " " : ""));
    }
  };

  const buttons = [
    ["AC", "⌫", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", "00", ".", "="],
  ];

  const handleBtnPress = (btn: string) => {
    if (!isNaN(Number(btn)) || btn === "." || btn === "00") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      handleNumberPress(btn);
    } else if (["+", "-", "*", "/", "%"].includes(btn)) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      handleOperatorPress(btn);
    } else if (btn === "=") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      handleEqualPress();
    } else if (btn === "AC") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      clearAll();
    } else if (btn === "⌫") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      handleBackspace();
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Calculator" }} />

      <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 20 }}>
        {/* Display */}
        <View style={styles.display}>
          {!!expression && (
            <Text numberOfLines={1} ellipsizeMode="head" style={{ fontSize: 20, color: "#888", marginBottom: 6 }}>
              {expression}
            </Text>
          )}

          <Animated.Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 56, fontWeight: "600", transform: [{ scale: resultScale }] }}>
            {displayValue}
          </Animated.Text>
        </View>

        {/* Buttons */}
        <View style={{ width: "100%" }}>
          {buttons.map((row, rIdx) => (
            <View key={rIdx} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              {row.map((btn, bIdx) => (
                <CalcButton key={bIdx} label={btn} isEqual={btn === "="} onPress={() => handleBtnPress(btn)} />
              ))}
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

