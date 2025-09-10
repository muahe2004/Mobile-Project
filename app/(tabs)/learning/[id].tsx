import { colors } from "@/app/assets/styles/theme";
import Header from "@/components/Header/Header";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export interface Lectures {
  maBaiHoc: string;
  tenBaiHoc: string;
  moTaBaiHoc: string;
  video: string;
  maChuongHoc: string;
  tenChuongHoc: string;
  maKhoaHoc: string;
}

function LearningScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const maBaiHoc = "BH001";

    const [lecture, setLecture] = useState<Lectures | null>(null);

    const API_URL = process.env.EXPO_PUBLIC_API_KEY;

    useEffect(() => {
        fetch(`${API_URL}/api/lectures/${maBaiHoc}`)
        .then((res) => res.json())
        .then((data) => {
            setLecture(data);
        })
        .catch((err) => console.log("Error fetching courses:", err));
    }, [maBaiHoc]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Stack.Screen
                options={{
                headerShown: false,
                }}
            />
            <Header title={"Trang học bài"} username={"User"} />

            {lecture && (
                <View>
                    <View style={styles.videoWrapper}>
                        <WebView
                            style={styles.learningVideo}
                            javaScriptEnabled
                            domStorageEnabled
                            source={{ uri: lecture.video }}
                        />
                    </View>
                    <Text style={styles.learningLectureName}>{lecture.tenBaiHoc}</Text>

                    <Text style={styles.learningLectureDesc}>{lecture.moTaBaiHoc}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    videoWrapper: {
        width: "100%",
        aspectRatio: 16 / 9, 
        borderBottomWidth: 1,      
        borderBottomColor: colors.primary,     
    },
    learningVideo: {
        flex: 1, 
    },
    learningLectureName: {
        padding: 12,
        fontSize: 24,
        color: colors.text,
        fontWeight: "bold",
    },
    learningLectureDesc: {
        fontSize: 14,
        padding: 12
    }
});

export default LearningScreen;