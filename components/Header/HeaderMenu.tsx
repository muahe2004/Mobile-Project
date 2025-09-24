import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from '../../assets/styles/theme';

type HeaderMenuProps = {
  username: string;
  onLogout: () => void; // callback từ Header
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({ username, onLogout }) => {
  const [visible, setVisible] = useState(false);
  const initial = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </TouchableOpacity>

      <Menu
        username={username}
        visible={visible}
        onClose={() => setVisible(false)}
        onLogout={onLogout}
      />
    </SafeAreaView>
  );
};

export default HeaderMenu;

type MenuProps = {
  username: string;
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const Menu: React.FC<MenuProps> = ({ username, visible, onClose, onLogout }) => {

  const goToCourses = () => {
    onClose();
    router.push("../../modules/courses");
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("userInfo");

      // Reset state user ở Header
      onLogout();

      // Đóng modal
      onClose();

      // Reload trang hiện tại để Header kiểm tra lại user
      router.replace("/login"); // thay vì router.replace("/login")
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={goToCourses}>
          <Text style={styles.menuText}>Trang cá nhân</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Tin tức</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  menu: {
    position: "absolute",
    right: 10,
    top: 60,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 8, gap: 8 },
  menuText: { fontSize: 14, color: colors.text },
});
