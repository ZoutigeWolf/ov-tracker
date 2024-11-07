import { StyleSheet, Text, SafeAreaView } from "react-native";

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <Text style={styles.title}>OV Tracker</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
});
