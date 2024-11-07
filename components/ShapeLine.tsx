import { Feature } from "geojson";
import { Polyline } from "react-native-maps";

const ShapeLine = ({ feature }: { feature: Feature }) => {
    if (feature.geometry.type !== "LineString") {
        throw Error("Only LineString features are allowed");
    }

    return (
        <Polyline
            coordinates={feature.geometry.coordinates.map(([lat, lon]) => ({
                latitude: lat,
                longitude: lon,
            }))}
        />
    );
};

export default ShapeLine;
