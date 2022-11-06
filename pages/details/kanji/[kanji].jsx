import React, { useState } from "react";
import useEventListener from "../../../hooks/useEventListener";
import useMatchMedia from "../../../hooks/useMatchMedia";
import Head from "next/head";
import KanjiDetails from "../../../components/Details/KanjiDetails/KanjiDetails";
import ExternalLookupCard from "../../../components/Details/ExternalLookupCard";
import { doFetch } from "../../../utils/fetch";
import {
    MdErrorOutline,
    MdHelpOutline,
} from "react-icons/md";

/**
 * The KanjiDetailsPage page component displays details on a specific kanji.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const KanjiDetailsPage = ({
    staticKanji,
    staticKanjiData,
    error,
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
                <title>React辞書・{staticKanji}</title>
            </Head>
            {staticKanjiData.length > 0 && (
                <>
                    <KanjiDetails kanji={staticKanjiData} />
                    <ExternalLookupCard
                        isMobile={isMobile}
                        isOpen={isExternalLookupOpen}
                        openHandler={
                            setIsExternalLookupOpen
                        }
                        searchTerm={
                            staticKanjiData[0].literal
                        }
                    />
                </>
            )}
            {staticKanjiData.length === 0 && (
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
                            No kanji matching{" "}
                            <span
                                className={`underline underline-offset-4`}
                            >
                                &quot;{staticKanji}&quot;
                            </span>
                            .
                        </p>
                    </div>
                </div>
            )}
            {error && (
                <div
                    id={`loader-container`}
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
        query: { kanji },
    } = context;

    try {
        const jotobaResponse = await doFetch(
            `https://jotoba.de/api/search/kanji`,
            {
                method: "POST",
                body: JSON.stringify({
                    query: kanji,
                    language: "English",
                    no_english: false,
                }),
            }
        );
        const { kanji: jotobaKanjiData } =
            (await jotobaResponse.json()) || null;

        return {
            props: {
                staticKanji: kanji,
                staticKanjiData: jotobaKanjiData,
            },
        };
    } catch (error) {
        return {
            props: {
                error,
            },
        };
    }
};

export default KanjiDetailsPage;
