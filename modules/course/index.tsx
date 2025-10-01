import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import CourseCard from "./components/CourseCard";

const { width } = Dimensions.get("window"); 

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;

  useEffect(() => {
      fetch(`${API_URL}/courses?page=1&pageSize=100&search=&status=`)
        .then((res) => res.json())
        .then((data) => {
          setCourses(data.data);
        }) 
        .catch((err) => console.log("Error fetching courses:", err));
    }, []);

  const chunkedCourses = [];
  for (let i = 0; i < courses.length; i += 2) {
    let chunk = courses.slice(i, i + 2);
    if (chunk.length === 1) {
      chunk.push(null); 
    }
    chunkedCourses.push(chunk);
  }

  return (
    <ScrollView style={styles.container}>
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
                onPress={() => router.push(`/course-details/${course.id}`)}
              />
            ) : (
              <View key={colIndex} style={{ flex: 1 }} /> 
            )
          )}
        </View>
      ))}
    </ScrollView>
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