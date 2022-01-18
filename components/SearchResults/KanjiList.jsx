import React from "react";
import KanjiEntry from "./entries/KanjiEntry";

const KanjiList = (props) => {
    const {className, kanji} = props || undefined;
    return (
        <div
            className={className}
        >
            {kanji.map(
                kanji => (
                    <KanjiEntry
                        key={
                            kanji.literal
                        }
                        kanji={kanji}
                    />
                )
            )}
        </div>
    );
};

export default KanjiList;
