import React, { useEffect, useRef } from "react";

/**
 * A hook for easy EventListener implementation.
 *
 * @param {string} eventName
 * @param {function} eventHandler
 * @param {HTMLElement || Object} element
 */
const useEventListener = (
    eventName,
    eventHandler,
    element = globalThis
) => {
    const storedEventHandler = useRef();

    useEffect(() => {
        storedEventHandler.current = eventHandler;
    }, [eventHandler]);

    useEffect(() => {
        const eventListener = e =>
            storedEventHandler.current(e);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(
                eventName,
                eventListener
            );
        };
    }, [eventName]);
};

export default useEventListener;
