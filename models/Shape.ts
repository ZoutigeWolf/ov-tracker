import Base from "./Base";

interface Shape extends Base {
    id: string;
    index: number;
    latitude: number;
    longitude: number;
    distanceTraveled: number | null;
}

export default Shape;
