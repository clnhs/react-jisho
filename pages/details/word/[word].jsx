import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useJotoba from "../../../hooks/useJotoba";
import useMatchMedia from "../../../hooks/useMatchMedia";
import ExternalLookupCard from "../../../components/Details/ExternalLookupCard";
import useEventListener from "../../../hooks/useEventListener";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    MdErrorOutline,
    MdHelpOutline,
} from "react-icons/md";
import WordDetails from "../../../components/Details/WordDetails/WordDetails";

const WordDetailsPage = () => {
    const [isExternalLookupOpen, setIsExternalLookupOpen] =
        useState(true);

    useEventListener("scroll", () =>
        setIsExternalLookupOpen(false)
    );

    const isMobile = useMatchMedia(["max-width: 480px"]);

    const router = useRouter();
    const { word } = router.query || undefined;
    const {
        jotobaIsLoading,
        jotobaHasError,
        getJotobaResults,
    } = useJotoba();

    const [wordResult, setWordResult] = useState();
    const [relatedKanji, setRelatedKanji] = useState();

    useEffect(() => {
        word &&
            getJotobaResults(word, results => {
                setWordResult(
                    results.words.find(
                        potentialWordMatch =>
                            potentialWordMatch.reading
                                .kanji === word ||
                            potentialWordMatch.reading
                                .kana === word
                    )
                );

                setRelatedKanji(
                    results.kanji.filter(kanji =>
                        word.includes(kanji.literal)
                    )
                );
            });
    }, [word, setWordResult]);

    return (
        <>
            <Head>
                <title>React辞書・{word}</title>
            </Head>
            {wordResult &&
                !jotobaIsLoading &&
                !jotobaHasError && (
                    <>
                        <WordDetails
                            word={wordResult}
                            relatedKanji={relatedKanji}
                        />
                        <ExternalLookupCard
                            isMobile={isMobile}
                            isOpen={isExternalLookupOpen}
                            openHandler={
                                setIsExternalLookupOpen
                            }
                            searchTerm={
                                wordResult.reading.kanji ||
                                wordResult.reading.kana
                            }
                        />
                    </>
                )}
            {jotobaIsLoading && (
                <div
                    id={"loader-container"}
                    className={`flex flex-col items-center justify-center`}
                >
                    <div
                        className={`flex flex-col items-center`}
                    >
                        <AiOutlineLoading3Quarters
                            className={`mb-4 text-5xl animate-spin`}
                        />
                        <span
                            className={`text-3xl text-center`}
                        >
                            Searching...
                        </span>
                    </div>
                </div>
            )}
            {!jotobaIsLoading &&
                !!!jotobaHasError &&
                wordResult === null && (
                    <div
                        id={"loader-container"}
                        className={`flex flex-col items-center justify-center w-full h-full`}
                    >
                        <div
                            className={`flex flex-col items-center`}
                        >
                            <MdHelpOutline
                                className={`mb-4 text-7xl text-black dark:text-white`}
                            />
                            <p
                                className={`text-3xl text-center`}
                            >
                                No result for{" "}
                                <span
                                    className={`underline underline-offset-4`}
                                >
                                    {query}
                                </span>
                                .
                            </p>
                        </div>
                    </div>
                )}
            {!jotobaIsLoading && jotobaHasError && (
                <div
                    id={"loader-container"}
                    className={`flex flex-col items-center justify-center w-full h-full`}
                >
                    <div
                        className={`flex flex-col items-center`}
                    >
                        <MdErrorOutline
                            className={`mb-4 text-7xl`}
                        />
                        <p
                            className={`text-3xl text-center`}
                        >
                            Could not reach API server.
                        </p>
                        <p className={`mt-2 text-center`}>
                            Please check your internet
                            connection and refresh the page.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default WordDetailsPage;
