import React from "react";
import * as Jotoba from "../../../../utils/JotobaUtils";

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

    const posBlocks = partsOfSpeech.map(part => {
        return Jotoba.parsePos(part);
    });

    return (
        <>
            <div className={`text-sm font-bold`}>
                {posBlocks.join(", ")}
            </div>
            <ol className={`pl-8 text-lg list-decimal`}>
                {glossBlocks.map((glossBlock, index) => (
                    <li key={`gloss-${index}`}>
                        {glossBlock}
                    </li>
                ))}
            </ol>
        </>
    );
};

export default SenseBlock;
