import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { Animated, StyleSheet, View, Text, ScrollView } from "react-native";
import IconButton from "./IconButton";
import Chip from "./Chip";
import * as Lodash from "lodash";
import useStops from "@/hooks/api/useStops";
import Agency from "@/models/Agency";
import Route from "@/models/Route";
import ROUTE_TYPES from "@/types/RouteType";
import useStopTimes from "@/hooks/api/useStopTimes";
import StopTimeDisplay from "./StopTimeDisplay";
import { parseTimestamp, timeDiff } from "@/utils/time";
import { PickupType } from "@/models/StopTime";
import TRAIN_TYPES from "@/types/TrainTypes";
import Trip from "@/models/Trip";

const MapInspector = ({
    type,
    id,
    layers = [],
    onClose,
    onTripSelect = undefined,
    style,
}: {
    type: "stop" | null | undefined;
    id: string | null | undefined;
    layers?: number[];
    onClose: () => void;
    onTripSelect?: (t: Trip) => void;
    style: object;
}) => {
    return (
        <Animated.View style={{ ...styles.root, ...style }}>
            <BlurView
                style={styles.container}
                intensity={70}
                tint={"systemThickMaterial"}
            >
                <View style={styles.header}>
                    <IconButton
                        name="close"
                        color={Colors.dark.background}
                        size={28}
                        style={styles.closeButton}
                        onPress={onClose}
                    />
                </View>
                <ScrollView style={styles.content}>
                    {!!type && !!id && (
                        <>
                            {type === "stop" && (
                                <StopContent
                                    name={id}
                                    layers={layers}
                                    onTripSelect={onTripSelect}
                                />
                            )}
                        </>
                    )}
                </ScrollView>
            </BlurView>
        </Animated.View>
    );
};

const StopContent = ({
    name,
    layers = [],
    onTripSelect = undefined,
}: {
    name: string;
    layers?: number[];
    onTripSelect?: (t: Trip) => void;
}) => {
    const stops = useStops({ name: name, detailed: true });
    const stopTimes = useStopTimes({ name: name, detailed: true });

    if (stops.length === 0) return <></>;

    const agencies = stops.reduce((acc, s) => {
        acc.push(...s.agencies);

        acc = Lodash.uniqBy(acc, (a) => a.id);

        return acc;
    }, [] as Agency[]);

    const routes = Lodash.groupBy(
        stops.reduce((acc, s) => {
            acc.push(...s.routes);

            acc = Lodash.uniqBy(acc, (r) => r.code).filter(
                (r) => layers.length == 0 || layers.includes(r.type),
            );

            return acc;
        }, [] as Route[]),
        (r) => r.type,
    );

    const city = stops[0].name?.includes(",")
        ? stops[0].name.split(",")[0].trim()
        : null;

    const formattedName = stops[0].name?.includes(",")
        ? stops[0].name.split(",")[1].trim()
        : stops[0].name;

    return (
        <>
            <View style={styles.titleContainer}>
                <View>
                    <Text style={styles.title}>{formattedName}</Text>
                    <Text style={styles.subTitle}>{city}</Text>
                </View>
                <View style={styles.chipList}>
                    {agencies.map((a) => (
                        <Chip key={a.id} text={a.name} />
                    ))}
                </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.routeList}>
                    {Object.entries(routes).map(([t, routeArr]) => (
                        <BlurView key={t} style={styles.routeListCat}>
                            <Text style={styles.text}>
                                {ROUTE_TYPES[parseInt(t)]}
                            </Text>
                            <View style={styles.chipList}>
                                {routeArr.map((r) => (
                                    <Chip
                                        key={r.id}
                                        text={
                                            TRAIN_TYPES[r.code ?? ""] ??
                                            r.code ??
                                            ""
                                        }
                                        color={
                                            (r.color && `#${r.color}`) ??
                                            undefined
                                        }
                                        textColor={
                                            (r.text_color &&
                                                `#${r.text_color}`) ??
                                            undefined
                                        }
                                    />
                                ))}
                            </View>
                        </BlurView>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.timesContainer}>
                <Text style={styles.largeText}>Departures</Text>
                <View style={styles.timesList}>
                    {stopTimes
                        .filter(
                            (t) =>
                                t.pickup_type != PickupType.NoPickup &&
                                (layers.length == 0 ||
                                    layers.includes(t.route!.type)) &&
                                timeDiff(t.departure) < 100,
                        )
                        .sort(
                            (a, b) =>
                                parseTimestamp(a.departure).getTime() -
                                parseTimestamp(b.departure).getTime(),
                        )
                        .map((t) => (
                            <StopTimeDisplay
                                key={`${t.trip!.id}`}
                                stopTime={t}
                                onPress={() => onTripSelect?.(t.trip!)}
                            />
                        ))}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        overflow: "hidden",
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
    },
    container: {
        width: "100%",
        height: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        height: 48,
        paddingHorizontal: 8,
        paddingTop: 8,
        width: "100%",
    },
    closeButton: {
        backgroundColor: "transparent",
        padding: 0,
    },
    content: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 12,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.dark.text,
    },
    text: {
        fontSize: 12,
        fontWeight: "bold",
        color: Colors.dark.text,
    },
    largeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.dark.text,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: Colors.dark.textSecondary,
    },
    routeList: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
    },
    routeListCat: {
        display: "flex",
        gap: 6,
        padding: 8,
        borderRadius: 8,
        overflow: "hidden",
    },
    chipList: {
        display: "flex",
        flexDirection: "row",
        gap: 6,
    },
    timesContainer: {
        paddingVertical: 16,
    },
    timesList: {
        display: "flex",
        gap: 4,
        paddingTop: 8,
    },
});

export default MapInspector;
