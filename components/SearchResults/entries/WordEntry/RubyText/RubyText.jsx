import React from "react";
import Ruby from "./Ruby";
import { isKanji } from "../../../../../utils/isKanji";

const RubyText = props => {
    const { text, furigana} = props || undefined;
    const rubyParts = furigana
        .split(/\[([^\]]*)\]/)
        .filter(str => !!str);

    const rubies = rubyParts
        .map(part => {
            const char = [
                ...part.split("|").splice(0, 1)[0],
            ];

            const furi = part
                .split("|")
                .splice(1, part.split("|").length + 1);

            const pairs = char.map((char, index) => ({
                char,
                furigana: furi[index] || "",
            }));
            return pairs;
        })
        .flat();

    const kanjiFuriganaPairsNb = rubies.filter(
        ruby => isKanji(ruby.char) && ruby.furigana
    ).length;
    const kanjiNb = [...text].filter(char =>
        isKanji(char)
    ).length;

    return (
        <>
            {[...text].map((char, index) => {
                if (kanjiFuriganaPairsNb === kanjiNb)
                    if (isKanji(char) && rubies[index])
                        return (
                            <Ruby
                                key={"ruby-for-" + char}
                                rubyData={rubies[index]}
                            />
                        );
                return (
                    <span key={index + "no-ruby-" + char}>
                        {char}
                    </span>
                );
            })}
        </>
    );
};

export default RubyText;
