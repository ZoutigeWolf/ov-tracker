import { Colors } from "@/constants/Colors";
import Stop from "@/models/Stop";
import { View, StyleSheet, Text } from "react-native";

const StopCard = ({ stop }: { stop: Stop }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{stop.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    text: {
        fontSize: 16,
        color: Colors.dark.text,
    },
});

export default StopCard;
