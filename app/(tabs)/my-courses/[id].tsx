import Header from "@/components/Header/Header";
import { useUserInfo } from "@/hooks/useGetUserInfor";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import CourseCard from "../../../modules/course/components/CourseCard";

const { width } = Dimensions.get("window"); 

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;
    const { user, loading } = useUserInfo();
    const userID = user?.id;

    useEffect(() => {
        if (!userID) return;
        fetch(`${API_URL}/registered-courses/by-user/${userID}?page=1&pageSize=100`)
            .then((res) => res.json())
            .then((data) => {
                setCourses(Array.isArray(data.data) ? data.data : []); 
            })
            .catch((err) => console.error("Error fetching courses:", err));
    }, [userID]);

    const chunkedCourses = [];
    for (let i = 0; i < courses.length; i += 2) {
        let chunk = courses.slice(i, i + 2);
        if (chunk.length === 1) {
        chunk.push(null); 
        }
        chunkedCourses.push(chunk);
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
                                    key={course.id}
                                    title={course.tenKhoaHoc || "Courses"}
                                    price={course.giaBan}
                                    thumbnail={{
                                    uri: course.hinhAnh
                                        ? course.hinhAnh.replace("localhost", `${process.env.EXPO_PUBLIC_IPV4}`)
                                        : undefined,
                                    }}
                                    onPress={() => router.push(`/course-details/${course.maKhoaHoc}`)}
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

export default Courses;

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