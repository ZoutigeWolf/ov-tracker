import Stop from "@/models/Stop";
import endpoint from "@/utils/endpoint";
import axios from "axios";
import { LocationObject } from "expo-location";
import { useEffect, useState } from "react";

const useStops = ({
    name,
    search = false,
    location = undefined,
    detailed = false,
    limit = 100,
}: {
    name: string | null;
    search?: boolean;
    location?: LocationObject | null;
    detailed?: boolean;
    limit?: number;
}): Stop[] => {
    const [stops, setStops] = useState<Stop[]>([]);

    const fetch = (controller: AbortController, detailed: boolean = false) => {
        axios
            .get(endpoint(`/stops`), {
                params: {
                    search: search,
                    detailed: detailed,
                    lat: location && location.coords.latitude,
                    lon: location && location.coords.longitude,
                    name: name,
                    limit: limit,
                },
                signal: controller.signal,
            })
            .then((res) => setStops(res.data))
            .catch((err) => {});
    };

    useEffect(() => {
        const abortController = new AbortController();

        fetch(abortController, detailed);

        return () => abortController.abort();
    }, [name, search, detailed]);

    return stops;
};

export default useStops;
