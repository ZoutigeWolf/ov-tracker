import { RouteType } from "@/models/Route";

interface LayerSettings {
    visibleLayers: RouteType[];
    showRoutePaths: boolean;
    positions: {
        show: boolean;
        useRealtime: boolean;
    };
}

export default LayerSettings;
