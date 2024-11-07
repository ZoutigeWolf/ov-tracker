import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, Pressable } from "react-native";

const Button = ({
    style = {},
    title,
    onPress,
}: {
    style?: object;
    title: string;
    onPress: () => void;
}) => {
    return (
        <Pressable style={{ ...styles.button, ...style }} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: Colors.dark.background,
    },
    text: {
        color: Colors.dark.text,
    },
});

export default Button;
