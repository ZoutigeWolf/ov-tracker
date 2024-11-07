import Stop from "@/models/Stop";
import StopTime from "@/models/StopTime";
import endpoint from "@/utils/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";
import useStops from "./useStops";

const useStopTimes = ({
    name,
    detailed = false,
}: {
    name: string;
    detailed?: boolean;
}): StopTime[] => {
    const [times, setTimes] = useState<StopTime[]>([]);

    const stops = useStops({ name: name });

    const fetch = (controller: AbortController, detailed: boolean = false) => {
        setTimes([]);
        stops.forEach((s) =>
            axios
                .get(endpoint(`/stops/${s.id}/times`), {
                    params: {
                        detailed: detailed,
                    },
                    signal: controller.signal,
                })
                .then((res) => setTimes((prev) => [...prev, ...res.data]))
                .catch((err) => {}),
        );
    };

    useEffect(() => {
        const abortController = new AbortController();

        fetch(abortController, detailed);

        return () => abortController.abort();
    }, [stops]);

    return times;
};

export default useStopTimes;
