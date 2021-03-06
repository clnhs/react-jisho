import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { isAppleDevice } from "../../utils/AppleDeviceDetector";
import ExternalLookupButton from "./ExternalLookupButton";

/**
 * Displays an external lookup dialog/modal to our user allowing them
 *  to quickly jump to an external resource for more information
 *  about the word or kanji they're looking at.
 *
 *  Used on the WordDetails ([word]) and  KanjiDetails ([kanji]) page components.
 * @param props {{data:{reading?:string,literal?:string}}}
 * @returns {JSX.Element}
 * @constructor
 */
const ExternalLookupDialog = props => {
    const { reading, literal } = props.data || undefined;
    const term = reading
        ? reading.kanji || reading.kana
        : literal;
    const open = props.open || false;

    return (
        <Dialog.Root
            open={open}
            className={`fixed top-0 left-0`}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    className={`flex flex-row items-center justify-center fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-md z-20`}
                >
                    <Dialog.Content
                        className={`bg-white dark:bg-gray-700 dark:text-white w-full sm:w-1/2 p-4 rounded-lg shadow-xl shadow-black/50`}
                    >
                        <div>
                            <header className={`mb-4`}>
                                <Dialog.Title
                                    className={`font-bold text-xl sm:text-3xl text-center`}
                                >
                                    Lookup&nbsp;
                                    <span
                                        className={`font-normal underline underline-offset-4`}
                                        style={{
                                            wordBreak:
                                                "keep-all",
                                        }}
                                    >
                                        {term}
                                    </span>
                                    &nbsp;in&nbsp;...
                                </Dialog.Title>
                            </header>
                            <section
                                className={`flex flex-col items-center justify-center gap-2`}
                            >
                                <ExternalLookupButton
                                    iconPath={
                                        "/jotoba_de.png"
                                    }
                                    text={"Jotoba.de"}
                                    target={`https://jotoba.de/search/${term}`}
                                />
                                <ExternalLookupButton
                                    iconPath={
                                        "/jisho_org.png"
                                    }
                                    text={"Jisho.org"}
                                    target={`https://jisho.org/search/${term}`}
                                />
                                <ExternalLookupButton
                                    iconPath={
                                        "/jpdb_io.png"
                                    }
                                    text={"jpdb.io"}
                                    target={`https://jpdb.io/search?q=${term}`}
                                />
                                <ExternalLookupButton
                                    iconPath={
                                        "/kotobank.png"
                                    }
                                    text={"Kotobank"}
                                    target={`https://kotobank.jp/word/${term}`}
                                />
                                <ExternalLookupButton
                                    iconPath={
                                        "/weblio-ejje.png"
                                    }
                                    text={"Weblio EJJE"}
                                    target={`https://ejje.weblio.jp/content/${term}`}
                                />
                                <ExternalLookupButton
                                    iconPath={
                                        "/alc.png"
                                    }
                                    text={"ALC"}
                                    target={`https://eow.alc.co.jp/search?q=${term}`}
                                />
                                {typeof window !==
                                    "undefined" &&
                                    isAppleDevice && (
                                        <ExternalLookupButton
                                            iconPath={
                                                "/monokakido_dictionaries.jpeg"
                                            }
                                            target={`mkdictionaries:///?text=${term}`}
                                            text={
                                                "Dictionaries by ?????????"
                                            }
                                            newTab={false}
                                        />
                                    )}
                                <Dialog.Close
                                    className={`flex flex-row items-center gap-1.5 px-4 py-2 rounded-md box-content text-red-500 bg-white dark:bg-gray-700 hover:bg-gray-300 border border-transparent hover:border-gray-300 dark:hover:border-gray-800 dark:hover:text-black transition-all`}
                                >
                                    Dismiss
                                </Dialog.Close>
                            </section>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ExternalLookupDialog;
