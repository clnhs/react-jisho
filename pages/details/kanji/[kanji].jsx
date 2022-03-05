import React, { useEffect, useState } from "react";
import useEventListener from "../../../hooks/useEventListener";
import useMatchMedia from "../../../hooks/useMatchMedia";
import { useRouter } from "next/router";
import useJotoba from "../../../hooks/useJotoba";
import Head from "next/head";
import KanjiDetails from "../../../components/Details/KanjiDetails/KanjiDetails";
import ExternalLookupCard from "../../../components/Details/ExternalLookupCard";

/**
 * The KanjiDetailsPage page component displays details on a specific kanji.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const KanjiDetailsPage = () => {
    const [isExternalLookupOpen, setIsExternalLookupOpen] =
        useState(true);

    useEventListener("scroll", () =>
        setIsExternalLookupOpen(false)
    );

    const isMobile = useMatchMedia(["max-width: 480px"]);
    const router = useRouter();
    const { kanji } = router.query || undefined;

    const {
        jotobaIsLoading,
        jotobaHasError,
        getJotobaResults,
    } = useJotoba("kanji");

    const [kanjiResult, setKanjiResult] = useState();

    useEffect(() => {
        kanji &&
            getJotobaResults(
                kanji,
                setKanjiResult
            );
    }, [kanji, setKanjiResult]);

    return (
        <>
            <Head>React辞書・{kanji}</Head>
            {kanjiResult &&
                !jotobaIsLoading &&
                !jotobaHasError && (
                    <>
                        <KanjiDetails kanji={kanjiResult} />
                        <ExternalLookupCard
                            isMobile={isMobile}
                            isOpen={isExternalLookupOpen}
                            openHandler={
                                setIsExternalLookupOpen
                            }
                            searchTerm={kanjiResult[0].literal}
                        />
                    </>
                )}
        </>
    );
};

export default KanjiDetailsPage;
