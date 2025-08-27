import Header from "@/components/Header/Header";
import { Stack } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window"); 

const Courses: React.FC = () => {
  return (
    <>
      {/* Ẩn header */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.listCourses}>
        <Header title={""} username={"D"}></Header>
        <Text >Courses</Text>
        
        <Text>Courses</Text>
        <Text>Courses</Text>
        <Text>Courses</Text>
        <Text>Courses</Text>

        <Text>Courses</Text>
      </View>
    </>
    
  );
};

export default Courses;

const styles = StyleSheet.create({
  listCourses: {
    backgroundColor: "red"
  }
});
