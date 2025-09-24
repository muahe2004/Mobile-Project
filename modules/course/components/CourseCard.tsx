import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");

type CourseCardProps = {
  id?: string | number;
  title: string;
  instructor?: string;
  thumbnail?: any;
  price?: string; 
  rating?: number;
  students?: number;
  progress?: number;
  onPress?: (e?: GestureResponderEvent) => void;
  onBookmark?: (e?: GestureResponderEvent) => void;
  style?: object;
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  thumbnail,
  price,
  rating = 0,
  students,
  progress,
  onPress,
  onBookmark,
  style,
}) => {
  const renderStars = (r: number) => {
    const stars = [];
    const full = Math.floor(r);
    const half = r - full >= 0.5;
    for (let i = 0; i < full; i++) {
      stars.push(<Ionicons key={`f-${i}`} name="star" size={14} color="#f6b93b" />);
    }
    if (half) {
      stars.push(<Ionicons key="half" name="star-half" size={14} color="#f6b93b" />);
    }
    while (stars.length < 5) {
      stars.push(<Ionicons key={`e-${stars.length}`} name="star-outline" size={14} color="#f6b93b" />);
    }
    return <View style={styles.starRow}>{stars}</View>;
  };

  return (
    <TouchableOpacity activeOpacity={0.85} style={[styles.card, style]} onPress={onPress}>
      <Image
        source={thumbnail ?? require("../../../assets/images/javascript_course.png")}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>

        {instructor ? <Text style={styles.instructor}>{instructor}</Text> : null}

        <View style={styles.row}>
          {renderStars(rating)}
          {typeof students === "number" ? (
            <Text style={styles.studentsText}>{students} đã học</Text>
          ) : null}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            {price
              ? parseFloat(price)       
                  .toLocaleString("vi-VN")
              : "Free"} VNĐ
          </Text>


          <View style={styles.actions}>
            {typeof progress === "number" ? (
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${Math.max(0, Math.min(100, progress))}%` }]} />
              </View>
            ) : null}

            <TouchableOpacity onPress={onBookmark} style={styles.bookmarkBtn} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
              <Ionicons name="bookmark-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
   card: {
    flex: 1, 
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  thumbnail: {
    width: "100%",
    height: 90,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  instructor: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  studentsText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#777",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookmarkBtn: {
    marginLeft: 8,
  },
  progressContainer: {
    width: 80,
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4e73df",
  },
});
