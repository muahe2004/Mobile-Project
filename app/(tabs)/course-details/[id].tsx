import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

import Header from "@/components/Header/Header";
import { Courses } from "@/modules/course/types";
import { useEffect, useState } from "react";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import DropDownDetails from "../../../modules/course/components/DropDownDetails";
import CourseDetails from "../../../modules/course/views/CourseDetails";

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [course, setCourse] = useState<Courses | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_KEY;
  
  useEffect(() => {
    fetch(`${API_URL}/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      }) 
      .catch((err) => console.error("Error fetching courses:", err));
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginBottom: 100 }}>
      <Stack.Screen
      options={{
        headerShown: false, 
      }}
    />
      <Header title={"Chi tiết khóa học"} username={"User"} />

      <ParallaxScrollView>
        <CourseDetails
          course={{
            maKhoaHoc: course?.maKhoaHoc || "", 
            tenKhoaHoc: course?.tenKhoaHoc || "",
            moTa: "",
            giaBan: Number(course?.giaBan),
            hinhAnh: course?.hinhAnh,
          }}
        />

        <DropDownDetails
          maKhoaHoc={id}
        ></DropDownDetails>
      </ParallaxScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});