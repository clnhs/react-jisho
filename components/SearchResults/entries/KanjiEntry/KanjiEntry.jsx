import React, { useState } from "react";
import ExternalLookupDialog from "../../ExternalLookupDialog/ExternalLookupDialog";
import ReadingsTable from "./ReadingsTable";
import InfoHeader from "./InfoHeader";
import Card from "../../../UI/Card";

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
        <Card
            className={`sm:w-48`}
            onClick={toggleExternalLookupDialog}
        >
            <div className={`kanji flex flex-col flex-nowrap justify-between h-full`}>
                <InfoHeader
                    data={{ grade, jlpt, stroke_count }}
                />
                <div
                    className={`flex flex-col justify-center w-full`}
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
                <div className={`b-0 flex justify-around w-full`}>
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
        </Card>
    );
};

export default KanjiEntry;
