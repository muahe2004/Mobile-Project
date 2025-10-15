import Header from "@/components/Header/Header";
import { useUserInfo } from "@/hooks/useGetUserInfor";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "../../../modules/course/components/CourseCard";

const { width } = Dimensions.get("window"); 

import { useIsFocused } from "@react-navigation/native";

const MyCourses: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;
    const { user } = useUserInfo();
    const userID = user?.id;
    const isFocused = useIsFocused(); 

    useEffect(() => {
        if (!userID) return;

        fetch(`${API_URL}/registered-courses/by-user/${userID}?page=1&pageSize=100`)
        .then((res) => res.json())
        .then((data) => {
            setCourses(Array.isArray(data.data) ? data.data : []); 
        })
        .catch((err) => console.error("Error fetching courses:", err));
    }, [userID, isFocused]); 

    const chunkedCourses = [];
    for (let i = 0; i < courses.length; i += 2) {
        let chunk = courses.slice(i, i + 2);
        if (chunk.length === 1) {
        chunk.push(null); 
        }
        chunkedCourses.push(chunk);
    }

    const handleCheckDone = (trangThai: string) => {
        if (!trangThai || trangThai === null || trangThai === undefined) {
            return false;
        }
        if (trangThai === "Hoàn thành") {
            return true;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa", marginBottom: 80 }}>
            <Stack.Screen options={{ headerShown: false}}/>
            <Header/>

            <ScrollView>
                {chunkedCourses.map((row, rowIndex) => (
                    <View style={styles.homePageFlex} key={rowIndex}>
                        {row.map((course, colIndex) =>
                            course ? (
                                <CourseCard
                                    key={course.khoaHocId}
                                    title={course.tenKhoaHoc || "Courses"}
                                    price={course.giaBan}
                                    thumbnail={{
                                    uri: course.hinhAnh
                                        ? course.hinhAnh.replace("localhost", `${process.env.EXPO_PUBLIC_IPV4}`)
                                        : undefined,
                                    }}
                                    onPress={() => router.push(`/course-details/${course.khoaHocId}`)}
                                    markDone={handleCheckDone(course.trangThai)}
                                    registered
                                />
                                ) : (
                                <View key={colIndex} style={{ flex: 1 }} /> 
                            )
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyCourses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        paddingBottom: 30,
    },
    homePageFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});