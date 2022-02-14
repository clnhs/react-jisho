import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { parsePos } from "../../../../utils/JotobaUtils";

const SenseBlock = props => {
    const [posData, setPosData] = useState({});
    const [posDataIsLoading, posDataHasError, getPosData] =
        useFetch("/PartsOfSpeech.json");
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
        getPosData({ method: "GET" }, setPosData);
    }, [setPosData]);

    useEffect(() => {
        if (Object.entries(posData).length > 0) {
            setPosBlocks(
                partsOfSpeech.map(pos =>
                    parsePos(pos, { posData })
                )
            );
        }
    }, [posData, setPosBlocks]);

    return (
        <>
            {posBlocks.length > 0 &&
                !posDataIsLoading &&
                !posDataHasError && (
                    <>
                        <div
                            className={`text-sm font-bold`}
                        >
                            {posBlocks.join(", ")}
                        </div>
                        <ol
                            className={`pl-8 text-lg list-decimal`}
                        >
                            {glossBlocks.map(
                                (glossBlock, index) => (
                                    <li
                                        key={`gloss-${index}`}
                                    >
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
