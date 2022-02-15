import React from "react";
import WordEntry from "./entries/WordEntry/WordEntry";

/**
 * Lists word results in the SearchResultsPage ([query]) page component.
 *
 * The word prop it takes as a prop is such as the API endpoint
 *  /api/search/words delivers, converted from JSON.
 *
 * @param props {{className:string, words:Array}}
 * @returns {JSX.Element}
 * @constructor
 */
const WordList = props => {
    const { className, words } = props || undefined;
    return (
        <div className={className}>
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
