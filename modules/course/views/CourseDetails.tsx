import { SocketContext } from "@/app/_layout";
import Button from "@/components/Button/Button";
import { useUserInfo } from "@/hooks/useGetUserInfor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
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
}

const CourseDetails: React.FC<{ course: Course }> = ({ course }) => {
  const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;
  const { user, loading } = useUserInfo();
  const userID = user?.id;
  const socket = useContext(SocketContext); 
  const [paySuccess, setPaySuccess] = useState(false)
  const [isPaying, setIsPaying] = useState(false);
  const [pendingCourse, setPendingCourse] = useState<{ id: string; tenKhoaHoc: string; giaBan: number } | null>(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    setPaySuccess(false);
    setIsPaying(false);
    setPendingCourse(null);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("paymentSuccess", (data: any) => {
      setPaySuccess(true);
    });

    socket.on("paymentFailed", (data: any) => {
      console.log("❌ Thanh toán thất bại realtime:", data);
      setPaySuccess(false);
    });

    return () => {
      socket.off("paymentSuccess");
      socket.off("paymentFailed");
    };
  }, [socket]);
  
  const handleRegister = (id: string, tenKhoaHoc: string, giaBan: number) => {
    if (!user?.id) return;

    if (giaBan > 0) {
      setIsPaying(true);
      setPendingCourse({ id, tenKhoaHoc, giaBan });
      momoPayment();
    } else {
      registerCourse({ nguoiDungId: user.id, khoaHocId: id, trangThai: "Đang học" })
        .then(() => router.replace(`/my-courses/${user.id}`))
        .catch(console.error);
    }
  };

  const momoPayment = async () => {
    try {
      const res = await fetch(`${API_URL}/payment/momo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nguoiDungID: user?.id,
          orderInfo: `Thanh toán khoá học ${course.tenKhoaHoc}`,
          amount: course.giaBan,
        })
      })

      const data = await res.json();

      if (data?.payUrl) {
        await Linking.openURL(data.payUrl);
      } else {
        console.error("Không nhận được payUrl từ MoMo:", data);
      }

    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  }

  useEffect(() => {
    if (!socket) return;

    const handleSuccess = () => setPaySuccess(true);
    const handleFail = () => setPaySuccess(false);

    socket.on("paymentSuccess", handleSuccess);
    socket.on("paymentFailed", handleFail);

    return () => {
      socket.off("paymentSuccess", handleSuccess);
      socket.off("paymentFailed", handleFail);
    };
  }, [socket]);

  useEffect(() => {
    if (paySuccess && isPaying && pendingCourse) {
      registerCourse({
        nguoiDungId: user!.id,
        khoaHocId: pendingCourse.id,
        trangThai: "Đang học",
      })
        .then(() => router.replace(`/my-courses/${user!.id}`))
        .catch(console.error)
        .finally(() => {
          setIsPaying(false);
          setPendingCourse(null);
          setPaySuccess(false);
        });
    }
  }, [paySuccess, isPaying, pendingCourse]);

  const registerCourse = async (registerCourse: IRegisterCourse)  => {
    try {
      const res = await fetch(`${API_URL}/registered-courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nguoiDungId: registerCourse.nguoiDungId,
          khoaHocId: registerCourse.khoaHocId,
          trangThai: "Đang học"
        })
      });

      if (!res.ok) throw new Error("Đăng ký thất bại!");

      const data = await res.json();
      return data.data; 
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      return null;
    }
  }

  const checkRegistered = async (courseID: string) => {
    try {
      if (!courseID) return;

      const jsonValue = await AsyncStorage.getItem("userCourses");
      if (!jsonValue) {
        return;
      }

      const courseList = JSON.parse(jsonValue);

      const isRegistered = courseList.some(
        (course: any) => course.khoaHocId === courseID
      );

      if (isRegistered) {
        setRegistered(true);
      } else {
        setRegistered(false);
      }

    } catch (error) {
      console.error("Lỗi khi kiểm tra khóa học:", error);
    }
  };

  useEffect(() => {
    checkRegistered(course.id);
  }, [course.id])

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

      <View style={styles.content}>
        <Text style={styles.title}>{course.tenKhoaHoc}</Text>
        <Text style={styles.price}>{course.giaBan.toLocaleString()} VND</Text>

        {
          !registered && (<Button content="ĐĂNG KÝ" onPress={() => handleRegister(course.id, course.tenKhoaHoc, course.giaBan)}/>)
        }

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