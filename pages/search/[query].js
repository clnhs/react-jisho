import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import KanjiEntry from "../../components/SearchResults/entries/KanjiEntry";
import WordEntry from "../../components/SearchResults/entries/WordEntry";
import useJotoba from "../../hooks/useJotoba";
import KanjiList from "../../components/SearchResults/KanjiList";
import WordList from "../../components/SearchResults/WordList";

const SearchResultsPage = () => {
    const router = useRouter();
    const { query } = router.query;
    const {
        jotobaIsLoading,
        jotobaHasError,
        getJotobaResults,
    } = useJotoba();
    const [results, setResults] = useState(null);

    useEffect(() => {
        query && getJotobaResults(query, setResults);
    }, [query]);

    useEffect(() => {
        console.log(results);
    }, [results]);

    return (
        <>
            {results &&
                !jotobaIsLoading &&
                !jotobaHasError && (
                    <div
                        className={`flex flex-col items-center justify-center w-screen 2xl:px-40 p-4`}
                    >
                        <div
                            className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4 w-full justify-center`}
                        >
                            <WordList words={results.words}
                                className={`flex flex-col col-span-1 gap-4 sm:col-span-2 lg:col-span-7 xl:col-span-6`}
                            >

                            </WordList>
                            <KanjiList
                                kanji={results.kanji}
                                className={`col-span-1 md:col-span-2 lg:col-span-5 xl:col-span-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 auto-rows-min sm:justify-items-center`}
                            />
                        </div>
                    </div>
                )}
            {!jotobaIsLoading &&
                !!!jotobaHasError &&
                results === null && (
                    <div
                        className={`flex flex-col items-center justify-center w-full h-full`}
                    >
                        <h1
                            className={`text-3xl text-red-500`}
                        >
                            {<>No result for {query}.</>}
                        </h1>
                    </div>
                )}
            {!jotobaIsLoading && jotobaHasError && (
                <div
                    className={`flex flex-col items-center justify-center w-full h-full`}
                >
                    <h1 className={`text-3xl text-red-500`}>
                        <>Error searching for {query}.</>
                    </h1>
                </div>
            )}
        </>
    );
};

export default SearchResultsPage;
