import { colors } from "@/assets/styles/theme";
import Button from "@/components/Button/Button";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("window");

interface LearningChatBotProps {
    open: boolean;
}

export const LearningChatBot: React.FC<LearningChatBotProps & { onClose: () => void }> = ({ open, onClose }) => {
    const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;
    const slideAnim = useRef(new Animated.Value(width)).current;
    const [message, setMessage] = useState("");
    const [contents, setContents] = useState([ { role: "model", parts: [{ text: "Xin chào, tôi là UniGemini!" }]}]);
    const [canCallAI, setCanCallAI] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: open ? 0 : width,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [open]);

    const handleSendChat = () => {
        if (!message.trim()) return;

        const newMessage = {
            role: "user",
            parts: [{ text: message }]
        };

        setContents(prev => {
            const next = [...prev, newMessage];
            return next;
        });

        setCanCallAI(true);

        setMessage("");
        Keyboard.dismiss();
    };

    useEffect(() => {
        if (!canCallAI) return;

        const abortController = new AbortController();
        const signal = abortController.signal;

        (async () => {
            try {
                const payload = { contents };

                const res = await fetch(`${API_URL}/AIChat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    signal,
                });

                if (!res.ok) {
                    const error = await res.json().catch(() => ({ message: "Không thể parse lỗi" }));
                    console.error("Call AI failed!", error);
                    setCanCallAI(false);
                    return;
                }

                const data = await res.json().catch(() => null);

                if (data?.reply) {
                    const cleanText = data.reply.trim().replace(/\n+/g, "\n");
                    setContents(prev => [
                        ...prev,
                        { role: "model", parts: [{ text: cleanText }] }
                    ]);
                } else {
                    setContents(prev => [
                        ...prev,
                        { role: "model", parts: [{ text: "Mình chưa thể hiểu yêu cầu của bạn..." }] }
                    ]);
                }

            } catch (error: any) {
                if (error.name === "AbortError") {
                    console.log("Request bị huỷ");
                } else {
                    console.error("Lỗi khi gọi Gemini:", error);
                }
            } finally {
                setCanCallAI(false);
            }
        })();

        return () => abortController.abort();
    }, [canCallAI]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100); 

        return () => clearTimeout(timeout);
    }, [contents]); 

    return (
        <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.chatContent}>
                <Button
                    style={styles.navigationClose}
                    icon={<Ionicons name="close" size={18} color="#fff" />}
                    onPress={onClose}
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1}}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                >
                    <ScrollView
                    ref={scrollViewRef}
                        style={{
                            flex: 1,
                            paddingHorizontal: 12,
                            borderTopColor: colors.primary,
                            borderTopWidth: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                        >
                        {contents.map((msg, index) => (
                            <View
                            key={index}
                            style={[
                                styles.messageContainer,
                                msg.role === "user" ? styles.userMessage : styles.modelMessage,
                            ]}
                            >
                            <View
                                style={[
                                styles.bubble,
                                msg.role === "user" ? styles.userBubble : styles.modelBubble,
                                ]}
                            >
                                <Text
                                style={[
                                    styles.messageText,
                                    msg.role === "user" ? styles.userText : styles.modelText,
                                ]}
                                >
                                {msg.parts[0].text}
                                </Text>
                            </View>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder="Nhập tin nhắn..."
                        placeholderTextColor="#888"
                        multiline
                        value={message}
                        onChangeText={setMessage}
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={handleSendChat}>
                        <Ionicons name="send" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        zIndex: 10,
        backgroundColor: "#fff"
    },
    chatContent: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingVertical: 40,
        paddingBottom: 80,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
    },
    navigationClose: {
        width: 60,
        marginLeft: "auto",
        marginRight: 10,
        backgroundColor: "#FF7F7F"
    },
    messageContainer: {
        marginVertical: 6,
        flexDirection: "row"
    },
    userMessage: {
        justifyContent: "flex-end"
    },
    modelMessage: {
        justifyContent: "flex-start"
    },
    bubble: {
        maxWidth: "80%",
        padding: 10,
        borderRadius: 12
    },
    userBubble: {
        backgroundColor: colors.primary,
        borderTopRightRadius: 0
    },
    modelBubble: {
        backgroundColor: "#f1f1f1",
        borderTopLeftRadius: 0
    },
    userText: {
        color: "#fff"
    },
    modelText: {
        color: "#000"
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20
    },
    inputContainer: {
        bottom: 0,
        left: 0,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        padding: 8,
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        fontSize: 15,
        backgroundColor: "#fafafa",
        maxHeight: 100
    },
    sendButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 20,
        marginLeft: 8
    }
});