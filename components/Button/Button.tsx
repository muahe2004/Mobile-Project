import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../assets/styles/theme";

interface ButtonProps {
    content?: string;           // text
    onPress?: () => void;
    textColor?: string;
    variant?: "filled" | "outlined";
    icon?: React.ReactNode;     // thêm prop icon
}

const Button: React.FC<ButtonProps> = ({ content, onPress, textColor, variant = "filled", icon }) => {
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
            {icon ? (
                <View style={styles.iconContainer}>{icon}</View>
            ) : (
                <Text
                    style={[
                        styles.text,
                        isOutlined && styles.outlinedText,
                        textColor && { color: textColor },
                    ]}
                >
                    {content}
                </Text>
            )}
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
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Button;
