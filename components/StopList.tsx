import { Colors } from "@/constants/Colors";
import Stop from "@/models/Stop";
import StopTime from "@/models/StopTime";
import { parseTimestamp } from "@/utils/time";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import decorateMapComponent from "react-native-maps/lib/decorateMapComponent";

const StopList = ({ times }: { times: StopTime[] }) => {
    return (
        <ScrollView style={styles.container}>
            {times
                .sort(
                    (a, b) =>
                        parseTimestamp(a.arrival).getTime() -
                        parseTimestamp(b.arrival).getTime(),
                )
                .map((t) => (
                    <StopElement key={t.stop_index} time={t} />
                ))}
        </ScrollView>
    );
};

const StopElement = ({ time }: { time: StopTime }) => {
    const arrival = parseTimestamp(time.arrival);
    const departure = parseTimestamp(time.departure);

    const city = time?.stop?.name?.includes(",")
        ? time?.stop?.name.split(",")[0].trim()
        : null;

    const formattedName = time?.stop?.name?.includes(",")
        ? time?.stop?.name.split(",")[1].trim()
        : time?.stop?.name;

    return (
        <View style={styles.elementContainer}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <View>
                <Text style={styles.text}>{formattedName}</Text>
                <Text style={styles.textSecondary}>{city}</Text>
            </View>
            <View style={styles.timesContainer}>
                {arrival.getTime() === departure.getTime() ? (
                    <>
                        <Text style={styles.time}>
                            {departure.toLocaleTimeString("en-NL", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.time}>
                            {arrival.toLocaleTimeString("en-NL", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                        <Text style={styles.time}>
                            {departure.toLocaleTimeString("en-NL", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
    elementContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        height: 55,
        marginHorizontal: 8,
    },
    timesContainer: {
        position: "absolute",
        right: 4,
    },
    dot: {
        width: 11,
        height: 11,
        backgroundColor: Colors.dark.text,
        borderRadius: 6,
    },
    line: {
        position: "absolute",
        left: 5,
        width: 1,
        height: "100%",
        backgroundColor: Colors.dark.text,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        color: Colors.dark.text,
    },
    textSecondary: {
        fontSize: 14,
        color: Colors.dark.textSecondary,
    },
    time: {
        fontSize: 12,
        color: Colors.dark.textSecondary,
    },
});

export default StopList;
