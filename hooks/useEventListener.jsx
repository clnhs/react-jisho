import React, { useEffect, useRef } from "react";

const useEventListener = (eventName, eventHandler, element = globalThis) => {
    const storedEventHandler = useRef();

    useEffect(() => {
        storedEventHandler.current = eventHandler;
    }, [eventHandler]);

    useEffect(() => {
        const eventListener = e => storedEventHandler.current(e);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName]);
};

export default useEventListener;
