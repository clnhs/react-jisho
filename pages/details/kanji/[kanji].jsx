import React, { useEffect, useState } from "react";
import useEventListener from "../../../hooks/useEventListener";
import useMatchMedia from "../../../hooks/useMatchMedia";
import Head from "next/head";
import KanjiDetails from "../../../components/Details/KanjiDetails/KanjiDetails";
import ExternalLookupCard from "../../../components/Details/ExternalLookupCard";
import { doFetch } from "../../../utils/fetch";
import { MdHelpOutline } from "react-icons/md";

/**
 * The KanjiDetailsPage page component displays details on a specific kanji.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const KanjiDetailsPage = ({
    staticKanji,
    staticKanjiData,
}) => {
    const [isExternalLookupOpen, setIsExternalLookupOpen] =
        useState(true);

    useEventListener("scroll", () =>
        setIsExternalLookupOpen(false)
    );

    const isMobile = useMatchMedia(["max-width: 480px"]);

    useEffect(() => {}, [staticKanjiData]);

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
                                "{staticKanji}"
                            </span>
                            .
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
};

export default KanjiDetailsPage;
