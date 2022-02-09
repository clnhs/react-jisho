import React from "react";
import WordEntry from "./entries/WordEntry/WordEntry";

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
