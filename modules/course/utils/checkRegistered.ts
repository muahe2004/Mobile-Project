import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkRegistered = async (courseID: string): Promise<boolean> => {
    try {
        if (!courseID) return false;

        const jsonValue = await AsyncStorage.getItem("userCourses");
        if (!jsonValue) return false;

        const courseList = JSON.parse(jsonValue);

        return courseList.some( (course: any) => course.khoaHocId === courseID);
    } catch (error) {
        console.error("Lỗi khi kiểm tra khóa học:", error);
        return false;
    }
};