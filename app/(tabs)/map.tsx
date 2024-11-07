import {
    StyleSheet,
    View,
    Animated,
    useWindowDimensions,
    Easing,
} from "react-native";
import MapView, { Geojson, Polyline, Region } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import MapTypeSwitch from "@/components/MapTypeSwitch";
import useLocation, { getLocation } from "@/hooks/useLocation";
import IconButton from "@/components/IconButton";
import MapLayerSelector from "@/components/MapLayerSelector";
import MapInspector from "@/components/MapInspector";
import Stop from "@/models/Stop";
import { Settings } from "react-native";
import LayerSettings from "@/types/LayerSettings";
import useMapData from "@/hooks/api/useMapData";
import StopMarker from "@/components/StopMarker";
import { Feature } from "geojson";
import { LocationObject } from "expo-location";
import ShapeLine from "@/components/ShapeLine";

type OffsetRegion = Region & {
    offset: {
        latitude: number;
        longitude: number;
    };
};

const INSPECTOR_HEIGHT = 300;

const ZOOM_TYPES: { [t: number]: [number, number] } = {
    0: [15, 13], // Tram
    1: [5, 11], // Subway
    2: [12, 11], // Train
    3: [16, 14], // Bus
};

export default function MapScreen() {
    const [mapType, setMapType] = useState<"standard" | "hybrid">("standard");
    const [isLayerSelectorOpen, setIsLayerSelectorOpen] =
        useState<boolean>(false);
    const [layerConfig, setLayerConfig] = useState<LayerSettings>(
        JSON.parse(Settings.get("layerSettings") ?? "null") ?? {
            visibleLayers: [1],
            showRoutePaths: false,
            positions: {
                show: false,
                useRealtime: true,
            },
        },
    );
    const [region, setRegion] = useState<OffsetRegion>({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
        offset: {
            latitude: 0,
            longitude: 0,
        },
    });
    const [zoomLevel, setZoomLevel] = useState<number>(0);
    const [selectedItem, setSelectedItem] = useState<{
        type: "stop";
        id: string;
    } | null>(null);

    const inspectorAnim = useRef(
        new Animated.Value(INSPECTOR_HEIGHT + 50),
    ).current;

    const dimensions = useWindowDimensions();

    const location = useLocation({
        accurate: true,
        updateInterval: 500,
    });

    const [geoData] = useMapData({
        region: region,
        layers: layerConfig.visibleLayers,
    });

    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        locate();
    }, []);

    const onRegionChange = (r: Region) => {
        setZoomLevel(
            Math.log2(360 * (dimensions.width / 256 / r.longitudeDelta)) + 1,
        );
    };

    const onRegionChangeComplete = (r: Region) => {
        setRegion((prev) => {
            const latDelta = r.latitude - prev.latitude;
            const lonDelta = r.longitude - prev.longitude;

            return {
                ...r,
                offset: {
                    latitude: 0,
                    longitude: 0,
                },
            };
        });
    };

    const onLayersChange = (s: LayerSettings) => {
        setLayerConfig(s);
        Settings.set({
            layerSettings: JSON.stringify(s),
        });

        onRegionChangeComplete(region);
    };

    const openInspector = () => {
        Animated.timing(inspectorAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    };

    const closeInspector = () => {
        Animated.timing(inspectorAnim, {
            toValue: INSPECTOR_HEIGHT + 50,
            duration: 200,
            easing: Easing.in(Easing.sin),
            useNativeDriver: true,
        }).start();
    };

    const onStopSelect = (s: Feature) => {
        setSelectedItem({
            type: "stop",
            id: s.properties!.name,
        });

        openInspector();
    };

    const locate = () => {
        const set = (loc: LocationObject) => {
            const r = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };

            setRegion({
                ...r,
                offset: {
                    latitude: 0,
                    longitude: 0,
                },
            });

            mapRef.current?.animateToRegion(r);
        };

        if (location) {
            set(location);
            return;
        }

        getLocation().then((loc) => {
            if (!loc) return;

            set(loc);
        });
    };

    const stopFeatures = geoData.features.filter(
        (f) => f.geometry.type === "Point",
    );

    const shapeFeatures = geoData.features.filter(
        (f) => f.geometry.type === "LineString",
    );

    return (
        <View>
            <MapView
                ref={mapRef}
                style={styles.map}
                mapType={mapType}
                onRegionChange={(r, _) => onRegionChange(r)}
                onRegionChangeComplete={(r, _) => onRegionChangeComplete(r)}
                showsUserLocation
                showsPointsOfInterest={false}
                cameraZoomRange={{
                    maxCenterCoordinateDistance: 750_000,
                }}
            >
                {layerConfig.visibleLayers.length > 0 &&
                    stopFeatures.map((f, idx) => (
                        <StopMarker
                            key={idx}
                            feature={f}
                            onPress={onStopSelect}
                            showLabel={zoomLevel > 13.75}
                        />
                    ))}

                {layerConfig.visibleLayers.length > 0 &&
                    shapeFeatures.map((f, idx) => (
                        <ShapeLine key={idx} feature={f} />
                    ))}
            </MapView>
            <View style={styles.overlay} pointerEvents="box-none">
                <MapTypeSwitch
                    mapType={mapType}
                    onChange={setMapType}
                    style={styles.typeSwitch}
                />
                <IconButton
                    name="layers"
                    size={28}
                    style={styles.layersButton}
                    onPress={() => setIsLayerSelectorOpen(true)}
                />
                <IconButton
                    name="locate"
                    size={28}
                    style={styles.locationButton}
                    onPress={locate}
                />
            </View>
            <MapLayerSelector
                isOpen={isLayerSelectorOpen}
                settings={layerConfig}
                onSettingsChange={onLayersChange}
                onClose={() => setIsLayerSelectorOpen(false)}
            />
            <MapInspector
                type={selectedItem?.type}
                id={selectedItem?.id}
                layers={layerConfig.visibleLayers}
                onClose={closeInspector}
                style={{
                    ...styles.inspector,
                    transform: [
                        {
                            translateY: inspectorAnim,
                        },
                    ],
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    typeSwitch: {
        bottom: 8,
        right: 60,
    },
    layersButton: {
        position: "absolute",
        bottom: 8,
        right: 8,
    },
    locationButton: {
        position: "absolute",
        bottom: 60,
        right: 8,
    },
    inspector: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: INSPECTOR_HEIGHT,
    },
});
