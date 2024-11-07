import { StyleSheet, Text, SafeAreaView } from "react-native";

export default function SettingsScreen() {
    return (
        <SafeAreaView>
            <Text style={styles.title}>Settings</Text>
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
