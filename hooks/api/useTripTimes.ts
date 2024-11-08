import Stop from "@/models/Stop";
import StopTime from "@/models/StopTime";
import endpoint from "@/utils/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";
import useStops from "./useStops";

const useTripTimes = ({
    id,
    detailed = false,
}: {
    id: string;
    detailed?: boolean;
}): StopTime[] => {
    const [times, setTimes] = useState<StopTime[]>([]);

    const fetch = (controller: AbortController, detailed: boolean = false) => {
        axios
            .get(endpoint(`/trips/${id}/times`), {
                params: {
                    detailed: detailed,
                },
                signal: controller.signal,
            })
            .then((res) => setTimes(res.data))
            .catch((err) => {});
    };

    useEffect(() => {
        const abortController = new AbortController();

        fetch(abortController, detailed);

        return () => abortController.abort();
    }, [id, detailed]);

    return times;
};

export default useTripTimes;
