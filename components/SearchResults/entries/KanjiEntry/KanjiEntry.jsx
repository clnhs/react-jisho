import React, { useState } from "react";
import ExternalLookupDialog from "../../ExternalLookupDialog/ExternalLookupDialog";
import ReadingsTable from "./ReadingsTable";
import InfoHeader from "./InfoHeader";

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

    return (
        <div
            className={`kanji group flex flex-col flex-nowrap rounded-lg overflow-hidden box-content border-[1px] border-gray-200 hover:border-blue-300 w-full sm:w-48 bg-white dark:bg-gray-700 hover:bg-blue-300/20 border-black/10 dark:border-black/30 hover:shadow-sm hover:shadow-blue-300 transition-all hover:cursor-pointer`}
            onClick={toggleExternalLookupDialog}
        >
            <InfoHeader
                data={{ grade, jlpt, stroke_count }}
            />
            <div
                className={`flex flex-col justify-center w-full h-full`}
            >
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
                    {Array.isArray(meanings)
                        ? meanings.join(", ")
                        : meanings}
                </span>
            </div>
            <div className={`flex justify-around w-full`}>
                <ReadingsTable
                    type={"kunyomi"}
                    readings={kunyomi}
                />
                <ReadingsTable
                    type={"onyomi"}
                    readings={onyomi}
                />
            </div>
            <ExternalLookupDialog
                open={externalLookupDialogIsOpen}
                data={{ literal }}
            />
        </div>
    );
};

export default KanjiEntry;
