import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";

const SenseBlock = props => {
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

    const [
        posParserIsLoading,
        posParserHasError,
        getParsedPos,
    ] = useFetch("/api/pos");

    useEffect(() => {
        getParsedPos(
            {
                method: "POST",
                bodyData: { partsOfSpeech: partsOfSpeech },
            },
            setPosBlocks
        );
    }, [getParsedPos, setPosBlocks]);

    return (
        <>
            {posBlocks.length > 0 &&
                !posParserIsLoading &&
                !posParserHasError && (
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
