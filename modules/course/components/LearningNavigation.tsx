import Button from "@/components/Button/Button";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import DropDownDetails from "./DropDownDetails";

const { width, height } = Dimensions.get("window");

interface LearningNavigationProps {
    open: boolean;
}

export const LearningNavigation: React.FC<LearningNavigationProps & { onClose: () => void }> = ({ open, onClose }) => {
    const slideAnim = useRef(new Animated.Value(width)).current; 

    useEffect(() => {
        Animated.timing(slideAnim, {
        toValue: open ? 0 : width,
        duration: 300,
        useNativeDriver: true,
        }).start();
    }, [open]);

    return (
        <Animated.View style={[ styles.menu, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.menuContent}>
                <Button
                    style={styles.navigationClose}
                    icon={<Ionicons name="close" size={18} color="#fff" />}
                    onPress={onClose}
                />

                <ScrollView>
                    <DropDownDetails onClose={onClose} isLearning isRegistered coursesID={"f8b63e7d-87ed-4b4d-90b0-957b0a5745c0"} />
                </ScrollView>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,         
        zIndex: 10,
    },
    menuContent: {
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
        elevation: 5,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 5,
    },
    navigationClose: {
        width: 60,
        marginLeft: "auto",
        marginRight: 10,
        backgroundColor: "#FF7F7F"
    }
});