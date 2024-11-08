import Agency from "./Agency";
import Base from "./Base";
import Route from "./Route";
import Shape from "./Shape";
import Stop from "./Stop";

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
    realtime_id: string;
    service_id: string;
    routeId: string;
    shapeId: string;
    blockId: string | null;
    headsign: string;
    shortName: string | null;
    longName: string | null;
    direction: number;
    wheelchair_accessible: WheelchairAccesibility;
    bikes_allowed: BikeAccesibility;
    shape: Shape | null;
    route: Route | null;
    stops: Stop[] | null;
}

export default Trip;
