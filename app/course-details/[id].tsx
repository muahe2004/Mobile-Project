import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

import Header from "@/components/Header/Header";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import CourseDetails from "../modules/course/views/CourseDetails";

function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
      options={{
        headerShown: false, // ✅ tắt header mặc định
      }}
    />
      <Header title={"Chi tiết khóa học"} username={"User"} />

      <ParallaxScrollView>
        <CourseDetails
          course={{
            maKhoaHoc: id || "", // 👈 thêm id lấy từ URL
            tenKhoaHoc: "",
            moTa: "",
            giaBan: 0,
            hinhAnh: undefined,
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
