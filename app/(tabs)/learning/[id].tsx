import Header from "@/components/Header/Header";
import { QuestionBox } from "@/modules/course/components/QuestionBox";
import { Answer, Lectures, ListQuestions } from "@/modules/course/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import { colors } from "../../../assets/styles/theme";

export default function LearningScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const maBaiHoc = id;

    const [lecture, setLecture] = useState<Lectures | null>(null);
    const [questions, setQuestions] = useState<ListQuestions[]>([]);

    const API_URL = process.env.EXPO_PUBLIC_API_KEY;

    useEffect(() => {
        fetch(`${API_URL}/api/lectures/${maBaiHoc}`)
        .then((res) => res.json())
        .then((data) => {
            setLecture(data);
        })
        .catch((err) => console.error("Error fetching courses:", err));
    }, [maBaiHoc]);

    useEffect(() => {
        const fetchQuestionsAndAnswers = async () => {
            try {
                const qRes = await fetch(`${API_URL}/api/questions/${maBaiHoc}`);
                const questionsData: ListQuestions[] = await qRes.json();

                const questionsWithAnswers: ListQuestions[] = await Promise.all(
                    questionsData.map(async (q: ListQuestions) => {
                        const aRes = await fetch(`${API_URL}/api/answers/${q.maCauHoi}`);
                        const answersData: Answer[] = await aRes.json();
                        return { ...q, dapAn: answersData }; 
                    })
                );

                setQuestions(questionsWithAnswers);
            } catch (err) {
                console.error(err);
            }
        };

        fetchQuestionsAndAnswers();
    }, [maBaiHoc]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginBottom: 80 }}>
            <Stack.Screen
                options={{
                headerShown: false,
                }}
            />
            <Header title={"Trang học bài"} username={"User"} />

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