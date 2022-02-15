import React, { useEffect } from "react";
import InfoHeader from "./InfoHeader";
import useMatchMedia from "../../../hooks/useMatchMedia";
import Card from "../../UI/Card";
import { MdHelpOutline } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

/**
 * KanjiDetails receives all properties of a given kanji,
 *  displaying them to the user. The main component of the
 *  KanjiDetailsPage ([kanji]) page component.
 *
 * @param props {{kanji:{literal:string,meanings:Array<string>||string,grade:int,stroke_count:int,frequency:int,jlpt:int,onyomi:Array<string>,kunyomi:Array<string>,parts:Array<string>,radical:string,stroke_frames:string}}}
 * @returns {JSX.Element}
 * @constructor
 */
const KanjiDetails = props => {
    const { kanji } = props || undefined;
    const {
        literal,
        meanings,
        grade,
        stroke_count,
        frequency,
        jlpt,
        onyomi,
        kunyomi,
        parts,
        radical,
        stroke_frames,
    } = kanji[0] || undefined;

    const isMobile = useMatchMedia(["max-width: 480px"]);

    useEffect(() => {
        console.log(stroke_frames);
    }, []);

    return (
        <div
            className={`${
                !isMobile && `pl-20`
            } p-4 flex flex-col gap-4`}
        >
            <div
                className={`flex flex-col w-full sm:w-8/12 md:w-5/12 lg:w-3/12 gap-4`}
            >
                <Card>
                    <InfoHeader
                        data={{ grade, jlpt, stroke_count }}
                    />
                    <section
                        className={`flex flex-col items-center justify-center w-full h-24 mb-2 text-center text-7xl overflow-hidden`}
                    >
                        <span
                            className={`jp kyoka-on-hover`}
                        >
                            {literal}
                        </span>
                    </section>
                    <section
                        className={`grid grid-cols-1 md:grid-cols-3 p-4`}
                    >
                        {radical && (
                            <p>
                                <span
                                    className={`font-bold inline-block md:block`}
                                >
                                    Radical&nbsp;
                                </span>

                                <a
                                    href={`/details/kanji/${radical}`}
                                >
                                    {radical}
                                </a>
                            </p>
                        )}
                        {parts && (
                            <p>
                                <span
                                    className={`font-bold inline-block md:block`}
                                >
                                    Parts&nbsp;
                                </span>

                                {parts.join(" ")}
                            </p>
                        )}
                        {frequency && (
                            <p>
                                <span
                                    className={`font-bold inline-block sm:block`}
                                >
                                    Frequency&nbsp;
                                </span>
                                {frequency}/2500
                            </p>
                        )}
                    </section>
                </Card>
                <Card>
                    <div
                        className={`flex flex-row text-sm border-b border-gray-200 dark:border-gray-800 p-0.5`}
                    >
                        <span
                            className={`flex items-center px-1`}
                        >
                            <MdHelpOutline />
                        </span>
                        <p
                            className={`border-l border-gray-200 dark:border-gray-800 font-bold px-1`}
                        >
                            Meanings
                        </p>
                    </div>
                    <section className={`p-4`}>
                        {meanings.join(", ")}
                    </section>
                </Card>
                <Card>
                    <div
                        className={`flex flex-row text-sm border-b border-gray-200 dark:border-gray-800 p-0.5`}
                    >
                        <span
                            className={`flex items-center px-1`}
                        >
                            <IoChatbubbleEllipsesOutline />
                        </span>
                        <p
                            className={`border-l border-gray-200 dark:border-gray-800 font-bold px-1`}
                        >
                            Readings
                        </p>
                    </div>
                    <section className={`p-4`}>
                        {kunyomi && (
                            <>
                                <p className={`font-bold`}>
                                    KUN
                                </p>
                                <p
                                    className={`no-word-break`}
                                >
                                    {kunyomi
                                        .map(reading =>
                                            reading
                                                .replace(
                                                    ".",
                                                    "・"
                                                )
                                                .replace(
                                                    "-",
                                                    "ー"
                                                )
                                        )
                                        .join(", ")}
                                </p>
                            </>
                        )}
                        <p className={`font-bold`}>ON</p>
                        {onyomi && (
                            <>
                                <p
                                    className={`no-word-break`}
                                >
                                    {onyomi
                                        .map(reading =>
                                            reading
                                                .replace(
                                                    ".",
                                                    "・"
                                                )
                                                .replace(
                                                    "-",
                                                    "ー"
                                                )
                                        )
                                        .join(", ")}
                                </p>
                            </>
                        )}
                    </section>
                </Card>
            </div>
        </div>
    );
};

export default KanjiDetails;
