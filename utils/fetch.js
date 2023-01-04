import React, { useCallback, useState } from "react";

export const doFetch = async (rqUrl, fetchParams) => {
    if (fetchParams.method === "GET")
        return await fetch(rqUrl, fetchParams);

    return await fetch(rqUrl, {
        method: fetchParams.method,
        mode: "cors",
        cache: "no-cache",
        referrerPolicy: "no-referrer",
        headers: {
            "Content-Type": "application/json",
        },
        ...fetchParams,
    });
};

/**
 * Wrapper around `fetch`.
 *
 * @param {string||undefined} baseUrl
 * @returns {[boolean,boolean||Error,((function(*=, *): Promise<void>)|*)]}
 */
const useFetch = baseUrl => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null);

    const fetch = useCallback(
        async (config, callback) => {
            const { url: rqUrl, ...fetchParams } = config;

            try {
                setIsLoading(true);
                setHasError(null);

                const res = await doFetch(baseUrl ?? rqUrl, fetchParams);

                if (!!res && !res.ok) {
                    throw new Error(`Fetch failed with ${res.status}: ${res.statusText}`);
                }

                const data = await res;
                callback(data);
            } catch (err) {
                setHasError(err);
            } finally {
                setIsLoading(false);
            }
        },
        [baseUrl],
    );

    return [isLoading, hasError, fetch];
};

export default useFetch;
