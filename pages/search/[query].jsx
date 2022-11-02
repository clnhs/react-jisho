import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useJotoba from "../../hooks/useJotoba";
import KanjiList from "../../components/SearchResults/KanjiList";
import WordList from "../../components/SearchResults/WordList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    MdErrorOutline,
    MdHelpOutline,
} from "react-icons/md";
import Head from "next/head";
import { doFetch } from "../../utils/fetch";

/**
 * The SearchResultsPage page component displays a search results page.
 * @returns {JSX.Element}
 * @constructor
 */
const SearchResultsPage = ({
    staticQuery,
    staticResults,
}) => {
    return (
        <>
            <Head>
                <title>React辞書・{staticQuery}</title>
            </Head>
            {staticResults && (
                <div
                    className={`flex flex-col items-center justify-center w-full h-auto p-4`}
                >
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4 w-full justify-center`}
                    >
                        <WordList
                            words={staticResults.words}
                            className={`flex flex-col col-span-1 gap-4 sm:col-span-2 lg:col-span-7 xl:col-span-6`}
                        />
                        <KanjiList
                            kanji={staticResults.kanji}
                            className={`col-span-1 md:col-span-2 lg:col-span-5 xl:col-span-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 auto-rows-min sm:justify-items-center`}
                        />
                    </div>
                </div>
            )}
            {/*{jotobaIsLoading && (<div*/}
            {/*    id={"loader-container"}*/}
            {/*    className={`flex flex-col items-center justify-center`}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className={`flex flex-col items-center`}*/}
            {/*    >*/}
            {/*        <AiOutlineLoading3Quarters*/}
            {/*            className={`mb-4 text-5xl animate-spin`}*/}
            {/*        />*/}
            {/*        <span*/}
            {/*            className={`text-3xl text-center`}*/}
            {/*        >*/}
            {/*                    Searching...*/}
            {/*                </span>*/}
            {/*    </div>*/}
            {/*</div>)}*/}
            {!staticResults && (
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
                                {staticQuery}
                            </span>
                            .
                        </p>
                    </div>
                </div>
            )}
            {/*{!jotobaIsLoading && jotobaHasError && (<div*/}
            {/*    id={"loader-container"}*/}
            {/*    className={`flex flex-col items-center justify-center w-full h-full`}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className={`flex flex-col items-center`}*/}
            {/*    >*/}
            {/*        <MdErrorOutline*/}
            {/*            className={`mb-4 text-7xl`}*/}
            {/*        />*/}
            {/*        <p*/}
            {/*            className={`text-3xl text-center`}*/}
            {/*        >*/}
            {/*            Could not reach API server.*/}
            {/*        </p>*/}
            {/*        <p className={`mt-2 text-center`}>*/}
            {/*            Please check your internet*/}
            {/*            connection and refresh the page.*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>)}*/}
        </>
    );
};

export const getServerSideProps = async context => {
    const {
        query: { query },
    } = context;

    const response = await doFetch(
        `https://jotoba.de/api/search/words`,
        {
            method: "POST",
            body: JSON.stringify({
                query,
                no_english: false,
                language: "English",
            }),
        }
    );

    const results = await response.json();

    return {
        props: {
            staticQuery: query,
            staticResults: (() => {
                if (
                    results?.kanji?.length +
                        results?.words?.length >
                    0
                )
                    return results;
                return null;
            })(),
        },
    };
};

export default SearchResultsPage;
