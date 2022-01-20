import React from "react";
import WordEntry from "./entries/WordEntry/WordEntry";

const WordList = props => {
    const { className, words } = props || undefined;
    return (
        <div className={className}>
            {words.map(word => (
                <WordEntry
                    key={word.reading.kana}
                    word={word}
                />
            ))}
        </div>
    );
};

export default WordList;
