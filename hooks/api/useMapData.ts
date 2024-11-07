import { useEffect, useState } from "react";
import { Region } from "react-native-maps";
import { FeatureCollection } from "geojson";
import endpoint from "@/utils/endpoint";
import axios from "axios";
import * as qs from "qs";

const useMapData = ({
    region,
    layers,
}: {
    region: Region;
    layers: number[];
}): [FeatureCollection] => {
    const [stops, setStops] = useState<FeatureCollection>({
        type: "FeatureCollection",
        features: [],
    });

    const [shapes, setShapes] = useState<FeatureCollection>({
        type: "FeatureCollection",
        features: [],
    });

    useEffect(() => {
        const [dLat, dLon] = [
            region.latitudeDelta / 2,
            region.longitudeDelta / 2,
        ];

        axios
            .get(endpoint("/map/stops"), {
                params: {
                    min_lat: (region.latitude - dLat).toFixed(5),
                    min_lon: (region.longitude - dLon).toFixed(5),
                    max_lat: (region.latitude + dLat).toFixed(5),
                    max_lon: (region.longitude + dLon).toFixed(5),
                    layers: layers,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
            })
            .then((res) => {
                setStops(res.data);
            });

        axios
            .get(endpoint("/map/shapes"), {
                params: {
                    min_lat: (region.latitude - dLat).toFixed(5),
                    min_lon: (region.longitude - dLon).toFixed(5),
                    max_lat: (region.latitude + dLat).toFixed(5),
                    max_lon: (region.longitude + dLon).toFixed(5),
                    layers: layers,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
            })
            .then((res) => {
                setShapes(res.data);
            });
    }, [region]);

    return [
        {
            type: "FeatureCollection",
            features: [...stops.features, ...shapes.features],
        },
    ];
};

export default useMapData;
