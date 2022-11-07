import React, { useEffect, useState } from "react";
import { parsePos } from "../../../../utils/JotobaUtils";
import useSwr from "swr";

/**
 * Provides a block component displaying the glosses and corresponding
 *  part of speech corresponding to the word displayed
 *  in WordEntry and WordDetails ([word]) page components.
 *
 *  **misc and xref currently unimplemented**
 *
 * @param props {{glosses:Array<Object>,pos:Array<Object>||string,misc?:string,xref?:string}}
 * @returns {JSX.Element}
 * @constructor
 */
const SenseBlock = props => {
    const { data: posData, error: posDataError } = useSwr(
        "/PartsOfSpeech.json",
        (...args) => fetch(...args).then(res => res.json())
    );
    const {
        glosses,
        pos: partsOfSpeech,
        misc,
        xref,
    } = props.sense || undefined;

    const glossBlocks = glosses.map((gloss, index) => (
        <p key={index}>{gloss}</p>
    ));

    const [posBlocks, setPosBlocks] = useState([]);

    useEffect(() => {
        if (posData)
            setPosBlocks(
                partsOfSpeech.map(pos =>
                    parsePos(pos, { posData })
                )
            );
    }, [posData, setPosBlocks, partsOfSpeech]);

    return (
        <>
            {posBlocks.length > 0 && !posDataError && (
                <>
                    <div className={`text-sm font-bold`}>
                        {posBlocks.join(", ")}
                    </div>
                    <ol
                        className={`pl-8 text-lg list-decimal`}
                    >
                        {glossBlocks.map(
                            (glossBlock, index) => (
                                <li key={`gloss-${index}`}>
                                    {glossBlock}
                                </li>
                            )
                        )}
                    </ol>
                </>
            )}
        </>
    );
};

export default SenseBlock;
