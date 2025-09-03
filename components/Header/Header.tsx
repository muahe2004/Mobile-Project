import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import HeaderMenu from "./HeaderMenu";

type HeaderProps = {
  title: string;
  username: string;
  onBackPress?: () => void;
  onProfilePress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  username,
  onBackPress,
  onProfilePress,
}) => {
  const initial = username ? username.charAt(0).toUpperCase() : "?";
    const backHome = () => {
        router.push("/"); 
    };
  return (
    <View style={styles.container}>
            <TouchableOpacity style={styles.logo} onPress={backHome}>
                <Text style={styles.logoText}>M</Text>
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#666" style={styles.icon} />
                <TextInput
                    keyboardType="default"
                    style={styles.textInput}
                />
            </View>

            <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>

            <HeaderMenu username={"D"}></HeaderMenu>
        </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    logo: {
        backgroundColor: "#343D60",
        borderRadius: 4,
        height: 36,
        width: 36,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    logoText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
    },
    safeArea: {
        backgroundColor: "#fff",
    },
    container: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#4e73df", 
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 12,
        width: "60%",
        backgroundColor: "#fff",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    icon: {
        marginRight: 6,
    },
    textInput: {
        flex: 1,            
        fontSize: 16,
    },
});
