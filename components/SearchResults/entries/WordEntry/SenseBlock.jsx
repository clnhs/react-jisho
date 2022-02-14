import React, { useEffect, useState } from "react";
import { parsePos } from "../../../../utils/JotobaUtils";
import useSwr from "swr";

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
    }, [posData, setPosBlocks]);

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
