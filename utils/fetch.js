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

export const fetchAndCallback = async (
    rqUrl,
    fetchParams = { method: "GET" },
    callback
) => {
    if (!fetchParams) throw new Error("Not configured.");

    const res = await doFetch(rqUrl, fetchParams);

    if (!!res && !res.ok)
        throw new Error(
            `Fetch failed with ${res.status}: ${res.statusText}`
        );
    const data = await res;
    callback(data);
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

    const fetch = useCallback((config, callback) => {
        try {
            setIsLoading(true);
            setHasError(null);
            return fetchAndCallback(
                baseUrl,
                config,
                callback
            );
        } catch (err) {
            console.error(err);
            setHasError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return [isLoading, hasError, fetch];
};

export default useFetch;
