import { Animated, Pressable, Text } from "react-native";
import { styles } from "../styles/calc";

export default function CalcButton({
  label,
  onPress,
  isActive,
  isEqual,
}: {
  label: string;
  onPress: () => void;
  isActive?: boolean;
  isEqual?: boolean;
}) {
  const scale = new Animated.Value(1);

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();

    onPress();
  };

  

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable onPressIn={pressIn} onPressOut={pressOut}>
        <Text
          style={[
            styles.text,
            isActive && styles.operatorActive,
            isEqual && styles.equal,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
