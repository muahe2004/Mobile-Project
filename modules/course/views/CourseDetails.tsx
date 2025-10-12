import { SocketContext } from "@/app/_layout"; // import context socket
import Button from "@/components/Button/Button";
import { useUserInfo } from "@/hooks/useGetUserInfor";
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

  useEffect(() => {
    if (!socket) return;

    // lắng nghe event từ backend
    socket.on("paymentSuccess", (data: any) => {
      console.log("💰 Thanh toán thành công realtime:", data);
      setPaySuccess(true);
    });

    socket.on("paymentFailed", (data: any) => {
      console.log("❌ Thanh toán thất bại realtime:", data);
      setPaySuccess(false);
    });

    // cleanup
    return () => {
      socket.off("paymentSuccess");
      socket.off("paymentFailed");
    };
  }, [socket]);
  
  const handleRegister = async (id: string, tenKhoaHoc: string, giaBan: number) => {
    const payload: IRegisterCourse = {
      nguoiDungId: user?.id || "", 
      khoaHocId: id,                                 
      trangThai: "Đang học",
    };

    try {
      const registerRes = await registerCourse(payload);

      const dangKyId = registerRes.id;

      if (giaBan > 0) {
        // await addBill(dangKyId);
        setIsPaying(true); // đánh dấu đang chờ thanh toán
        momoPayment();
        // router.replace(`/my-courses/${user?.id}`);
      } else {
        // router.replace(`/my-courses/${user?.id}`);
      }

    } catch (err) {
      console.error(err);
    }
  }

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

      console.log(data);

      if (data?.payUrl) {
        // 👉 Điều hướng sang trang MoMo
        await Linking.openURL(data.payUrl);
      } else {
        console.error("Không nhận được payUrl từ MoMo:", data);
      }

    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  }

  // Lắng nghe socket
  useEffect(() => {
    if (!socket) return;

    socket.on("paymentSuccess", (data: any) => {
      console.log("💰 Thanh toán thành công realtime:", data);
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

  // Thực hiện hành động khi thanh toán thành công và đang trong quá trình thanh toán
  useEffect(() => {
    if (paySuccess && isPaying) {
      console.log("🎉 Thanh toán MoMo thành công!");
      setIsPaying(false); // reset trạng thái
    }
  }, [paySuccess, isPaying]);

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

  const addBill = async (dangKyId: string) => {
    try {
      const res = await fetch(`${API_URL}/bills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nguoiDungId: user?.id,
          dangKyId: dangKyId,
          loaiThanhToan: "Chuyển khoản",
          soTien: course.giaBan,
          trangThai: "Chờ thanh toán",
          ghiChu: `Thanh toán học phí khoá học ${course.tenKhoaHoc}`
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