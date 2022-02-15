import React from "react";
import KanjiEntry from "./entries/KanjiEntry/KanjiEntry";

/**
 * Lists kanji results in the SearchResultsPage ([query]) page component.
 *
 * The kanji prop it takes as a prop is such as the API endpoints
 *  /api/search/words and /api/search/kanji delivers, converted from JSON.
 *
 * @param props {{className:string,kanji:Object}}
 * @returns {JSX.Element}
 * @constructor
 */
const KanjiList = props => {
    const { className, kanji } = props || undefined;
    return (
        <div className={className}>
            {kanji.map(kanji => (
                <KanjiEntry
                    key={kanji.literal}
                    kanji={kanji}
                />
            ))}
        </div>
    );
};

export default KanjiList;
