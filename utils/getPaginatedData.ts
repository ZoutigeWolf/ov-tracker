import axios from "axios";
import endpoint from "./endpoint";
import qs from "qs";

export default function getPaginatedData<T>({
    path,
    params,
    n = 100,
    signal = undefined,
    onReceive,
    onComplete = undefined,
}: {
    path: string;
    params: object;
    n?: number;
    signal?: AbortSignal;
    onReceive: (data: T) => void;
    onComplete?: () => void;
}) {
    const fetch = (offset: number = 0) =>
        axios
            .get(endpoint(path), {
                params: {
                    limit: n,
                    offset: offset,
                    ...params,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: "repeat" }),
                signal: signal,
            })
            .then((res) => {
                // if (!res.data.length) {
                //     onComplete?.();
                //     return;
                // }

                onReceive(res.data);

                fetch(offset + n);
            })
            .catch((e) => {});

    fetch();
}
