import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import CourseDetails from "../../modules/course/views/CourseDetails";

export interface Courses {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  moTaKhoaHoc: string;
  hinhAnh: string;
  doKho: string;
  giaBan: number;
  maGiangVien: string;
}



function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [course, setCourse] = useState<Courses | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_KEY;
  
  useEffect(() => {
    fetch(`${API_URL}/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourse(data);
      }) 
      .catch((err) => console.log("Error fetching courses:", err));
  }, [id]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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

export default CourseDetailsScreen;
