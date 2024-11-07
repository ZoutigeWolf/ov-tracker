import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput } from "react-native";

const TextField = ({
    placeholder = "",
    onChange = undefined,
    onComplete = undefined,
    style = {},
}: {
    placeholder?: string;
    onChange?: (s: string) => void;
    onComplete?: () => void;
    style?: object;
}) => {
    return (
        <TextInput
            style={{ ...styles.input, ...style }}
            autoCapitalize={"none"}
            autoCorrect={false}
            placeholder={placeholder}
            onChangeText={(s) => onChange?.(s)}
            onEndEditing={() => onComplete?.()}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        height: "auto",
        backgroundColor: Colors.dark.background,
        padding: 8,
    },
});

export default TextField;
