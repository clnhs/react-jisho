import React, { useEffect, useState } from "react";
import ExternalLookupCard from "./ExternalLookupCard";
import Card from "../../UI/Card";
import RubyText from "../../SearchResults/entries/WordEntry/RubyText/RubyText";
import Pronunciation from "../../Pronunciation/Pronunciation";
import SenseBlock from "../../SearchResults/entries/WordEntry/SenseBlock";
import SentencesCard from "./SentencesCard";
import KanjiList from "../../SearchResults/KanjiList";
import useMatchMedia from "../../../hooks/useMatchMedia";
import useJotoba from "../../../hooks/useJotoba";

const WordDetails = props => {
    const { word, relatedKanji } = props || undefined;

    const isMobile = useMatchMedia(["max-width: 480px"]);

    const {
        jotobaIsLoading: jotobaSentencesIsLoading,
        jotobaHasError: jotobaSentencesHasError,
        getJotobaResults: getJotobaSentencesResults,
    } = useJotoba("sentences");

    const [sentencesResult, setSentencesResult] =
        useState();

    useEffect(() => {
        word &&
            getJotobaSentencesResults(
                word.reading.kanji || word.reading.kana,
                setSentencesResult
            );
    }, [word, setSentencesResult]);
    return (
        <div
            className={`${
                !isMobile && `pl-20`
            } p-4 flex flex-col gap-4`}
        >
            <div
                className={`grid ${
                    (!isMobile && "grid-cols-2") ||
                    "grid-cols-1"
                } gap-4`}
            >
                <div className={`w-full gap-4`}>
                    <div
                        className={`flex flex-col gap-4 items-center`}
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
                                        {word.reading
                                            .furigana &&
                                            word.reading
                                                .kanji && (
                                                <RubyText
                                                    text={
                                                        word
                                                            .reading
                                                            .kanji
                                                    }
                                                    furigana={
                                                        word
                                                            .reading
                                                            .furigana
                                                    }
                                                />
                                            )}
                                        {!word.reading
                                            .furigana && (
                                            <span>
                                                {
                                                    word
                                                        .reading
                                                        .kana
                                                }
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className={`grid grid-cols-12 gap-2`}
                                    >
                                        <Pronunciation
                                            pitch={
                                                word.pitch
                                            }
                                            audio={
                                                word.audio
                                            }
                                        />
                                        <div
                                            className={`flex flex-col col-span-9`}
                                        >
                                            {word.senses.map(
                                                (
                                                    sense,
                                                    index
                                                ) => (
                                                    <SenseBlock
                                                        key={
                                                            index
                                                        }
                                                        sense={
                                                            sense
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {sentencesResult &&
                            !jotobaSentencesIsLoading &&
                            !jotobaSentencesHasError && (
                                <SentencesCard
                                    sentences={
                                        sentencesResult
                                    }
                                />
                            )}
                    </div>
                </div>
                {relatedKanji &&
                    relatedKanji.length > 0 && (
                        <KanjiList
                            className={`grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 h-fit`}
                            kanji={relatedKanji}
                        />
                    )}
            </div>
        </div>
    );
};

export default WordDetails;