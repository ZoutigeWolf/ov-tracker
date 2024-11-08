import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useTrip from "@/hooks/api/useTrip";
import { useEffect, useRef } from "react";
import MapView, { Polyline } from "react-native-maps";
import { RouteType } from "@/models/Route";
import StopMarker from "@/components/StopMarker";
import useTrainInformation from "@/hooks/api/useTrainInformation";
import StopList from "@/components/StopList";
import useTripTimes from "@/hooks/api/useTripTimes";

const MAP_PADDING: { [t: number]: number } = {
    0: 0.01, // Tram
    1: 0.03, // Subway
    2: 0.1, // Rail
    3: 0.01, // Bus
};

export default function TripScreen() {
    const navigation = useNavigation();
    const { tripId } = useLocalSearchParams();

    const trip = useTrip({ id: tripId as string, detailed: true });

    const stopTimes = useTripTimes({ id: tripId as string, detailed: true });

    const trainInformation = useTrainInformation({
        id: trip?.realtime_id.split(":")[2] ?? "",
    });

    const mapRef = useRef<MapView>(null);

    const animateToShape = (line: [number, number][], type: RouteType) => {
        const minLon = line
            .map(([lon, _]) => lon)
            .reduce((a, b) => (a < b ? a : b));

        const maxLon = line
            .map(([lon, _]) => lon)
            .reduce((a, b) => (a > b ? a : b));

        const minLat = line
            .map(([_, lat]) => lat)
            .reduce((a, b) => (a < b ? a : b));

        const maxLat = line
            .map(([_, lat]) => lat)
            .reduce((a, b) => (a > b ? a : b));

        mapRef.current?.animateToRegion({
            latitude: (minLat + maxLat) / 2,
            longitude: (minLon + maxLon) / 2,
            latitudeDelta: maxLat - minLat + MAP_PADDING[type],
            longitudeDelta: maxLon - minLon + MAP_PADDING[type],
        });
    };

    useEffect(() => {
        if (!trip) return;

        navigation.setOptions({
            headerTitle: `${trip.route!.code} to ${trip.headsign}`,
        });

        animateToShape(trip.shape!.line, trip.route!.type);
    }, [trip]);

    return (
        <View style={styles.container}>
            <View style={styles.dataContainer}>
                <StopList times={stopTimes} />
            </View>
            <MapView
                ref={mapRef}
                showsPointsOfInterest={false}
                cameraZoomRange={{
                    maxCenterCoordinateDistance: 750_000,
                }}
                style={styles.map}
            >
                <Polyline
                    strokeWidth={3}
                    coordinates={
                        trip?.shape?.line.map(([lon, lat]) => ({
                            latitude: lat,
                            longitude: lon,
                        })) ?? []
                    }
                />

                {trip?.stops?.map((s, idx) => (
                    <StopMarker
                        key={s.id}
                        showLabel={
                            idx == 0 || idx == (trip?.stops?.length ?? 1) - 1
                        }
                        scale={
                            idx == 0 || idx == (trip?.stops?.length ?? 1) - 1
                                ? 0.9
                                : 0.65
                        }
                        feature={{
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: s.location.toReversed(),
                            },
                            properties: {
                                id: s.id,
                                name: s.name,
                            },
                        }}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        paddingBottom: 4,
    },
    dataContainer: {
        height: "70%",
    },
    map: {
        height: "30%",
        borderRadius: 4,
        marginHorizontal: 4,
    },
});
