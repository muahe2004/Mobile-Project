import { colors } from "@/app/assets/styles/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    content: string;
    onPress?: () => void;
    textColor?: string; 
    variant?: "filled" | "outlined"; 
}

const Button: React.FC<ButtonProps> = ({ content, onPress, textColor, variant = "filled" }) => {
    const isOutlined = variant === "outlined";

    return (
        <TouchableOpacity
        style={[
            styles.button,
            isOutlined && styles.outlinedButton, 
        ]}
        onPress={onPress}
        activeOpacity={0.7}
        >
        <Text
            style={[
            styles.text,
            isOutlined && styles.outlinedText, 
            textColor && { color: textColor }, 
            ]}
        >
            {content}
        </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
        backgroundColor: colors.primary,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.white,
    },

    outlinedButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: colors.primary,
    },
    outlinedText: {
        color: colors.primary,
    },
});

export default Button;