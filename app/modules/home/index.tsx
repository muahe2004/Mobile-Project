import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import CourseCard from "../course/components/CourseCard";

const { width } = Dimensions.get("window");

const carouselData = [
  { id: "1", image: require("../../assets/images/utehy1.jpg") },
  { id: "2", image: require("../../assets/images/utehy2.jpg") },
];

const HomePage: React.FC = () => {
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
                    ? course.hinhAnh.replace("localhost", "172.20.10.3")
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

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingBottom: 30,
  },
  flatList: {
  },
  homePageFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
