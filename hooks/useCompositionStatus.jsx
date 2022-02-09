import React, { useEffect, useState } from "react";

/**
 * A hook that watches for composition start/end events. Useful to prevent accidental
 *  submissions while entering test with an IME like Kotoeri.
 *
 *  Note: Composition events actually bubble, so you can
 *  watch from as far as the `window` or as
 *  close as your component.
 *
 *  _**IMPORTANT:**_ `compositionData` contains only what
 *          is currently inside and editable in the buffer.
 *          Any text previously inserted into the text input
 *          field is not part of this buffer.
 *
 * @param attachedEl {HTMLElement || HTMLInputElement} The element you want to listen to for composition events.
 * @returns {{compositionData: string, isComposing: boolean}}
 */
const useCompositionStatus = (attachedEl = globalThis) => {
    const [isComposing, setIsComposing] = useState(false);
    const [compositionData, setCompositionData] = useState("");

    const isComposingUpdateHandler = () => {
        setIsComposing(prevState => !prevState);
    };

    const compositionUpdateHandler = (e) => {
        setCompositionData(e.data);
    };

    useEffect(() => {
        // Triggered as the IME window pops up.
        attachedEl.addEventListener(
            "compositionstart",
            isComposingUpdateHandler,
        );

        // Triggered for every change of the current
        //  editing buffer (NOT INCLUDING ALREADY VALIDATED
        //  INPUT)
        attachedEl.addEventListener(
            "compositionupdate",
            compositionUpdateHandler,
        );

        // Triggered when the IME window disappears.
        //  Usually this happens when the user validates
        //  the current buffer, or when input focus is lost.
        attachedEl.addEventListener(
            "compositionend",
            isComposingUpdateHandler,
        );

        return () => {
            attachedEl.removeEventListener(
                "compositionstart",
                isComposingUpdateHandler,
            );
            attachedEl.removeEventListener(
                "compositionupdate",
                compositionUpdateHandler,
            );
            attachedEl.removeEventListener(
                "compositionend",
                isComposingUpdateHandler,
            );
        };
    }, [attachedEl]);

    return { isComposing, compositionData };
};

export default useCompositionStatus;
