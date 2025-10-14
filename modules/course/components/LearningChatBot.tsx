import { colors } from "@/assets/styles/theme";
import Button from "@/components/Button/Button";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("window");

interface LearningChatBotProps {
  open: boolean;
}

const contentsChat = [
  {
    role: "user",
    parts: [{ text: "Xin chào, bạn có thể giới thiệu về mình không?" }]
  },
  {
    role: "model",
    parts: [
      {
        text: "Chào bạn! Tôi là Gemini — một mô hình ngôn ngữ tiên tiến do Google phát triển. Tôi có thể trò chuyện, viết thơ, tạo nội dung và giúp bạn giải quyết nhiều vấn đề khác nhau. 😊"
      }
    ]
  },
  {
    role: "user",
    parts: [{ text: "Hay quá, bạn có thể kể cho tôi nghe một câu chuyện ngắn về mùa thu không?" }]
  },
  {
    role: "model",
    parts: [
      {
        text: "Tất nhiên rồi 🍁\n\nMột buổi sáng mùa thu, khi những chiếc lá vàng rơi nhẹ xuống con đường nhỏ, cô bé An mang theo chiếc giỏ mây đi hái quả hồng. Mỗi bước chân vang lên giữa khoảng trời trong vắt, gió khẽ đưa hương thơm của hoa cúc. Trong khoảnh khắc ấy, An nhận ra rằng mùa thu không chỉ đẹp — mà còn mang đến cảm giác bình yên lạ kỳ."
      }
    ]
  },
  {
    role: "user",
    parts: [{ text: "Bạn viết hay thật đó! Giờ hãy tóm tắt lại câu chuyện trên trong 1 câu giúp tôi." }]
  },
  {
    role: "model",
    parts: [
      {
        text: "Câu chuyện kể về cô bé An cảm nhận vẻ đẹp và sự bình yên của mùa thu qua hành trình hái hồng sáng sớm."
      }
    ]
  }
];

export const LearningChatBot: React.FC<LearningChatBotProps & { onClose: () => void }> = ({ open, onClose }) => {

    const slideAnim = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: open ? 0 : width,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [open]);

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
                        style={{
                            flex: 1,
                            paddingHorizontal: 12,
                            borderTopColor: colors.primary,
                            borderTopWidth: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                        >
                        {contentsChat.map((msg, index) => (
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
                            multiline
                        />
                        <TouchableOpacity style={styles.sendButton}>
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
        borderRadius: 20,
        fontSize: 15,
        backgroundColor: "#fafafa",
        maxHeight: 100
    },
    sendButton: {
        backgroundColor: "#0078ff",
        padding: 10,
        borderRadius: 20,
        marginLeft: 8
    }
});