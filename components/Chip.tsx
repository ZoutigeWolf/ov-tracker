import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";

const Chip = ({
    text,
    color = undefined,
    textColor = undefined,
}: {
    text: string;
    color?: string;
    textColor?: string;
}) => {
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: color || styles.container.backgroundColor,
            }}
        >
            <Text
                style={{
                    ...styles.text,
                    color: textColor || styles.text.color,
                }}
            >
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark.background,
        borderRadius: 8,
        minWidth: 24,
    },
    text: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bold",
        color: Colors.dark.text,
        padding: 6,
    },
});

export default Chip;
