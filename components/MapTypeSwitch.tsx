import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

const MapTypeSwitch = ({
    style = {},
    mapType,
    onChange,
}: {
    style?: object;
    mapType: "standard" | "hybrid";
    onChange: (t: "standard" | "hybrid") => void;
}) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            <Button
                title="Standard"
                onPress={() => onChange("standard")}
                style={{
                    borderBottomEndRadius: 0,
                    borderTopEndRadius: 0,
                    backgroundColor:
                        mapType === "standard"
                            ? Colors.dark.background2
                            : Colors.dark.background,
                }}
            />
            <Button
                title="Satellite"
                onPress={() => onChange("hybrid")}
                style={{
                    borderBottomStartRadius: 0,
                    borderTopStartRadius: 0,
                    backgroundColor:
                        mapType === "hybrid"
                            ? Colors.dark.background2
                            : Colors.dark.background,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.dark.background,
        borderRadius: 4,
    },
});

export default MapTypeSwitch;
