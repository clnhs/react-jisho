import React, { useState } from "react";
import ExternalLookupDialog from "../../ExternalLookupDialog/ExternalLookupDialog";
import Pronunciation from "../../../Pronunciation/Pronunciation";
import SenseBlock from "./SenseBlock";
import RubyText from "./RubyText/RubyText";

const WordEntry = props => {
    const { reading, common, senses, audio, pitch } =
        props.word || undefined;

    const [
        externalLookupDialogIsOpen,
        setExternalLookupDialogIsOpen,
    ] = useState(false);

    const toggleExternalLookupDialog = e =>
        setExternalLookupDialogIsOpen(prev => !prev);

    return (
        <div
            className={`group first:mt-0 p-[1px] rounded-lg overflow-hidden hover:shadow-sm hover:shadow-blue-300 hover:bg-blue-300 hover:cursor-pointer transition-all ${
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
        </div>
    );
};

export default WordEntry;
