import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Course = {
    id: string;
    tenKhoaHoc: string;
    moTa: string;
    hinhAnh: string;
};

type SearchCourseProps = {
    values: string;
};

export const SearchCourse: React.FC<SearchCourseProps> = ({ values }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const API_URL = process.env.EXPO_PUBLIC_UNILEARN_API;

    const slideAnim = useRef(new Animated.Value(-20)).current; 
    const fadeAnim = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        if (!values.trim()) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -20,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
            return;
        }

        fetch(`${API_URL}/courses?page=1&pageSize=100&search=${values}&status=`)
            .then((res) => res.json())
            .then((data) => {
                setCourses(data.data);
            })
            .catch((err) => console.error("Error fetching courses:", err));

        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [values]);

    const handleChooseCourse = (khoaHocID: string) => {
        router.push(`/course-details/${khoaHocID}`);
    };

    return (
        <Animated.View
            style={[
                styles.searchContainer,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
                !values.trim() && styles.closed,
            ]}
        >
            <ScrollView style={{ maxHeight: 300 }}>
                {courses.map((course) => (
                    <TouchableOpacity
                        key={course.id}
                        style={styles.courseItem}
                        activeOpacity={0.7}
                        onPress={() => handleChooseCourse(course.id)}
                    >
                        <Image
                            source={{
                                uri: course.hinhAnh
                                    ? course.hinhAnh.replace(
                                          "localhost",
                                          `${process.env.EXPO_PUBLIC_IPV4}`
                                      )
                                    : undefined,
                            }}
                            style={styles.thumbnail}
                            resizeMode="cover"
                        />
                        <View style={styles.courseInfo}>
                            <Text style={styles.courseTitle} numberOfLines={1}>
                                {course.tenKhoaHoc}
                            </Text>
                            <Text style={styles.courseDesc} numberOfLines={1}>
                                {course.moTa}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        position: "absolute",
        top: "105%",
        left: "4%",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 100,
    },
    courseItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        gap: 10,
    },
    thumbnail: {
        width: 100,
        height: 60,
        borderRadius: 6,
        backgroundColor: "#f0f0f0",
    },
    courseInfo: {
        flex: 1,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    courseDesc: {
        fontSize: 13,
        color: "#666",
        marginTop: 2,
    },
    closed: {
        display: "none",
    },
});