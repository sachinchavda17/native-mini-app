import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { apiFetch } from "../utils/api";

const { width } = Dimensions.get("window");

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoading(true);

    try {
      const nameParts = name.trim().split(" ");
      const first_name = nameParts[0];
      const last_name = nameParts.slice(1).join(" ") || "";

      await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({
          first_name,
          last_name: last_name || first_name, // Fallback if no last name provided
          email,
          password,
        }),
      });

      Alert.alert("Success", "Account created successfully", [{ text: "OK", onPress: () => router.replace("/auth/login") }]);
    } catch (error: any) {
      console.error("Register error:", error);
      Alert.alert("Registration Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Decorative Circles */}
      <View style={[styles.circle, styles.circleTop]} />
      <View style={[styles.circle, styles.circleBottom]} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Animated.View entering={FadeInUp.delay(200).duration(1000)} style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your journey with us</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000)} style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
              <Ionicons name="checkmark-circle" size={20} color="#6366F1" style={styles.checkIcon} />
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerButtonText}>Sign Up</Text>}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(1000)} style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.signinText}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    position: "relative",
  },
  circle: {
    position: "absolute",
    width: width,
    height: width,
    borderRadius: width / 2,
    opacity: 0.1,
  },
  circleTop: {
    backgroundColor: "#10B981", // Emerald
    top: -width / 2,
    right: -width / 4,
  },
  circleBottom: {
    backgroundColor: "#6366F1", // Indigo
    bottom: -width / 2,
    left: -width / 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#1E293B",
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    marginTop: 8,
  },
  checkIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  termsText: {
    flex: 1,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
  linkText: {
    color: "#6366F1",
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#6366F1",
    borderRadius: 12,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    color: "#94A3B8",
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#64748B",
    fontSize: 14,
  },
  signinText: {
    color: "#6366F1",
    fontSize: 14,
    fontWeight: "bold",
  },
});

