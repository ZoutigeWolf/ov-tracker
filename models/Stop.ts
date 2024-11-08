import Agency from "./Agency";
import Base from "./Base";
import Route from "./Route";

export enum WheelchairBoarding {
    NoInformation,
    SomeVehicles,
    NotPossible,
}

export enum LocationType {
    StopPlatform,
    Station,
    EntranceExit,
    GenericNode,
    BoardingArea,
}

interface Stop extends Base {
    id: string;
    code: string | null;
    name: string | null;
    location: [number, number];
    type: LocationType;
    parentId: string | null;
    timezone: string | null;
    wheelchairBoarding: WheelchairBoarding;
    platformCode: string | null;
    zoneId: string | null;
    agencies: Agency[];
    routes: Route[];
}

export default Stop;
