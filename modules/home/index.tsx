import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../assets/styles/theme";
import CourseCard from "../course/components/CourseCard";

const { width } = Dimensions.get("window");

const carouselData = [
  { id: "1", image: require("../../assets/images/utehy1.jpg") },
  { id: "2", image: require("../../assets/images/utehy2.jpg") },
];

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const API_URL = process.env.EXPO_PUBLIC_API_KEY;

  const id = ""

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
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
      <FlatList
        style={styles.flatList}
        data={carouselData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={{ width, height: 300, resizeMode: "cover" }}
          />
        )}
      />

      {chunkedCourses.map((row, rowIndex) => (
        <View style={styles.homePageFlex} key={rowIndex}>
          {row.map((course, colIndex) =>
            course ? (
              <CourseCard
                key={course.maKhoaHoc}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 80,
  },
  flatList: {
  },
  homePageFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
