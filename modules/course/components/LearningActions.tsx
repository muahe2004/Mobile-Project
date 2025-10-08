import Button from "@/components/Button/Button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LearningNavigation } from "./LearningNavigation";

export const LearningActions: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.fabContainer}>
                <Button
                    onPress={() => console.log("AI")}
                    icon={<MaterialCommunityIcons name="robot" size={18} color="#fff" />}
                    variant="filled"
                />
                <Button
                    onPress={() => {setMenuOpen(!menuOpen), console.log("Menu")}}
                    icon={<Ionicons name="menu" size={18} color="#fff" />}
                    variant="filled"
                />
            </View>

            <LearningNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    fabContainer: {
        position: "absolute",
        bottom: -60,
        right: 10,
        flexDirection: "row",
        gap: 10,
        zIndex: 1000,
    },
});