import { Animated, Pressable, Text } from "react-native";
import { useRef } from "react";
import styles  from "../styles/calc";

export default function CalcButton({ label, onPress, isEqual }: { label: string; onPress: () => void; isEqual?: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable onPressIn={pressIn} onPressOut={pressOut}>
        <Text style={[styles.button, isEqual && styles.equal]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

