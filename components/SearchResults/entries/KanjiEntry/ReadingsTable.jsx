import React from "react";

/**
 * Provides a kanji readings table for our user. Used in the
 *  KanjiEntry component.
 *
 * @param props {{type:string,readings:Array<string>}}
 * @returns {JSX.Element}
 * @constructor
 */
const ReadingsTable = props => {
    const { type, readings } = props || undefined;

    return (
        <div
            className={`flex flex-col flex-nowrap items-center justify-start w-full border-t first:border-r border-gray-200 dark:border-gray-800`}
        >
            <div
                className={`w-full py-0.5 text-center text-sm border-b border-gray-200 dark:border-gray-800`}
            >
                {type === "kunyomi" && "KUN"}
                {type === "onyomi" && "ON"}
            </div>
            <span
                className={`h-fit py-2 jp`}
                style={{
                    writingMode: "vertical-lr",
                    wordBreak: "keep-all",
                }}
            >
                {readings &&
                    readings.map((reading, index) => {
                        if (index < 4)
                            return (
                                <span key={index}>
                                    {reading
                                        .replaceAll(
                                            ".",
                                            "・"
                                        )
                                        .replaceAll(
                                            "-",
                                            "ー"
                                        )}
                                    <br />
                                </span>
                            );
                    })}
            </span>
        </div>
    );
};

export default ReadingsTable;
