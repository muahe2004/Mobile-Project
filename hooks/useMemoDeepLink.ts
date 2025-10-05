import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

const useMoMoDeepLink = () => {
  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      console.log("Deep link:", url);

      // Dùng Linking.parse của expo-linking
      const parsed = Linking.parse(url);
      const resultCode = parsed.queryParams?.resultCode;
      const orderId = parsed.queryParams?.orderId;
      const nguoiDungID = parsed.queryParams?.nguoiDungID;

      if (resultCode === "0") {
        Alert.alert("Thanh toán thành công", "Khóa học đã được đăng ký!");
        router.replace(`/my-courses/${nguoiDungID}`);
      } else {
        Alert.alert("Thanh toán thất bại", "Vui lòng thử lại.");
      }
    };

    const sub = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => sub.remove();
  }, []);
};

export default useMoMoDeepLink;
