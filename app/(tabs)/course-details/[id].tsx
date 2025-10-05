import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header/Header";
import { Courses } from "@/modules/course/types";
import { useEffect, useState } from "react";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import DropDownDetails from "../../../modules/course/components/DropDownDetails";
import CourseDetails from "../../../modules/course/views/CourseDetails";

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [course, setCourse] = useState<Courses | null>(null);
  

  const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;

  useEffect(() => {
    fetch(`${API_URL}/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, [id]);

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginBottom: 100 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <ParallaxScrollView>
        <CourseDetails
          course={{
            id: course?.id || "",
            tenKhoaHoc: course?.tenKhoaHoc || "",
            moTa: "",
            giaBan: Number(course?.giaBan),
            hinhAnh: course?.hinhAnh,
          }}
        />

        <DropDownDetails coursesID={id} />
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
