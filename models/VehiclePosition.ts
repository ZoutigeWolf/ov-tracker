import Base from "./Base";

export enum VehicleStatus {
    IncomingAt,
    StoppedAt,
    InTransitTo,
}

interface VehiclePosition extends Base {
    id: string;
    date: Date;
    latitude: number;
    longitude: number;
    stopIndex: number;
    status: VehicleStatus;
    tripId: string;
    stopId: string | null;
    trip: { headsign: string | null } | null;
    stop: object | null;
    route: { type: number; code: string | null; color: string | null } | null;
}

export default VehiclePosition;
