import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View, Switch } from "react-native";

const Toggle = ({
    style = {},
    title,
    isOn,
    onChange,
}: {
    style?: object;
    title: string;
    isOn: boolean;
    onChange: (v: boolean) => void;
}) => {
    return (
        <View style={{ ...styles.toggle, ...style }}>
            <Text style={styles.text}>{title}</Text>
            <Switch value={isOn} onValueChange={() => onChange(!isOn)} />
        </View>
    );
};

const styles = StyleSheet.create({
    toggle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        borderRadius: 4,
        backgroundColor: Colors.dark.background2,
    },
    text: {
        color: Colors.dark.text,
        fontSize: 16,
    },
});

export default Toggle;
