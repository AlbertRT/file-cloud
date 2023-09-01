import { useEffect } from "react";
import { mutate } from "swr";

let liveQueries = new Set();

export const trackLiveQueries = (useSWRNext) => {
    return (key, fetcher, config) => {
        const swr = useSWRNext(key, fetcher, config);

        useEffect(() => {
            liveQueries.add(key);

            return () => {
                liveQueries.delete(key);
            };
        }, [key]);

        return swr;
    };
}

export const revalidateLiveQueries = async () => {
    let promises = [...liveQueries.values()].map((key) => mutate(key));

    return Promise.all(promises);
}