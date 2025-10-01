import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type DropDownDetailsProps = {
    coursesID: string;
};

export interface Lesson {
    maChuongHoc: string;
    tenChuongHoc: string;
}

export interface Lectures {
    maBaiHoc: string;
    tenBaiHoc: string;
    moTaBaiHoc: string;
    video: string;
    maChuongHoc: string;
}

export const DropDownDetails: React.FC<DropDownDetailsProps> = ({ coursesID }) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [openLessons, setOpenLessons] = useState<Record<string, boolean>>({});
    const [lecturesByLesson, setLecturesByLesson] = useState<Record<string, Lectures[]>>({});
    
    const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;
    
    useEffect(() => {
        // http://localhost:8386/unilearn/api/lessons?page=1&pageSize=100&search=&status=&khoaHocId=67586476-6431-4daa-b365-34e08202374f
        fetch(`${API_URL}/lessons?page=1&pageSize=100&search=&status=&khoaHocId=${coursesID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setLessons(data.data);
            }) 
            .catch((err) => console.log("Error fetching courses:", err));
    }, [coursesID]);


    const toggleLesson = async (maChuongHoc: string) => {
        setOpenLessons((prev) => ({
            ...prev,
            [maChuongHoc]: !prev[maChuongHoc],
        }));

        if (!lecturesByLesson[maChuongHoc]) {
            await fetchLecture(maChuongHoc);
        }
    };

    const fetchLecture = async (maChuongHoc: string) => {
        try {
            const res = await fetch(`${API_URL}/api/lectures/by-lesson/${maChuongHoc}`);
            const data: Lectures[] = await res.json();
            setLecturesByLesson((prev) => ({
                ...prev,
                [maChuongHoc]: data,
            }));
        } catch (err) {
            console.error("Error fetching lectures:", err);
        }
    };

    return (
        <View style={styles.dropDownDetails}>
            {lessons.map((lesson, index) => {
                const isOpen = openLessons[lesson.maChuongHoc] || false;
                const lectures = lecturesByLesson[lesson.maChuongHoc] || [];

                return (
                    <View key={lesson.maChuongHoc}>
                        <TouchableOpacity
                            style={styles.dropDownDetailsHead}
                            onPress={() => toggleLesson(lesson.maChuongHoc)}
                        >
                            <Text style={styles.dropDownDetailsTitle}>
                                {index + 1}. {lesson.tenChuongHoc}
                            </Text>
                            <AntDesign
                                name={isOpen ? "up" : "down"}
                                size={20}
                                color="#000"
                            />
                        </TouchableOpacity>

                        {isOpen && (
                            <View style={styles.dropDownDetailsContent}>
                                {lectures.length > 0 ? (
                                    lectures.map((lec, lecIndex) => (
                                        <TouchableOpacity
                                            key={lec.maBaiHoc}
                                            style={styles.lectureItem}
                                            onPress={() => router.push(`/learning/${lec.maBaiHoc}`)}
                                        >
                                            <Text>
                                            {index + 1}.{lecIndex + 1}. {lec.tenBaiHoc}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.lectureItem}>Chưa có bài học nào</Text>
                                )}
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

export default DropDownDetails;

const styles = StyleSheet.create({
    dropDownDetails: {
        backgroundColor: "#fff",
        width: "100%",
        padding: 12,
    },
    dropDownDetailsHead: {
        backgroundColor: "#eee",
        paddingVertical: 16,
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2
    },
    dropDownDetailsTitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropDownDetailsContent: {
        marginBottom: 2,
        borderRadius: 4,
    },
    lectureItem: {
        fontSize: 14,
        color: "#333",
        marginBottom: 2,
        backgroundColor: "#eee",
        paddingVertical: 12,
        paddingLeft: 24
    }
});