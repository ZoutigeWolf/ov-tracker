import {
    StyleSheet,
    Modal,
    View,
    Text,
    SafeAreaView,
    ScrollView,
} from "react-native";
import Toggle from "./Toggle";
import { Colors } from "@/constants/Colors";
import IconButton from "./IconButton";
import LayerSettings from "@/types/LayerSettings";

const MapLayerSelector = ({
    isOpen,
    settings,
    onSettingsChange: onChange,
    onClose,
}: {
    isOpen: boolean;
    settings: LayerSettings;
    onSettingsChange: (settings: LayerSettings) => void;
    onClose: () => void;
}) => {
    const onLayerChange = (l: number) => {
        let layers;
        if (settings.visibleLayers.includes(l)) {
            layers = settings.visibleLayers.filter((layer) => layer !== l);
        } else {
            layers = [...settings.visibleLayers, l];
        }

        onChange({ ...settings, visibleLayers: layers });
    };

    const onShowPositionsChange = (v: boolean) => {
        onChange({
            ...settings,
            positions: { ...settings.positions, show: v },
        });
    };

    const onUseRealtimeChange = (v: boolean) => {
        onChange({
            ...settings,
            positions: { ...settings.positions, useRealtime: v },
        });
    };

    const onShowRoutePathChange = (v: boolean) => {
        onChange({
            ...settings,
            showRoutePaths: v,
        });
    };

    return (
        <Modal animationType="slide" visible={isOpen}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.titleContainer}>
                    <IconButton
                        name="close"
                        size={28}
                        onPress={onClose}
                        style={styles.closeButton}
                    />
                    <Text style={styles.title}>Map Layers</Text>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.subTitle}>Transportation</Text>
                        <Toggle
                            title={"Bus"}
                            isOn={settings.visibleLayers.includes(3)}
                            onChange={() => onLayerChange(3)}
                        />
                        <Toggle
                            title={"Tram"}
                            isOn={settings.visibleLayers.includes(0)}
                            onChange={() => onLayerChange(0)}
                        />
                        <Toggle
                            title={"Subway"}
                            isOn={settings.visibleLayers.includes(1)}
                            onChange={() => onLayerChange(1)}
                        />
                        <Toggle
                            title={"Train"}
                            isOn={settings.visibleLayers.includes(2)}
                            onChange={() => onLayerChange(2)}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.subTitle}>
                            Live Vehicle Locations
                        </Text>
                        <Toggle
                            title={"Live Locations"}
                            isOn={settings.positions.show}
                            onChange={onShowPositionsChange}
                        />
                        <Toggle
                            title={"Use Realtime Location"}
                            isOn={settings.positions.useRealtime}
                            onChange={onUseRealtimeChange}
                        />
                        <Text style={styles.annotation}>
                            When realtime locations are enabled, the app will
                            use realtime data provided by the transportation
                            agencies. These locations update every 60 seconds.
                        </Text>
                        <Text style={styles.annotation}>
                            If disabled, the app will calculate the approximate
                            location using arrival and departure times.
                        </Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.subTitle}>
                            Live Vehicle Locations
                        </Text>
                        <Toggle
                            title={"Show Route Paths"}
                            isOn={settings.showRoutePaths}
                            onChange={onShowRoutePathChange}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: Colors.dark.background,
        height: "100%",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 20,
    },
    container: {
        display: "flex",
        gap: 8,
        padding: 20,
    },
    closeButton: {
        backgroundColor: Colors.dark.background2,
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.dark.text,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.dark.text,
        marginBottom: 4,
    },
    annotation: {
        color: Colors.dark.text,
    },
});

export default MapLayerSelector;
