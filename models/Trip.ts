import Agency from "./Agency";
import Base from "./Base";
import Route from "./Route";

export enum WheelchairAccesibility {
    NoInformation,
    AtLeastOne,
    NotPossible,
}

export enum BikeAccesibility {
    NoInformation,
    AtLeastOne,
    NotPossible,
}

interface Trip extends Base {
    id: string;
    realtimeId: string;
    serviceId: string;
    routeId: string;
    shapeId: string;
    blockId: string | null;
    headsign: string;
    shortName: string | null;
    longName: string | null;
    direction: number;
    wheelchairAccessible: WheelchairAccesibility;
    bikesAllowed: BikeAccesibility;
}

export default Trip;
