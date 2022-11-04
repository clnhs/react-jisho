import React from "react";
import WordEntry from "./entries/WordEntry/WordEntry";

/**
 * Lists word results in the SearchResultsPage ([query]) page component.
 *
 * The word prop matches the object the API endpoint
 *  /api/search/words and /api/search/kanji delivers
 *
 * @param props {{className:string, words:Array}}
 * @returns {JSX.Element}
 * @constructor
 */
const WordList = props => {
    const { words } = props || undefined;
    return (
        <div
            className={`flex flex-col col-span-1 gap-4 sm:col-span-2 lg:col-span-7 xl:col-span-6`}
        >
            {words.map((word, index) => (
                <WordEntry
                    key={`${word.reading.kana}-${index}`}
                    word={word}
                />
            ))}
        </div>
    );
};

export default WordList;
