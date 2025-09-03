import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      {/* Ảnh khóa học */}
      <Image
        source={{
          uri: course.hinhAnh
            ? course.hinhAnh.replace("localhost", "172.20.10.3")
            : "https://via.placeholder.com/400x200.png?text=No+Image",
        }}
        style={styles.thumbnail}
      />

      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.title}>{course.tenKhoaHoc}</Text>
        <Text style={styles.price}>{course.giaBan.toLocaleString()} VND</Text>
        <Text style={styles.description}>{course.moTa}</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Đăng ký ngay</Text>
      </TouchableOpacity>
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
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e91e63",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
  },
  button: {
    margin: 16,
    padding: 16,
    backgroundColor: "#2196f3",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
