import { Text, View } from "react-native";

export default function InputView({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}
