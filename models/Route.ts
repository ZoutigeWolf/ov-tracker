export enum RouteType {
    Tram = 0,
    Subway = 1,
    Rail = 2,
    Bus = 3,
    Ferry = 4,
    CableTram = 5,
    Aerial = 6,
    Funicular = 7,
    TrolleyBus = 11,
    Monorail = 12,
}

interface Route {
    id: string;
    agency_id: string;
    code: string | null;
    name: string | null;
    description: string | null;
    type: RouteType;
    color: string | null;
    text_color: string | null;
    url: string | null;
}

export default Route;
