import React from "react";
import useFetch from "../utils/fetch";

/**
 * Hook to get data from the Jotoba.de API.
 *
 * @param {string} searchType - Corresponds to Jotoba.de API endpoint.
 * **Supported Endpoints:** words (returns words and kanji), kanji, sentences, names, by_radical
 *
 * @returns {{jotobaHasError: (boolean || Error), getJotobaResults: (function(*, *): Promise<void>), jotobaIsLoading: boolean}}
 */
const useJotoba = (searchType = "words") => {
    let baseUrl = "";
    switch (searchType) {
        case "words":
        case "kanji":
        case "sentences":
        case "names":
            baseUrl = `https://jotoba.de/api/search/${searchType}`;
            break;
        case "by_radical":
            baseUrl = `https://jotoba.de/api/kanji/by_radical`;
            break;
        default:
            throw new Error(
                `Jotoba API ${searchType} doesn't exist.`
            );
    }
    const [isLoading, hasError, sendRq] = useFetch(baseUrl);

    /**
     * Get data from Jotoba.de
     * @param query
     * @param callback
     * @returns {Promise<void>||null}
     */
    const getJotobaResults = (query, callback) => {
        return sendRq(
            {
                method: "POST",
                body: JSON.stringify({
                    query,
                    no_english: false,
                    language: "English",
                }),
            },
            async resultsJson => {
                const results = await resultsJson.json();

                if (searchType === "words") {
                    if (
                        results.kanji.length > 0 ||
                        results.words.length > 0
                    )
                        callback(results);
                    else callback(null);
                } else if (searchType === "by_radical") {
                    if (
                        Object.entries("radicals").length >
                        0
                    )
                        callback(results);
                } else if (
                    Object.entries(searchType).length > 0
                ) {
                    callback(results[searchType]);
                } else callback(null);
            }
        );
    };

    return {
        jotobaIsLoading: isLoading,
        jotobaHasError: hasError,
        getJotobaResults,
    };
};

export default useJotoba;
