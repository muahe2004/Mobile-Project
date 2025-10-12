import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors } from "../../assets/styles/theme";

interface ButtonProps {
    content?: string;           
    onPress?: () => void;
    textColor?: string;
    variant?: "filled" | "outlined";
    icon?: React.ReactNode;
    style?: ViewStyle;     
    textStyle?: TextStyle;      
}

const Button: React.FC<ButtonProps> = ({
    content,
    onPress,
    textColor,
    variant = "filled",
    icon,
    style,
    textStyle
}) => {
    const isOutlined = variant === "outlined";

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isOutlined && styles.outlinedButton,
                style, 
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
                        textStyle, 
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