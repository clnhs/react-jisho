import React, { useEffect, useRef, useState } from "react";
import KanjiVG from "./KanjiVG";
import KanjiVGProgress from "./KanjiVGProgress";
import { MdPlayArrow, MdReplay } from "react-icons/md";

// unique colors generated with https://mokole.com/palette.html
const colors = [
    "saddlebrown",
    "green",
    "darkkhaki",
    "darkblue",
    "limegreen",
    "#b03060", //maroon3
    "orangered",
    "#7f007f", //purple2
    "mediumspringgreen",
    "darkcyan",
    "darkorange",
    "chartreuse",
    "blueviolet",
    "yellowgreen",
    "deepskyblue",
    "sandybrown",
    "blue",
    "dimgray",
    "lightcoral",
    "orchid",
    "aqua",
    "mediumseagreen",
    "fuchsia",
    "dodgerblue",
    "#ffff54",
    "darkolivegreen",
    "deeppink",
    "mediumslateblue",
    "paleturquoise",
    "firebrick",
    "bisque",
    "darkslateblue",
];

const KanjiVGPlayer = props => {
    const { nodeString } = props || undefined;
    const [animationState, setAnimationState] = useState({
        playing: false,
        stroke: 0,
        total: 0,
    });
    const [strokes, setStrokes] = useState([]);
    const strokeOrderAnimationRef = useRef(() => {});

    const resetStrokeOrder = () => {
        cancelAnimationFrame(
            strokeOrderAnimationRef.current
        );
        strokes.forEach(
            stroke => (stroke.style.visibility = "hidden")
        );
        setAnimationState({
            playing: false,
            stroke: 0,
            total: strokes.length,
        });
    };

    const colorizeStroke = (stroke, strokeNumber) => {
        stroke.style.visibility = "visible";
        stroke.style.stroke = colors[strokeNumber];
    };

    const drawTo = strokeNb => {
        resetStrokeOrder();
        setAnimationState(prevState => ({
            ...prevState,
            stroke: strokeNb,
        }));

        strokes.forEach(
            (stroke, index) =>
                index <= strokeNb &&
                colorizeStroke(stroke, index)
        );
    };

    const animateStrokeOrder = ({ duration }) => {
        const start = performance.now();

        resetStrokeOrder();

        let prevStrokeNumber = -1;
        strokeOrderAnimationRef.current =
            requestAnimationFrame(function animate(time) {
                let elapsed = time - start;
                if (elapsed > duration) elapsed = duration;
                const strokeNumber = Math.round(
                    (strokes.length * elapsed) / duration
                );

                if (prevStrokeNumber !== strokeNumber) {
                    colorizeStroke(
                        strokes[strokeNumber],
                        strokeNumber
                    );
                }

                prevStrokeNumber = strokeNumber;

                setAnimationState(prevState => ({
                    ...prevState,
                    playing: true,
                    stroke: strokeNumber,
                }));

                if (strokeNumber < strokes.length - 1)
                    strokeOrderAnimationRef.current =
                        requestAnimationFrame(animate);
                else
                    setAnimationState(prevState => ({
                        ...prevState,
                        playing: false,
                    }));
            });
    };

    return (
        <div className={`flex flex-col items-center`}>
            <KanjiVG
                nodeString={nodeString}
                setAnimationState={setAnimationState}
                animationState={animationState}
                setStrokes={setStrokes}
            />
            <div className={`flex flex-row items-center justify-center gap-4`}>
                <button
                    className={`p-2 text-2xl`}
                    onClick={() =>
                        animateStrokeOrder({
                            duration: 10000,
                        })
                    }
                >
                    {animationState.playing ||
                    animationState.stroke ===
                        animationState.total ? (
                        <MdReplay />
                    ) : (
                        <MdPlayArrow />
                    )}
                </button>
                <KanjiVGProgress
                    current={animationState.stroke}
                    min={0}
                    max={animationState.total - 1}
                    onValueChange={strokeNb =>
                        drawTo(strokeNb[0])
                    }
                />
                <span className={`p-2 text-md`}>
                    {`${animationState.stroke+1}/${animationState.total}`}
                </span>
            </div>
        </div>
    );
};

export default KanjiVGPlayer;
