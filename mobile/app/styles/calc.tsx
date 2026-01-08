import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BUTTON_SIZE = (SCREEN_WIDTH - 20 * 2 - 6 * 3) / 4;

const styles = StyleSheet.create({
  display: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 16,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    lineHeight: BUTTON_SIZE,
    borderRadius: 16,
    marginBottom: 6,
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 28,
    textAlign: "center",
    textAlignVertical: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  equal: {
    backgroundColor: "#ff9500",
    color: "#fff",
    fontWeight: "600",
  },
});

export default styles;

