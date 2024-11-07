import Agency from "./Agency";
import Base from "./Base";
import Route from "./Route";
import Stop from "./Stop";
import Trip from "./Trip";

export enum PickupType {
    Scheduled,
    NoPickup,
    PhoneAgency,
    CoordinateWithDriver,
}

export enum DropOffType {
    Scheduled,
    NoDropOff,
    PhoneAgency,
    CoordinateWithDriver,
}

export enum Timepoint {
    Approximate,
    Exact,
}

interface StopTime extends Base {
    trip_id: string;
    stop_index: number;
    stop_id: string;
    stop_headsign: string | null;
    arrival: string;
    departure: string;
    pickup_type: PickupType;
    drop_off_type: PickupType;
    timepoint: Timepoint;
    shape_dist_traveled: number;
    fare_units_traveled: number;
    stop: Stop | null;
    trip: Trip | null;
    route: Route | null;
}

export default StopTime;
