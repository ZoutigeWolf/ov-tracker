import { Colors } from "@/constants/Colors";
import { Feature } from "geojson";
import { StyleSheet, View, Text } from "react-native";
import { Marker } from "react-native-maps";

const StopMarker = ({
    feature,
    scale = 1,
    showLabel = true,
    onPress,
}: {
    feature: Feature;
    scale?: number;
    showLabel?: boolean;
    onPress?: (s: Feature) => void;
}) => {
    if (feature.geometry.type !== "Point") {
        throw Error("Only Point features are allowed");
    }

    const name = feature.properties!.name;
    return (
        <Marker
            key={feature.properties!.name}
            id={feature.properties!.name}
            coordinate={{
                latitude: feature.geometry.coordinates[1],
                longitude: feature.geometry.coordinates[0],
            }}
            flat
            onPress={() => onPress?.(feature)}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 32,
                height: 32,
                transform: [{ scale }],
                borderRadius: 16,
            }}
        >
            <View style={styles.container}></View>
            {!!showLabel && (
                <Text style={styles.text}>
                    {name?.includes(",") ? name.split(",")[1].trim() : name}
                </Text>
            )}
        </Marker>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 12,
        height: 12,
        backgroundColor: "black",
        borderRadius: 3,
    },
    text: {
        position: "absolute",
        width: 500,
        top: 23,
        left: -235,
        textAlign: "center",
        color: Colors.dark.text,
        fontSize: 11,
        fontWeight: "bold",
    },
});

export default StopMarker;
