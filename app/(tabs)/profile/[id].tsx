import { colors } from "@/assets/styles/theme";
import Header from "@/components/Header/Header";
import { useUserInfo } from "@/hooks/useGetUserInfor";
import { Stack } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window"); 

const mockActivities = [
  { date: "2025-09-01", hocBai: 1, traLoi: 0 },
  { date: "2025-09-02", hocBai: 2, traLoi: 1 },
  { date: "2025-09-03", hocBai: 0, traLoi: 0 },
  { date: "2025-09-04", hocBai: 1, traLoi: 0 },
  { date: "2025-09-05", hocBai: 0, traLoi: 0 },
  { date: "2025-09-06", hocBai: 2, traLoi: 2 },
  { date: "2025-09-07", hocBai: 0, traLoi: 0 },
  { date: "2025-09-08", hocBai: 2, traLoi: 1 },
  { date: "2025-09-09", hocBai: 0, traLoi: 0 },
  { date: "2025-09-10", hocBai: 1, traLoi: 0 },
  { date: "2025-09-11", hocBai: 0, traLoi: 0 },
  { date: "2025-09-12", hocBai: 1, traLoi: 0 },
  { date: "2025-09-13", hocBai: 3, traLoi: 2 },
  { date: "2025-09-14", hocBai: 0, traLoi: 0 },
  { date: "2025-09-15", hocBai: 2, traLoi: 0 },
  { date: "2025-09-16", hocBai: 1, traLoi: 1 },
  { date: "2025-09-17", hocBai: 0, traLoi: 0 },
  { date: "2025-09-18", hocBai: 1, traLoi: 0 },
  { date: "2025-09-19", hocBai: 2, traLoi: 1 },
  { date: "2025-09-20", hocBai: 1, traLoi: 0 },
  { date: "2025-09-21", hocBai: 0, traLoi: 0 },
  { date: "2025-09-22", hocBai: 2, traLoi: 2 },
  { date: "2025-09-23", hocBai: 1, traLoi: 1 },
  { date: "2025-09-24", hocBai: 3, traLoi: 0 },
  { date: "2025-09-25", hocBai: 0, traLoi: 0 },
  { date: "2025-09-26", hocBai: 0, traLoi: 0 },
  { date: "2025-09-27", hocBai: 0, traLoi: 0 },
  { date: "2025-09-28", hocBai: 0, traLoi: 0 },
  { date: "2025-09-29", hocBai: 0, traLoi: 0 },
  { date: "2025-09-30", hocBai: 0, traLoi: 0 },
];


const Profile: React.FC = () => {
    const { user, loading } = useUserInfo();

    const getColor = (count: number) => {
        if (count === 0) return "#ebedf0";
        if (count < 2) return "#c6e48b";
        if (count < 4) return "#7bc96f";
        if (count < 6) return "#239a3b";
        return "#196127";
    }

    // Xác định thứ của ngày đầu tiên, với thứ 2 là cột đầu tiên
    const firstDay = new Date(mockActivities[0].date);
    let startWeekday = firstDay.getDay(); 
    startWeekday = startWeekday === 0 ? 6 : startWeekday - 1; 

    // Tạo mảng hiển thị với ô trống trước ngày 1
    const daysToShow: (typeof mockActivities[0] | null)[] = [];
    for (let i = 0; i < startWeekday; i++) {
        daysToShow.push(null);
    }
    daysToShow.push(...mockActivities);

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
            <Stack.Screen options={{ headerShown: false }}/>
            <Header/>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <View style={styles.userInfo}>
                    {loading ? (
                        <Text>Đang tải...</Text>
                    ) : (
                        <View>
                            <Text style={styles.userName}>{user?.name}</Text>
                            <Text style={styles.userEmail}>{user?.email}</Text>
                        </View>
                    )}
                </View>

                <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 16 }}>
                    Hoạt động tháng {currentMonth}/{currentYear}
                </Text>

                <View style={styles.activityGrid}>
                    {daysToShow.map((day, index) => {
                        if (!day) {
                            return (
                                <View key={index} style={styles.emptyDay} />
                            );
                        }

                        const total = day.hocBai + day.traLoi;
                        const isToday = day.date === todayStr;

                        return (
                            <View
                                key={index}
                                style={[
                                    styles.activityDay,
                                    { backgroundColor: getColor(total) },
                                    isToday && { borderWidth: 2, borderColor: colors.primary },
                                ]}
                                >
                                    <Text style={styles.activityText}></Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    userEmail: {
        fontSize: 14,
        color: "#555",
        marginTop: 3,
    },
    activityGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    emptyDay: {
        width: (width - 40) / 7 - 4,
        aspectRatio: 1,
        margin: 2,
        backgroundColor: "transparent",
    },
    activityDay: {
        width: (width - 40) / 7 - 4,
        aspectRatio: 1,
        margin: 2,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        borderColor: "transparent",
    },
    activityText: {
        fontSize: 12,
    },
});