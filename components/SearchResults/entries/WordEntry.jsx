import React, { useState } from "react";
import PitchAccent from "../../Pronunciation/PitchAccent";
import ExternalLookupDialog from "../ExternalLookupDialog/ExternalLookupDialog";
import { MdPlayCircle } from "react-icons/md";
import Pronunciation from "../../Pronunciation/Pronunciation";

const WordEntry = props => {
    const { reading, common, senses, audio, pitch } =
        props.word || undefined;

    const [
        externalLookupDialogIsOpen,
        setExternalLookupDialogIsOpen,
    ] = useState(false);

    const toggleExternalLookupDialog = e =>
        setExternalLookupDialogIsOpen(prev => !prev);

    const isKanji = char => {
        if (typeof char === "string")
            return !!char.match(/[一-龯]/);

        return false;
    };

    const Ruby = props => {
        const { char, furigana } =
            props.rubyData || undefined;
        return (
            <ruby>
                <span>{char}</span>
                <rp>(</rp>
                {
                    <rt
                        className={`text-sm jp pointer-events-none`}
                    >
                        {furigana}
                    </rt>
                }
                <rp>)</rp>
            </ruby>
        );
    };

    const RubyText = props => {
        const { text, furigana, kana } = props || undefined;
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
                        <span key={"no-ruby-" + char}>
                            {char}
                        </span>
                    );
                })}
            </>
        );
    };

    const parsePos = part => {
        const partsOfSpeech = [];

        if (typeof part === "string") {
            if (part !== "AuxiliaryVerb") {
                partsOfSpeech.push(`Auxiliary verb`);
            } else partsOfSpeech.push(part);
        } else if (part.hasOwnProperty("Verb")) {
            if (typeof part.Verb === "string")
                partsOfSpeech.push(part.Verb + " verb");
            else if (part.Verb.hasOwnProperty("Godan")) {
                partsOfSpeech.push(`Godan verb`);
            } else if (
                part.Verb.hasOwnProperty("Irregular")
            ) {
                if (part.Verb.Irregular === "NounOrAuxSuru")
                    partsOfSpeech.push(
                        `Irregular 〜する verb`
                    );
            }
        } else if (part.hasOwnProperty("Noun")) {
            if (part.Noun === "Normal")
                partsOfSpeech.push(`Noun`);
            else
                partsOfSpeech.push(
                    part.Noun.toLowerCase() + " noun"
                );
        } else if (part.hasOwnProperty("Adjective"))
            partsOfSpeech.push(`${part.Adjective} adj.`);
        else partsOfSpeech.push(JSON.stringify(part.Verb));

        return partsOfSpeech;
    };

    const Sense = props => {
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
            return parsePos(part);
        });

        return (
            <>
                <div className={`text-sm font-bold`}>
                    {posBlocks.join(", ")}
                </div>
                <ol className={`pl-8 text-lg list-decimal`}>
                    {glossBlocks.map((glossBlock,index) => (
                        <li key={`gloss-${index}`}>
                            {glossBlock}
                        </li>
                    ))}
                </ol>
            </>
        );
    };

    return (
        <div
            className={`group first:mt-0 p-0.5 rounded-lg overflow-hidden hover:shadow-sm hover:shadow-blue-300 hover:bg-blue-300 hover:cursor-pointer transition-all ${
                common
                    ? `bg-gradient-to-br from-green-500 group-hover:to-blue-300`
                    : "bg-gradient-to-r from-black/10 dark:from-black/40"
            }`}
            onClick={toggleExternalLookupDialog}
        >
            <div
                className={`relative grid grid-cols-2 rounded-md overflow-hidden border-2 border-transparent w-full bg-white dark:bg-gray-700 group-hover:bg-opacity-80 transition-all`}
                style={{
                    gridTemplateColumns: `min-content 1fr`,
                }}
            >
                <div
                    className={`w-6 flex justify-center items-center ${
                        common ? `bg-green-500` : ""
                    }`}
                >
                    <span
                        className={`text-xs font-bold text-white`}
                        style={{
                            transform: `rotate(-90deg)`,
                        }}
                    >
                        {(common && "COMMON") || (
                            <>&nbsp;</>
                        )}
                    </span>
                </div>
                <div
                    className={`flex flex-col px-4 py-2 w-full`}
                >
                    <div className={`flex flex-col gap-2`}>
                        <div
                            className={`text-3xl lg:text-4xl jp`}
                        >
                            {reading.furigana &&
                                reading.kanji && (
                                    <RubyText
                                        text={reading.kanji}
                                        furigana={
                                            reading.furigana
                                        }
                                        kana={reading.kana}
                                    />
                                )}
                            {!reading.furigana && (
                                <span>{reading.kana}</span>
                            )}
                        </div>
                        <div
                            className={`grid grid-cols-12 gap-2`}
                        >
                            <Pronunciation pitch={pitch} audio={audio}/>
                            <div
                                className={`flex flex-col col-span-9`}
                            >
                                {senses.map(
                                    (sense, index) => (
                                        <Sense
                                            key={index}
                                            sense={sense}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div*/}
                {/*    className={`absolute bottom-0 right-0 py-1 px-2 rounded-tl-md bg-black/40 group-hover:bg-blue-400 text-white transition-all`}*/}
                {/*>*/}
                {/*    <a>Lookup in...</a>*/}
                {/*</div>*/}
                <ExternalLookupDialog
                    open={externalLookupDialogIsOpen}
                    data={{ reading }}
                />
            </div>
        </div>
    );
};

export default WordEntry;
