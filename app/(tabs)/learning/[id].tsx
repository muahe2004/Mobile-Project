import Header from "@/components/Header/Header";
import { QuestionBox } from "@/modules/course/components/QuestionBox";
import { Lectures, ListQuestions } from "@/modules/course/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { colors } from "../../../assets/styles/theme";

export default function LearningScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [lecture, setLecture] = useState<Lectures | null>(null);
    const [questions, setQuestions] = useState<ListQuestions[]>([]);

    const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;

    useEffect(() => {
        fetch(`${API_URL}/lectures/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setLecture(data);
        })
        .catch((err) => console.error("Error fetching courses:", err));
    }, [id]);

    useEffect(() => {
        const fetchQuestionsAndAnswers = async () => {
            try {
                const qRes = await fetch(`${API_URL}/questions?page=1&pageSize=100&search=&baiHocId=${id}`);
                const json = await qRes.json();

                if (!qRes.ok) {
                    console.error("API error:", json);
                    setQuestions([]); 
                    return;
                }

                const questions = json.data;

                setQuestions(questions);
            } catch (err) {
                console.error("Error fetching questions:", err);
                setQuestions([]);
            }
            };

        fetchQuestionsAndAnswers();
    }, [id]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginBottom: 80 }}>
            <Stack.Screen
                options={{
                headerShown: false,
                }}
            />
            <Header/>

            <ScrollView>
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

                <Text style={styles.learningTitle}>Câu hỏi ôn tập</Text>

                {questions?.map((ques, index) => (
                    <QuestionBox 
                        key={ques.maCauHoi} 
                        question={ques} 
                        index={index + 1} 
                    />
                ))}
            </ScrollView>
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
    },
    learningTitle: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 12,
        backgroundColor: colors.primary,
        color: colors.white
    }
});