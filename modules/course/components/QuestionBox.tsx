import { colors } from "@/assets/styles/theme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type QuestionBoxProps = {
    index: number;
    question: any;
};

export const QuestionBox: React.FC<QuestionBoxProps> = ({ index, question }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleSelect = (a: any) => {
        setSelectedAnswer(a.id); 
    };

    return (
        <View style={styles.questionBox}>
            <Text style={styles.questionTitle}>
                {index}. {question.noiDung}
            </Text>

            {question.dapAns?.map((a: any) => {
                const isSelected = selectedAnswer === a.id;
                const isCorrect = a.laDapAnDung === true || a.laDapAnDung?.data?.[0] === 1;

                return (
                    <Pressable
                        key={a.id}
                        style={[
                            styles.answerBox,
                            isSelected && (isCorrect ? styles.correctAnswer : styles.wrongAnswer),
                        ]}
                        onPress={() => handleSelect(a)}
                    >
                        <View style={styles.radioOuter}>
                            {isSelected && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.answerText}>{a.noiDungDapAn}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    questionBox: {
        marginBottom: 10,
        padding: 12,
        borderRadius: 8,
    },
    questionTitle: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 16,
    },
    answerBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    answerText: {
        fontSize: 15,
    },
    correctAnswer: {
        backgroundColor: "#d4edda",
        borderColor: "#28a745",
    },
    wrongAnswer: {
        backgroundColor: "#f8d7da",
        borderColor: "#dc3545",
    },
    radioOuter: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
});