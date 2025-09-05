import { colors } from '@/app/assets/styles/theme';
import { router } from 'expo-router';
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

type HeaderMenuProps = {
    username: string;
};

const HeaderMenu: React.FC<HeaderMenuProps> = ({ username }) => {
    const [visible, setVisible] = useState(false);

    const initial = username ? username.charAt(0).toUpperCase() : "?";

    return (
        <SafeAreaView>
        {/* Avatar mở menu */}
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
        </TouchableOpacity>

        {/* Gọi Menu riêng */}
        <Menu username={username} visible={visible} onClose={() => setVisible(false)} />
        </SafeAreaView>
    );
};

export default HeaderMenu;

type MenuProps = {
    username: string;
    visible: boolean;
    onClose: () => void;
};

const Menu: React.FC<MenuProps> = ({ username, visible, onClose }) => {
    const goToCourses = () => {
      onClose();     
      router.push("/modules/course"); 
    };
    return (
      <Modal visible={visible} transparent onRequestClose={onClose}>
          <Pressable style={styles.overlay} onPress={onClose} />

          <View style={styles.menu}>

              <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Trang cá nhân</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Tin tức</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
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
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
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
  menuTitle: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 8,
  },
  menuText: {
    fontSize: 14,
    color: colors.text,
  },
});
