import React from "react";
import ExternalLookupButton from "../ExternalLookupDialog/ExternalLookupButton";
import { isAppleDevice } from "../../utils/AppleDeviceDetector";
import Card from "../UI/Card";
import { MdOpenInNew } from "react-icons/md";

/**
 * Displays an external lookup card to our user allowing them
 *  to quickly jump to an external resource for more information
 *  about the word or kanji they're looking at.
 *
 *  Used on the WordDetails ([word]) and  KanjiDetails ([kanji]) page components.
 * @param props {{searchTerm:string,isOpen:boolean,openHandler:function,isMobile:boolean}}
 * @returns {JSX.Element}
 * @constructor
 */
const ExternalLookupCard = props => {
    const { searchTerm, isOpen, openHandler, isMobile } =
        props || undefined;

    const toggleIsOpen = () =>
        openHandler(prevState => !prevState);
    if (typeof window !== "undefined")
        return (
            <Card
                className={`w-fit h-fit flex flex-col items-center top-20 ${
                    (isMobile &&
                        `fixed right-0 border-r-0 rounded-r-none top-28`) ||
                    `fixed left-0 border-l-0 rounded-l-none`
                } shadow-lg`}
            >
                {((isMobile && isOpen) || !isMobile) && (
                    <>
                        <ExternalLookupButton
                            iconPath={"/jotoba_de.png"}
                            tooltip={"Jotoba.de"}
                            tooltipSide={"left"}
                            target={`https://jotoba.de/search/${searchTerm}`}
                        />
                        <ExternalLookupButton
                            iconPath={"/jisho_org.png"}
                            tooltip={"Jisho.org"}
                            tooltipSide={"left"}
                            target={`https://jisho.org/search/${searchTerm}`}
                        />
                        <ExternalLookupButton
                            iconPath={"/jpdb_io.png"}
                            tooltip={"jpdb.io"}
                            tooltipSide={"left"}
                            target={`https://jpdb.io/search?q=${searchTerm}`}
                        />
                        <ExternalLookupButton
                            iconPath={"/kotobank.png"}
                            tooltip={"Kotobank"}
                            tooltipSide={"left"}
                            target={`https://kotobank.jp/word/${searchTerm}`}
                        />
                        <ExternalLookupButton
                            iconPath={"/weblio-ejje.png"}
                            tooltip={"Weblio EJJE"}
                            tooltipSide={"left"}
                            target={`https://ejje.weblio.jp/content/${searchTerm}`}
                        />
                        <ExternalLookupButton
                            iconPath={"/alc.png"}
                            tooltip={"ALC"}
                            tooltipSide={"left"}
                            target={`https://eow.alc.co.jp/search?q=${searchTerm}`}
                        />
                        {isAppleDevice() && (
                            <ExternalLookupButton
                                iconPath={
                                    "/monokakido_dictionaries.jpeg"
                                }
                                target={`mkdictionaries:///?text=${searchTerm}`}
                                tooltip={
                                    <span>
                                        Dictionaries by{" "}
                                        <span
                                            className={`no-word-break`}
                                        >
                                            物書堂
                                        </span>
                                    </span>
                                }
                                tooltipSide={"left"}
                                newTab={false}
                            />
                        )}
                    </>
                )}
                {isMobile && !isOpen && (
                    <ExternalLookupButton
                        icon={
                            <MdOpenInNew size={"1.4rem"} />
                        }
                        onClick={toggleIsOpen}
                    />
                )}
            </Card>
        );

    return null;
};

export default ExternalLookupCard;
