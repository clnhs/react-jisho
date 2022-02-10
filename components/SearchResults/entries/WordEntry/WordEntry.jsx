import React, { useState } from "react";
import ExternalLookupDialog from "../../ExternalLookupDialog/ExternalLookupDialog";
import Pronunciation from "../../../Pronunciation/Pronunciation";
import SenseBlock from "./SenseBlock";
import RubyText from "./RubyText/RubyText";
import Card from "../../../UI/Card";
import ResultCard from "../../ResultCard";
import { useRouter } from "next/router";

const WordEntry = props => {
    const router = useRouter();
    const { reading,
        common,
        senses,
        audio,
        pitch } = props.word || undefined;

    const [
        externalLookupDialogIsOpen,
        setExternalLookupDialogIsOpen,
    ] = useState(false);

    const toggleExternalLookupDialog = e =>
        setExternalLookupDialogIsOpen(prev => !prev);

    return (
        <ResultCard
            className={`${
                common
                    ? `bg-gradient-to-br from-green-500 group-hover:to-blue-300`
                    : ""
            }`}
            onClick={()=>router.push(`/details/word/${reading.kanji||reading.kana}`)}
        >
            <div
                className={`relative grid grid-cols-2`}
                style={{
                    gridTemplateColumns: `min-content minmax(0,1fr)`,
                }}
            >
                <div
                    className={`w-6 flex justify-center items-center ${
                        common ? `bg-green-500 rounded-l-md` : ""
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
                            <Pronunciation
                                pitch={pitch}
                                audio={audio}
                            />
                            <div
                                className={`flex flex-col col-span-9`}
                            >
                                {senses.map(
                                    (sense, index) => (
                                        <SenseBlock
                                            key={index}
                                            sense={sense}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ExternalLookupDialog
                    open={externalLookupDialogIsOpen}
                    data={{ reading }}
                />
            </div>
        </ResultCard>
    );
};

export default WordEntry;
