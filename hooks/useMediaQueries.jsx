import React, { useEffect, useRef, useState } from "react";

const useMediaQueries = (queries) => {
    const isClientSide = globalThis !== undefined;
    const [activeMediaQuery, setActiveMediaQuery] = useState();

    const storedWatchedMediaQueries = useRef();
    const listeners = [];

    const changeHandler = (e) => {
        e.matches && console.log(storedWatchedMediaQueries.find());
    };

    useEffect(() => {
        storedWatchedMediaQueries.current = queries.map(q => ({
            mediaQuery: globalThis.matchMedia(q.media),
            pref: q.pref,
        }));
    }, [queries]);

    useEffect(() => {
        if (!isClientSide) return;

        listeners.push(...storedWatchedMediaQueries.current.map(mq => {
            mq.mediaQuery.addEventListener("change", changeHandler);
        }));

    }, []);

    return { activeMediaQuery };
};

export default useMediaQueries;
