import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import { LearningNavigation } from "@/modules/course/components/LearningNavigation";
import { QuestionBox } from "@/modules/course/components/QuestionBox";
import { Lectures, ListQuestions } from "@/modules/course/types";
import { extractYoutubeId } from "@/modules/course/utils/getVideoID";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { colors } from "../../../assets/styles/theme";

export default function LearningScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const playerRef = useRef<any>(null);

    const [lecture, setLecture] = useState<Lectures | null>(null);
    const [questions, setQuestions] = useState<ListQuestions[]>([]);
    const [videoID, setVideoID] = useState("");
    const [duration, setDuration] = useState<number | null>(null);

    const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;

    useEffect(() => {
        fetch(`${API_URL}/lectures/${id}`)
        .then((res) => res.json())
        .then(async (data) => {
            setLecture(data);

            if (data?.video) {
            const videoId = extractYoutubeId(data.video);
            if (videoId) {
                setVideoID(videoId);

                setTimeout(async () => {
                const d = await playerRef.current?.getDuration();
                if (d) setDuration(d);
                }, 1500);
            }
            }
        })
        .catch((err) => console.error("Error fetching lectures:", err));
    }, [id]);

    useEffect(() => {
        const fetchQuestionsAndAnswers = async () => {
        try {
            const qRes = await fetch(
            `${API_URL}/questions?page=1&pageSize=100&search=&baiHocId=${id}`
            );
            const json = await qRes.json();

            if (!qRes.ok) {
            console.error("API error:", json);
            setQuestions([]);
            return;
            }

            setQuestions(json.data);
        } catch (err) {
            console.error("Error fetching questions:", err);
            setQuestions([]);
        }
        };

        fetchQuestionsAndAnswers();
    }, [id]);

    const [openMenu, setOpenMenu] = useState(false);

    const handleMenu = () => {
        setOpenMenu(true);  // mở menu
    };


    return (
        <SafeAreaView key={id} style={{ flex: 1, backgroundColor: "#fff", marginBottom: 80 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Header />

            <ScrollView>                
                {lecture && (
                <View>
                    <View style={styles.videoWrapper}>
                    {videoID ? (
                        <YoutubePlayer
                        ref={playerRef}
                        height={230}
                        play={false}
                        videoId={videoID}
                        onChangeState={async (state: string) => {
                            console.log("Trạng thái video:", state);
                            if (state === "playing") {
                            console.log("Người dùng đang xem video");
                            }
                            if (state === "paused") {
                            console.log("Người dùng đã pause");
                            }

                            if (duration) {
                            const current = await playerRef.current?.getCurrentTime();
                            const progress = (current / duration) * 100;

                            console.log(`Đã xem: ${progress.toFixed(2)}%`);

                            if (progress >= 80) {
                                console.log("✅ Người dùng đã hoàn thành video (>= 80%)");
                            }
                            }
                        }}
                        />
                    ) : (
                        <Text>Không tìm thấy video</Text>
                    )}
                    </View>

                    <Text style={styles.learningLectureName}>{lecture.tenBaiHoc}</Text>
                    <Text style={styles.learningLectureDesc}>{lecture.moTaBaiHoc}</Text>
                </View>
                )}

                <Text style={styles.learningTitle}>Câu hỏi ôn tập</Text>

                {questions?.map((ques, index) => (
                <QuestionBox key={ques.id} question={ques} index={index + 1} />
                ))}

            </ScrollView>

            <View style={styles.learningActions}>
                <Button
                    icon={<MaterialCommunityIcons name="robot" size={18} color="#fff" />}
                    onPress={handleMenu}
                />
                <Button
                    icon={<Ionicons name="menu" size={18} color="#fff" />}
                    onPress={handleMenu}
                />
            </View>

            <LearningNavigation open={openMenu} onClose={() => setOpenMenu(false)}/>
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
    learningLectureName: {
        padding: 12,
        fontSize: 24,
        color: colors.text,
        fontWeight: "bold",
    },
    learningLectureDesc: {
        fontSize: 14,
        padding: 12,
    },
    learningTitle: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 12,
        backgroundColor: colors.primary,
        color: colors.white,
    },
    learningActions: {
        position: "absolute",  
        bottom: 10,           
        right: 10,        
    }
});