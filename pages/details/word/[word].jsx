import React, { useEffect, useState } from "react";
import Head from "next/head";
import useMatchMedia from "../../../hooks/useMatchMedia";
import ExternalLookupCard from "../../../components/Details/ExternalLookupCard";
import useEventListener from "../../../hooks/useEventListener";

import { MdHelpOutline } from "react-icons/md";
import WordDetails from "../../../components/Details/WordDetails/WordDetails";
import { doFetch } from "../../../utils/fetch";

/**
 * The WordDetailsPage page component displays details on a word.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const WordDetailsPage = ({
    staticWord,
    staticWordData,
    staticKanjiData,
}) => {
    const [isExternalLookupOpen, setIsExternalLookupOpen] =
        useState(true);

    useEventListener("scroll", () =>
        setIsExternalLookupOpen(false)
    );

    const isMobile = useMatchMedia(["max-width: 480px"]);

    return (
        <>
            <Head>
                <title>React辞書・{staticWord}</title>
            </Head>
            {staticWordData.length !== 0 && (
                <>
                    <WordDetails
                        word={staticWordData}
                        relatedKanji={staticKanjiData}
                    />
                    <ExternalLookupCard
                        isMobile={isMobile}
                        isOpen={isExternalLookupOpen}
                        openHandler={
                            setIsExternalLookupOpen
                        }
                        searchTerm={
                            staticWordData.reading.kanji ||
                            staticWordData.reading.kana
                        }
                    />
                </>
            )}
            {/*{jotobaIsLoading && (*/}
            {/*    <div*/}
            {/*        id={"loader-container"}*/}
            {/*        className={`flex flex-col items-center justify-center`}*/}
            {/*    >*/}
            {/*        <div*/}
            {/*            className={`flex flex-col items-center`}*/}
            {/*        >*/}
            {/*            <AiOutlineLoading3Quarters*/}
            {/*                className={`mb-4 text-5xl animate-spin`}*/}
            {/*            />*/}
            {/*            <span*/}
            {/*                className={`text-3xl text-center`}*/}
            {/*            >*/}
            {/*                Searching...*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            {!staticWordData && (
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
                            No word matching{" "}
                            <span
                                className={`underline underline-offset-4`}
                            >
                                {staticWord}
                            </span>
                            .
                        </p>
                    </div>
                </div>
            )}
            {/*{!jotobaIsLoading && jotobaHasError && (*/}
            {/*    <div*/}
            {/*        id={"loader-container"}*/}
            {/*        className={`flex flex-col items-center justify-center w-full h-full`}*/}
            {/*    >*/}
            {/*        <div*/}
            {/*            className={`flex flex-col items-center`}*/}
            {/*        >*/}
            {/*            <MdErrorOutline*/}
            {/*                className={`mb-4 text-7xl`}*/}
            {/*            />*/}
            {/*            <p*/}
            {/*                className={`text-3xl text-center`}*/}
            {/*            >*/}
            {/*                Could not reach API server.*/}
            {/*            </p>*/}
            {/*            <p className={`mt-2 text-center`}>*/}
            {/*                Please check your internet*/}
            {/*                connection and refresh the page.*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </>
    );
};

export const getServerSideProps = async context => {
    const {
        query: { word },
    } = context;

    const jotobaResposne = await doFetch(
        `https://jotoba.de/api/search/words`,
        {
            method: "POST",
            body: JSON.stringify({
                query: word,
                no_english: false,
                language: "English",
            }),
        }
    );

    const {
        words: jotobaWordsData,
        kanji: jotobaKanjiData,
    } = (await jotobaResposne.json()) || null;

    return {
        props: {
            staticWord: word,
            staticWordData: jotobaWordsData.find(
                wordMatch =>
                    wordMatch.reading.kanji === word ||
                    wordMatch.reading.kana === word
            ),
            staticKanjiData: jotobaKanjiData.filter(
                kanjiMatch =>
                    word.includes(kanjiMatch.literal)
            ),
        },
    };
};
export default WordDetailsPage;
