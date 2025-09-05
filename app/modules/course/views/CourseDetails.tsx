import { colors } from "@/app/assets/styles/theme";
import Button from "@/components/Button/Button";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type Course = {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  moTa: string;
  giaBan: number;
  hinhAnh?: string;
};

const CourseDetails: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: course.hinhAnh
            ? course.hinhAnh.replace("localhost", `${process.env.EXPO_PUBLIC_IPV4}`)
            : "../../../assets/images/Nhapmon_course.png",
        }}
        style={styles.thumbnail}
      />

      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.title}>{course.tenKhoaHoc}</Text>
        <Text style={styles.price}>{course.giaBan.toLocaleString()} VND</Text>

        <Button content="ĐĂNG KÝ" onPress={() => console.log("Register")}/>
      </View>      
    </ScrollView>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  thumbnail: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "orange",
    marginBottom: 8,
  },
  button: {
    marginHorizontal: 12,
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});