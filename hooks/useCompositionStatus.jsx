import React, { useEffect, useRef, useState } from "react";

const useCompositionStatus = (attachedEl = globalThis) => {
    const [isComposing, setIsComposing] = useState(false);

    // CompositionStart and CompositionEnd handlers are internal
    // so don't belong in useEffect().
    const compositionStartHandler = e => {
        setIsComposing(true);
    };
    const compositionEndHandler = e => {
        setIsComposing(false);
    };

    useEffect(() => {
        attachedEl.addEventListener(
            "compositionstart",
            compositionStartHandler
        );

        attachedEl.addEventListener(
            "compositionend",
            compositionEndHandler
        );

        return () => {
            attachedEl.removeEventListener(
                "compositionstart",
                compositionStartHandler
            );
            attachedEl.removeEventListener(
                "compositionend",
                compositionEndHandler
            );
        };
    }, [attachedEl]);

    return { isComposing };
};

export default useCompositionStatus;
