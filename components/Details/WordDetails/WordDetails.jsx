import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import RubyText from "../../UI/RubyText/RubyText";
import Pronunciation from "../../Pronunciation/Pronunciation";
import SenseBlock from "../../SearchResults/entries/WordEntry/SenseBlock";
import SentencesCard from "./SentencesCard";
import KanjiList from "../../SearchResults/KanjiList";
import useMatchMedia from "../../../hooks/useMatchMedia";
import useJotoba from "../../../hooks/useJotoba";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

/**
 * Displays details of a word to our user. Main component
 *  of the WordDetailsPage ([word]) page component.
 *
 * @param props {{word:Object}} - a word object as obtained through the Jotoba.de api/search/words endpoint, converted from JSON into an object.
 * @returns {JSX.Element}
 * @constructor
 */
const WordDetails = props => {
    const { word, relatedKanji } = props || undefined;
    const { reading, pitch, audio, senses } = word || undefined;

    const isMobile = useMatchMedia(["max-width: 480px"]);

    const {
        jotobaIsLoading: jotobaSentencesIsLoading,
        jotobaHasError: jotobaSentencesHasError,
        getJotobaResults: getJotobaSentencesResults,
    } = useJotoba("sentences");

    const [sentencesResult, setSentencesResult] = useState();

    useEffect(() => {
        word && getJotobaSentencesResults(reading.kanji || reading.kana, setSentencesResult);
    }, [word, reading, setSentencesResult, getJotobaSentencesResults]);

    return (<div
        className={`${!isMobile && `pl-20`} p-4 flex flex-col gap-4`}
    >
        <div
            className={`flex flex-col w-full h-auto p-4`}
        >
            <div
                className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4 w-full justify-center`}
            >
                <div
                    className={`flex flex-col col-span-1 gap-4 sm:col-span-2 lg:col-span-7 xl:col-span-6`}
                >
                    <Card>
                        <div
                            className={`flex flex-col px-4 py-2 w-full`}
                        >
                            <div
                                className={`flex flex-col gap-2`}
                            >
                                <div
                                    className={`text-3xl lg:text-4xl jp`}
                                >
                                    {reading.furigana && reading.kanji && (<RubyText
                                        text={reading.kanji}
                                        furigana={reading.furigana}
                                    />)}
                                    {!reading.furigana && (<span>
                                                {reading.kana}
                                            </span>)}
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
                                        {senses && senses.map((sense, index) => (<SenseBlock
                                            key={index}
                                            sense={sense}
                                        />))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    {jotobaSentencesIsLoading && <Card className={`w-full flex flex-col items-center`}>
                        <AiOutlineLoading3Quarters
                            className={`m-4 text-5xl animate-spin`}
                        />
                    </Card>}
                    {!jotobaSentencesIsLoading && !jotobaSentencesHasError && sentencesResult?.length > 0 && (
                        <SentencesCard
                            sentences={sentencesResult}
                        />)}
                </div>
                {relatedKanji?.length > 0 && (<KanjiList
                    // className={`grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 h-fit`}
                    kanji={relatedKanji}
                />)}
            </div>
        </div>
    </div>);
};

export default WordDetails;
