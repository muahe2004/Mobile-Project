import Button from "@/components/Button/Button";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../assets/styles/theme";

type Course = {
  id: string;
  tenKhoaHoc: string;
  moTa: string;
  giaBan: number;
  hinhAnh?: string;
};

export interface IRegisterCourse {
  khoaHocId: string;
  nguoiDungId: string;
  trangThai: string;
  giaBan: number;
}

const CourseDetails: React.FC<{ course: Course }> = ({ course }) => {
  const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;
  
  const handleRegister = (id: string, tenKhoaHoc: string, giaBan: number) => {
    const payload: IRegisterCourse = {
      nguoiDungId: "5ceb4047-ff81-4098-b947-4bfeba9e26de", 
      khoaHocId: id,                                 
      trangThai: "Đang học",
      giaBan: 0                             
    };

    if (giaBan > 0) {
      console.log("Học phí: ", giaBan);
    } else {
      registerCourse(payload);
    }
  }

  const registerCourse = async (registerCourse: IRegisterCourse)  => {
    try {
      const res = await fetch(`${API_URL}/registered-courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nguoiDungId: registerCourse.nguoiDungId,
          khoaHocId: registerCourse.khoaHocId,
          trangThai: "Đang học"
        })
      });

      if (!res.ok) {
        throw new Error("Đăng ký thất bại!");
      }

      const data = await res.json();
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  }

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

        <Button content="ĐĂNG KÝ" onPress={() => handleRegister(course.id, course.tenKhoaHoc, course.giaBan)}/>
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