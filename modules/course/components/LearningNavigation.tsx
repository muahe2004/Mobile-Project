import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import DropDownDetails from "./DropDownDetails";

const { width, height } = Dimensions.get("window");

interface LearningNavigationProps {
    open: boolean;
}

export const LearningNavigation: React.FC<LearningNavigationProps> = ({ open }) => {
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
                <Text style={styles.menuTitle}>DANH SÁCH BÀI HỌC</Text>
                <ScrollView style={styles.navigationScroll}>
                    <DropDownDetails coursesID={"f8b63e7d-87ed-4b4d-90b0-957b0a5745c0"} />
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
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    menuContent: {
        position: "absolute",
        right: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingVertical: 20,
    },
    menuTitle: {
        color: "#000",
        fontSize: 20,
        marginBottom: 20,
        paddingLeft: 12
    },
    menuItem: {
        color: "#000",
        fontSize: 18,
        marginBottom: 15,
        backgroundColor: "green"
    },
    navigationScroll: {
        marginBottom: 165
    }
});