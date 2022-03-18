import React from "react";
import * as Slider from "@radix-ui/react-slider";

const KanjiVGProgress = props => {
    const { current, min, max, onValueChange } =
        props || undefined;
    return (
        <Slider.Root
            value={[current]}
            min={min}
            max={max}
            className={`relative flex items-center w-20`}
            onValueChange={onValueChange}
        >
            <Slider.Track
                className={`relative w-20 h-2 bg-black/50 dark:bg-white/30 rounded-full`}
            >
                <Slider.Range
                    className={`absolute h-full bg-black dark:bg-white rounded-full`}
                />
            </Slider.Track>
            <Slider.Thumb
                className={`block w-4 h-4 rounded-full bg-gray-300`}
            />
        </Slider.Root>
    );
};

export default KanjiVGProgress;
