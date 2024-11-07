import { Colors } from "@/constants/Colors";
import Stop from "@/models/Stop";
import VehiclePosition from "@/models/VehiclePosition";
import VEHICLE_ICONS from "@/types/VehicleIcon";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { Marker } from "react-native-maps";

const VehicleMarker = ({
    position,
    scale = 1,
    showLabel = true,
}: {
    position: VehiclePosition;
    scale?: number;
    showLabel?: boolean;
}) => {
    return (
        <Marker
            key={position.id}
            id={position.id}
            coordinate={{
                latitude: position.latitude!,
                longitude: position.longitude!,
            }}
            flat
            style={{
                zIndex: 1000,
                transform: [{ scale }],
            }}
        >
            <View style={styles.container}>
                <Ionicons
                    name={VEHICLE_ICONS[position.route?.type ?? 99]}
                    size={16}
                    color={`#${position.route?.color ?? "ffffff"}`}
                />
            </View>
            {!!showLabel && (
                <Text
                    style={{
                        ...styles.text,
                        color: `#${position.route?.color ?? "ffffff"}`,
                    }}
                >{`${position.route?.code} - ${position.trip?.headsign}`}</Text>
            )}
        </Marker>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        backgroundColor: "black",
        borderRadius: 16,
    },
    text: {
        position: "absolute",
        width: 500,
        bottom: 32,
        left: -235,
        textAlign: "center",
        color: Colors.dark.text,
        fontWeight: "bold",
    },
});

export default VehicleMarker;
