import React from "react";

/**
 * Displays the pitch accent of a word.
 *
 * @param props {{pitch:string}}
 * @returns {JSX.Element}
 * @constructor
 */
const PitchAccent = props => {
    const { pitch: unfilteredPitch } = props || undefined;

    const pitch = unfilteredPitch.filter(
        pitchSegment => !!pitchSegment.part
    );

    const PitchPart = props => {
        const { accent, index } = props || undefined;
        let { max } = props || undefined;

        return (
            <>
                <span
                    className={`${
                        accent.high
                            ? `pt-0.5 bg-gradient-to-b from-red-400 ${
                                  index > 0
                                      ? `pl-0.5 -ml-0.5`
                                      : ``
                              } ${
                                  index < max
                                      ? `pr-0.5 -mr-0.5`
                                      : ``
                              }`
                            : `pb-0.5 bg-gradient-to-t from-blue-400 ${
                                  index > 0 ? `pl-0.5` : ``
                              } ${
                                  index < max
                                      ? `pr-0.5`
                                      : ``
                              }`
                    }`}
                >
                    <span
                        className={`bg-white dark:bg-gray-700 ${
                            accent.high
                                ? index > 0 && `pl-0.5`
                                : index > 0 && `pl-0.5`
                        }`}
                    >
                        {accent.part}&#8202;
                    </span>
                </span>
            </>
        );
    };

    return (
        <p
            className={`text-lg`}
            style={{
                wordBreak: "keep-all",
            }}
        >
            {pitch.map((accent, index) => {
                return (
                    <PitchPart
                        key={`pitch-part-${accent.part}-${index}`}
                        accent={accent}
                        index={index}
                        max={pitch.length - 1}
                    />
                );
            })}
        </p>
    );
};

export default PitchAccent;
