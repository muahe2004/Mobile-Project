import { useUserInfo } from "@/hooks/useGetUserInfor";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { colors } from "../../assets/styles/theme";
import HeaderMenu from "./HeaderMenu";

const Header: React.FC = () => {
    const backHome = () => router.push("/");
    const { user, loading, clearUser } = useUserInfo();

    const goToLogin = () => {
        router.push("/login");
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

            <TouchableOpacity style={{ marginRight: 12 }}>
                <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>

            {user ? (
                <HeaderMenu
                    username={user.tenNguoiDung || ""}
                    userID={user.maNguoiDung}
                    onLogout={clearUser}
                />
            ) : (
                <TouchableOpacity onPress={goToLogin}>
                    <MaterialIcons
                        name="login"
                        size={24}
                        color="#fff"
                        style={{
                            padding: 6,
                            backgroundColor: colors.primary,
                            borderRadius: 4,
                        }}
                        />

                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    logo: {
        backgroundColor: colors.primary,
        borderRadius: 4,
        height: 36,
        width: 36,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    logoText: { color: "#fff", fontSize: 16, fontWeight: "700", letterSpacing: 1 },
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
    icon: { marginRight: 6 },
    textInput: { flex: 1, fontSize: 16 },
});
