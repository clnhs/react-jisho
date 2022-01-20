import React, { useState } from "react";
import { MdBrush, MdOutlineSchool } from "react-icons/md";
import ExternalLookupDialog from "../ExternalLookupDialog/ExternalLookupDialog";

const KanjiEntry = props => {
    const {
        literal,
        meanings,
        grade,
        stroke_count,
        frequency,
        jlpt,
        onyomi,
        kunyomi,
        parts,
        radical,
        stroke_frames,
    } = props.kanji || undefined;

    const [
        externalLookupDialogIsOpen,
        setExternalLookupDialogIsOpen,
    ] = useState(false);

    const toggleExternalLookupDialog = e =>
        setExternalLookupDialogIsOpen(prev => !prev);

    const Readings = props => {
        const { type, readings } = props || undefined;

        return (
            <div
                className={`flex flex-col flex-nowrap items-center justify-start w-full border-t first:border-r border-gray-300 dark:border-gray-800`}
            >
                <div
                    className={`w-full py-0.5 text-center text-sm border-b border-gray-300 dark:border-gray-800`}
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
                                            .replaceAll(".", "・")
                                            .replaceAll("-", "ー")}
                                        <br />
                                    </span>
                                );
                        })}
                </span>
            </div>
        );
    };

    const Data = props => {
        const { grade, jlpt, frequency } = props.data || undefined;
        return (
            <div
                className={`flex flex-row text-sm border-b border-gray-300 dark:border-gray-800`}
            >
                {stroke_count && (
                    <div
                        className={`flex items-center justify-center px-0.5 py-0.5 w-full text-center border-r last:border-r-0 border-gray-300 dark:border-gray-800`}
                    >
                        <span>
                            <MdBrush className={`inline`} />
                            &nbsp;{stroke_count}
                        </span>
                    </div>
                )}
                {jlpt && (
                    <div
                        className={`flex items-center justify-center px-0.5 py-0.5 w-full text-center border-r last:border-r-0 border-gray-300 dark:border-gray-800`}
                    >
                        <span>JLPT&nbsp;N{jlpt}</span>
                    </div>
                )}
                {grade && (
                    <div
                        className={`flex items-center justify-center px-0.5 py-0.5 w-full text-center border-r last:border-r-0 border-gray-300 dark:border-gray-800`}
                    >
                        <MdOutlineSchool className={`inline`} />
                        &nbsp;{grade}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={`kanji group flex flex-col flex-nowrap rounded-lg overflow-hidden box-content border-[1px] border-gray-200 hover:border-blue-300 w-full sm:w-48 bg-white dark:bg-gray-700 hover:bg-blue-300/20 border-black/10 dark:border-black/30 hover:shadow-sm hover:shadow-blue-300 transition-all hover:cursor-pointer`}
            onClick={toggleExternalLookupDialog}
        >
            <Data data={{ grade, jlpt, stroke_count }} />
            <div className={`flex flex-col justify-center w-full h-full`}>
                <div
                    className={`flex flex-col items-center justify-center w-full h-24 mb-2 text-center text-7xl overflow-hidden`}
                >
                    <span className={`jp kyoka-on-hover`}>
                        {literal}
                    </span>
                </div>
                <span
                    className={`block w-full text-center overflow-hidden text-ellipsis px-1`}
                >
                    {Array.isArray(meanings) ? meanings.join(", ") : meanings}
                </span>
            </div>
            <div className={`flex justify-around w-full`}>
                <Readings type={"kunyomi"} readings={kunyomi} />
                <Readings type={"onyomi"} readings={onyomi} />
            </div>
            <ExternalLookupDialog
                open={externalLookupDialogIsOpen}
                data={{ literal }}
            />
        </div>
    );
};

export default KanjiEntry;
