import Button from "@/components/Button/Button";
import { useUserInfo } from "@/hooks/useGetUserInfor";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { colors } from "../../assets/styles/theme";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [secureText, setSecureText] = useState(true);

    const API_URL = process.env.EXPO_PUBLIC_API_KEY;
    const { setUser } = useUserInfo(); 

    const handleLogin = async () => {
        try {
            const res = await fetch(`${API_URL}/login`, {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, matKhau }),
            });

            const data = await res.json();

            if (res.ok) {
                await SecureStore.setItemAsync("token", data.token);

                const userRes = await fetch(`${API_URL}/api/me`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${data.token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (userRes.ok) {
                    const userData = await userRes.json();
                    const { matKhau, ...userWithoutPassword } = userData;

                    await SecureStore.setItemAsync(
                        "userInfo",
                        JSON.stringify(userWithoutPassword)
                    );
                    setUser(userWithoutPassword);
                    setEmail("");
                    setMatKhau("");

                    router.replace("/");
                    // await Updates.reloadAsync();
                } else {
                    console.error("Fetching user failed");
                }
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Đăng nhập</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Email"
                        placeholderTextColor="#ccc"
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            value={matKhau}
                            onChangeText={setMatKhau}
                            secureTextEntry={secureText}
                            placeholder="Mật khẩu"
                            placeholderTextColor="#ccc"
                        />
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => setSecureText(!secureText)}
                        >
                            <Ionicons
                                name={secureText ? "eye-off" : "eye"}
                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <Button content="ĐĂNG NHẬP" onPress={handleLogin} />

                    <TouchableOpacity>
                        <Text style={styles.link}>Quên mật khẩu ?</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    form: {
        width: "86%",
    },
    input: {
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 4,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: colors.text,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 4,
        marginBottom: 15,
    },
    inputPassword: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: colors.text,
    },
    icon: {
        paddingHorizontal: 10,
    },
    link: {
        color: "#007BFF",
        textAlign: "center",
        marginTop: 10,
    },
});