import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import CourseCard from "../course/components/CourseCard";

const { width } = Dimensions.get("window"); // lấy chiều rộng màn hình

const carouselData = [
  { id: "1", image: require("../../assets/images/utehy1.jpg") },
  { id: "2", image: require("../../assets/images/utehy2.jpg") },
];

const HomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={carouselData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={{ width, height: 300, resizeMode: "cover" }}
          />
        )}
      />
      
        <View style={styles.homePageFlex}>
          <CourseCard title={"Javascript"}></CourseCard>

          <CourseCard title={"Javascript"}></CourseCard>
        </View>

        <View style={styles.homePageFlex}>
          <CourseCard title={"Javascript"}></CourseCard>

          <CourseCard title={"Javascript"}></CourseCard>
        </View>

        <View style={styles.homePageFlex}>
          <CourseCard title={"Javascript"}></CourseCard>

          <CourseCard title={"Javascript"}></CourseCard>
        </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  flatList: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  homePageFlex: {
    display: "flex",
    flexDirection: "row",
  }
});
