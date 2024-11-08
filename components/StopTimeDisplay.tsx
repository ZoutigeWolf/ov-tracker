import { Colors } from "@/constants/Colors";
import StopTime from "@/models/StopTime";
import { parseTimestamp, timeDiff } from "@/utils/time";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Chip from "./Chip";
import { BlurView } from "expo-blur";
import VEHICLE_ICONS from "@/types/VehicleIcon";
import { Ionicons } from "@expo/vector-icons";
import TRAIN_TYPES from "@/types/TrainTypes";

const StopTimeDisplay = ({
    stopTime,
    onPress = undefined,
}: {
    stopTime: StopTime;
    onPress?: () => void;
}) => {
    return (
        <Pressable onPress={() => onPress?.()}>
            <BlurView style={styles.container}>
                <View style={styles.target}>
                    <Ionicons
                        name={VEHICLE_ICONS[stopTime.route?.type ?? 99]}
                        size={16}
                        color={Colors.dark.text}
                        style={styles.icon}
                    />
                    <Chip
                        text={
                            TRAIN_TYPES[stopTime.route!.code ?? ""] ??
                            stopTime.route!.code ??
                            ""
                        }
                        color={
                            (stopTime.route?.color &&
                                `#${stopTime.route.color}`) ??
                            undefined
                        }
                        textColor={
                            (stopTime.route?.text_color &&
                                `#${stopTime.route.text_color}`) ??
                            undefined
                        }
                    />
                    <Text style={styles.text}>{stopTime.trip?.headsign}</Text>
                    {!!stopTime.stop?.platform_code && (
                        <Text style={styles.platform}>
                            {stopTime.stop?.platform_code}
                        </Text>
                    )}
                </View>
                <View style={styles.time}>
                    <Text
                        style={{
                            ...styles.text,
                            color:
                                timeDiff(stopTime.departure) <= 2
                                    ? Colors.dark.red
                                    : styles.text.color,
                        }}
                    >
                        {timeDiff(stopTime.departure) == 0
                            ? "NOW"
                            : `${timeDiff(stopTime.departure)} min`}
                    </Text>
                    <Text style={styles.secondaryText}>
                        {parseTimestamp(stopTime.departure).toLocaleTimeString(
                            undefined,
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            },
                        )}
                    </Text>
                </View>
            </BlurView>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
        borderRadius: 8,
        overflow: "hidden",
    },
    icon: {},
    target: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    text: {
        fontSize: 12,
        textAlign: "right",
        fontWeight: "bold",
        color: Colors.dark.text,
    },
    secondaryText: {
        textAlign: "right",
        fontSize: 10,
        fontWeight: "bold",
        color: Colors.dark.textSecondary,
    },
    time: {
        display: "flex",
        justifyContent: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: "bold",
        color: Colors.dark.text,
    },
    platform: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bold",
        color: Colors.dark.text,
        padding: 3,
        marginLeft: 8,
        borderRadius: 4,
        borderColor: Colors.dark.text,
        borderWidth: 1,
    },
});

export default StopTimeDisplay;
