import TrainInformation from "@/models/TrainInformation";
import Trip from "@/models/Trip";
import endpoint from "@/utils/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";

const useTrainInformation = ({
    id,
}: {
    id: string | null;
}): TrainInformation | null => {
    const [train, setTrain] = useState<TrainInformation | null>(null);

    const fetch = (controller: AbortController) => {
        setTrain(null);
        axios
            .get(endpoint(`/ns/trains/${id}`), {
                signal: controller.signal,
            })
            .then((res) => setTrain(res.data))
            .catch((err) => {});
    };

    useEffect(() => {
        const abortController = new AbortController();

        if (id) {
            fetch(abortController);
        }

        return () => abortController.abort();
    }, [id]);

    return train;
};

export default useTrainInformation;
