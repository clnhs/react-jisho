import React from "react";
import KanjiEntry from "./entries/KanjiEntry/KanjiEntry";

/**
 * Lists kanji results in the SearchResultsPage ([query]) page component.
 *
 * The kanji prop matches the object the API endpoint
 *  /api/search/words and /api/search/kanji delivers
 *
 * @param props {{className:string,kanji:Object}}
 * @returns {JSX.Element}
 * @constructor
 */
const KanjiList = props => {
    const { kanji } = props || undefined;
    return (
        <div
            className={`grid gap-4 auto-rows-min auto-cols-auto col-span-1 md:col-span-2 md:grid-cols-2 lg:col-span-5 xl:col-span-6 xl:grid-cols-3 2xl:grid-cols-4`}
        >
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
