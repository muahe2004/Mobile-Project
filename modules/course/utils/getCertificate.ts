
const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API!;
const UNILEARN_URL = process.env.EXPO_PUBLIC_UNILEARN_URL;

import { Linking } from "react-native";

function removeVietnameseTones(str: string) {
    return str
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

export const getCertificate = async (body: any) => {
    try {
        const now = new Date();
        const completedDate = now.toISOString().split("T")[0];

        const response = await fetch(`${API_URL}/courses/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fullName: removeVietnameseTones(body.fullName),
            courseName: removeVietnameseTones(body.courseName),
            completedDate,
        }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 
        const urlCer = `${UNILEARN_URL}${data.fileUrl}`;
        console.log("Link certificate:", urlCer);

        Linking.canOpenURL(urlCer)
        .then((supported) => {
            if (supported) {
            Linking.openURL(urlCer);
            } else {
            console.warn("Không thể mở URL:", urlCer);
            }
        });

        return data; 
    } catch (error: any) {
        console.error("❌ Lỗi khi tạo chứng chỉ:", error.message);
        return null; 
    }
};