import React, { useEffect, useRef } from "react";

const svg = nodeString => `<svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 109 109" 
                            preserveAspectRatio="xMinYMin"
                            class="kanjivg"
                            >
                                ${nodeString}
                            </svg>`;

const KanjiVG = props => {
    const {
        nodeString,
        setAnimationState,
        animationState,
        setStrokes,
    } = props || undefined;
    const svgContainerRef = useRef();

    useEffect(() => {
        if (
            svgContainerRef.current.getElementsByTagName(
                "svg"
            ).length === 1 &&
            animationState.total === 0
        ) {
            const svgEl =
                svgContainerRef.current.getElementsByTagName(
                    "svg"
                )[0];
            const paths =
                svgEl.querySelectorAll(`path[id*="-s"]`);

            paths.forEach((path, index) => {
                setStrokes(prevState => [
                    ...prevState,
                    path,
                ]);
            });

            setAnimationState(prevState => ({
                ...prevState,
                total: paths.length,
            }));
        }
    }, [svgContainerRef]);

    return (
        <div
            ref={svgContainerRef}
            dangerouslySetInnerHTML={{
                __html: svg(nodeString),
            }}
        />
    );
};

export default KanjiVG;
