import React, { useEffect, useRef, useState } from "react";

/**
 * Hook for matching media queries
 *
 * @param {Array<string>} queries - List of queries (without parentheses)
 * @param {string} matchType - "all" returns all queries that matched **(default)**
 * @returns {Set<string> || string} active match or matches
 */
const useMediaQueries = (queries, matchType = "all") => {
    const isClientSide = globalThis !== undefined;

    const storedWatchedMediaQueriesLists = [];

    // We don't take in parameters because we go through all
    //  mediaQueryLists to check for changes
    const updateActiveMediaQueries = () => {
        console.log(`updateActiveMediaQueries`);
        storedWatchedMediaQueriesLists.forEach(mql => {
            const media = mql.media.replace(/\(|\)/g, "");

            if (mql.matches)
                setActiveMediaQueries(prevState => {
                    const newState = new Set([...prevState.values()]);
                    newState.add(media);
                    return newState;
                });
            else
                setActiveMediaQueries(prevState => {
                    const newState = new Set([...prevState.values()]);
                    newState.delete(media);
                    return newState;
                });
        });
    };

    const [activeMediaQueries, setActiveMediaQueries] = useState(new Set());

    useEffect(() => {
        const changeHandler = (e) => updateActiveMediaQueries();

        // Store MediaQueryLists made of the passed in queries.
        storedWatchedMediaQueriesLists.push(...queries.map(q => globalThis.matchMedia(`(${q})`)));

        updateActiveMediaQueries();

        // Add event listeners
        storedWatchedMediaQueriesLists.forEach(mql => mql.addEventListener("change", changeHandler));

        // Remove event listeners on dismount
        return () => storedWatchedMediaQueriesLists.forEach(mql => mql.removeEventListener("change", changeHandler));
    }, [setActiveMediaQueries]);

    return activeMediaQueries;
};

export default useMediaQueries;
