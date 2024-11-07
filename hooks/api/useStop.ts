import Stop from "@/models/Stop";
import endpoint from "@/utils/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";

const useStop = ({
    id,
    detailed = false,
}: {
    id: string | null;
    detailed?: boolean;
}): Stop | null => {
    const [stop, setStop] = useState<Stop | null>(null);

    const fetch = (controller: AbortController, detailed: boolean = false) => {
        setStop(null);
        axios
            .get(endpoint(`/stops/${id}`), {
                params: {
                    detailed: detailed,
                },
                signal: controller.signal,
            })
            .then((res) => setStop(res.data))
            .catch((err) => {});
    };

    useEffect(() => {
        const abortController = new AbortController();

        fetch(abortController, detailed);

        return () => abortController.abort();
    }, [id, detailed]);

    return stop;
};

export default useStop;
