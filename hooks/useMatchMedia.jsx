import React, { useEffect, useRef, useState } from "react";

/**
 * Hook for matching media queries
 *
 * @param {Array<string>} queries - List of queries (without parentheses)
 * @param {string} matchType - "all" checks if all queries are true and returns result, "any" returns all active media queries in an array **(default)**
 * @returns {Set<string> || boolean} - _boolean_ if matchType "all" **(default)** or _Set_ of active matches if matchType "any"
 */
const useMatchMedia = (queries, matchType = "all") => {
    const [matchedMediaQueries, setMatchedMediaQueries] = useState(matchType === "all" ? false : new Set());

    const mediaQueryLists = [];

    // We don't take in parameters because we go through all
    //  mediaQueryLists to check for changes
    const updateActiveMediaQueries = () => {
        if (matchType === "all") {
            // If the number of matching MediaQueryLists
            //  equals that of the length of mediaQueryLists
            //  then they all match
            setMatchedMediaQueries(mediaQueryLists.reduce((acc, curr) => {
                if (curr.matches)
                    return (acc += 1);
                return acc;
            }, 0) === mediaQueryLists.length);
        } else {
            // If matchType is "any" (only other option)
            //  go through mediaQueryLists
            mediaQueryLists.forEach(mql => {
                const media = mql.media.replace(/\(|\)/g, "");

                // Add matches to matchedMediaQueries
                if (mql.matches)
                    setMatchedMediaQueries(prevState => {
                        const newState = new Set([...prevState.values()]);
                        newState.add(media);
                        return newState;
                    });
                // Remove non-matches from matchedMediaQueries
                else
                    setMatchedMediaQueries(prevState => {
                        const newState = new Set([...prevState.values()]);
                        newState.delete(media);
                        return newState;
                    });
            });
        }
    };

    useEffect(() => {
        const changeHandler = (e) => updateActiveMediaQueries();

        // Store MediaQueryLists made of the passed in queries.
        mediaQueryLists.push(...queries.map(q => globalThis.matchMedia(`(${q})`)));

        updateActiveMediaQueries();

        // Add event listeners to
        //  watch for changes in mediaQueryLists
        mediaQueryLists.forEach(mql => mql.addEventListener("change", changeHandler));

        // Remove event listeners on dismount
        return () => mediaQueryLists.forEach(mql => mql.removeEventListener("change", changeHandler));
    }, [setMatchedMediaQueries]);

    return matchedMediaQueries;
};

export default useMatchMedia;
