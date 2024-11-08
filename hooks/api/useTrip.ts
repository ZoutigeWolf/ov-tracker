import Trip from "@/models/Trip";
import endpoint from "@/utils/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";

const useTrip = ({
    id,
    detailed = false,
}: {
    id: string | null;
    detailed?: boolean;
}): Trip | null => {
    const [trip, setTrip] = useState<Trip | null>(null);

    const fetch = (controller: AbortController, detailed: boolean) => {
        setTrip(null);
        axios
            .get(endpoint(`/trips/${id}`), {
                params: {
                    detailed: detailed,
                },
                signal: controller.signal,
            })
            .then((res) => setTrip(res.data))
            .catch((err) => {});
    };

    useEffect(() => {
        const abortController = new AbortController();

        fetch(abortController, detailed);

        return () => abortController.abort();
    }, [id, detailed]);

    return trip;
};

export default useTrip;
