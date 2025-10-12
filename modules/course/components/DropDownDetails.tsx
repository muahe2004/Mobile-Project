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
    onClose?: () => void;
};

export interface Lesson {
    id: string;
    tenChuong: string;
}

type Lectures = {
  id: string;
  tenBaiHoc: string;
  moTaBaiHoc: string;
  video: string;
  chuongHocId: string;
  trangThai: string;
  updatedAt: string;
  createdAt: string;
};

type LectureResponse = {
  data: Lectures[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};

export const DropDownDetails: React.FC<DropDownDetailsProps> = ({ coursesID, onClose }) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [openLessons, setOpenLessons] = useState<Record<string, boolean>>({});
    const [lecturesByLesson, setLecturesByLesson] = useState<Record<string, Lectures[]>>({});
    
    const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;
    
    useEffect(() => {
        fetch(`${API_URL}/lessons?page=1&pageSize=100&search=&status=&khoaHocId=${coursesID}`)
            .then((res) => res.json())
            .then((data) => {
                setLessons(data.data);
            }) 
            .catch((err) => console.log("Error fetching courses:", err));
    }, [coursesID]);


    const toggleLesson = async (id: string) => {
        setOpenLessons((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));

        if (!lecturesByLesson[id]) {
            await fetchLecture(id);
        }
    };

    const fetchLecture = async (chuongHocId: string) => {
        try {
            const res = await fetch(`${API_URL}/lectures?page=1&pageSize=100&search=&status=&chuongHocId=${chuongHocId}`);
            const json = await res.json() as any | { error: any };

            if (!res.ok) {
                setLecturesByLesson(prev => ({ ...prev, [chuongHocId]: [] }));
                return;
            }

            setLecturesByLesson(prev => ({
                ...prev,
                [chuongHocId]: json.data
            }));
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    return (
        <View style={styles.dropDownDetails}>
            {lessons.map((lesson, index) => {
                const isOpen = openLessons[lesson.id] || false;
                const lectures = lecturesByLesson[lesson.id] || [];

                return (
                    <View key={lesson.id}>
                        <TouchableOpacity
                            style={styles.dropDownDetailsHead}
                            onPress={() => toggleLesson(lesson.id)}
                        >
                            <Text style={styles.dropDownDetailsTitle}>
                                {index + 1}. {lesson.tenChuong}
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
                                            key={lec.id}
                                            style={styles.lectureItem}
                                            onPress={() => {
                                                router.replace(`/learning/${lec.id}`);
                                                if (onClose) onClose();  
                                            }}
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