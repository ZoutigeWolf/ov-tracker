import { Colors } from "@/constants/Colors";
import useStops from "@/hooks/api/useStops";
import Stop from "@/models/Stop";
import { View, StyleSheet, Text } from "react-native";
import * as Lodash from "lodash";
import Agency from "@/models/Agency";
import Route from "@/models/Route";
import Chip from "./Chip";
import TRAIN_TYPES from "@/types/TrainTypes";
import ROUTE_TYPES from "@/types/RouteType";

const StopCard = ({ stop }: { stop: Stop }) => {
    const stops = useStops({ name: stop.name, detailed: true });

    if (stops.length === 0) return <></>;

    const routes = Lodash.groupBy(
        stops.reduce((acc, s) => {
            acc.push(...s.routes);

            return Lodash.uniqBy(acc, (r) => r.id);
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
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text}>{formattedName}</Text>
                <Text style={styles.textSecondary}>{city}</Text>
            </View>
            <View style={styles.routeList}>
                {Object.entries(routes).map(([t, routeArr]) => (
                    <View style={styles.routeListCat}>
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
                                        (r.color && `#${r.color}`) ?? undefined
                                    }
                                    textColor={
                                        (r.text_color && `#${r.text_color}`) ??
                                        undefined
                                    }
                                />
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 6,
        paddingHorizontal: 4,
        paddingVertical: 16,
        borderBottomColor: Colors.dark.background2,
        borderBottomWidth: 1,
    },
    title: {
        display: "flex",
        gap: 2,
    },
    text: {
        fontSize: 16,
        color: Colors.dark.text,
    },
    textSecondary: {
        fontSize: 12,
        color: Colors.dark.textSecondary,
    },
    chipList: {
        display: "flex",
        flexDirection: "row",
        gap: 6,
    },
    routeList: {
        display: "flex",
        gap: 8,
    },
    routeListCat: {
        display: "flex",
        gap: 8,
    },
});

export default StopCard;
