import React from "react";
import KanjiList from "../../components/SearchResults/KanjiList";
import WordList from "../../components/SearchResults/WordList";
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
    error,
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
                        />
                        <KanjiList
                            kanji={staticResults.kanji}
                        />
                    </div>
                </div>
            )}
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
                                &quot;{staticQuery}&quot;
                            </span>
                            .
                        </p>
                    </div>
                </div>
            )}
            {error && (
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
                            Something might&apos;ve happened
                            with the Jotoba.de API.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export const getServerSideProps = async context => {
    const {
        query: { query },
    } = context;

    try {
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
    } catch (err) {
        return {
            props: {
                error: err,
            },
        };
    }
};

export default SearchResultsPage;
