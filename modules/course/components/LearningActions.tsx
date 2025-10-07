import Button from "@/components/Button/Button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export const LearningActions = () => {
    return (
        <View style={styles.container}>
            <Button
                onPress={() => console.log("AI")}
                icon={<MaterialCommunityIcons name="robot" size={18} color="#fff" />}
                variant="filled"
            />

            <Button
                onPress={() => console.log("Menu")}
                icon={<Ionicons name="menu" size={18} color="#fff" />}
                variant="filled"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 5,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 999,
        gap: 10
    },
});