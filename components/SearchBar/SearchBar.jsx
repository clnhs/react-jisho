import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { MdSearch } from "react-icons/md";
import useEventListener from "../../hooks/useEventListener";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";

/**
 * Search bar allowing our user to search for contents. Used
 *  in the Hero and Nav components.
 *
 * @param props {{embedSearchButton:boolean,navbarEmbed:boolean,placeholder:string}}
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBar = props => {
    const inputRef = useRef();
    const router = useRouter();
    const { embedSearchButton, navbarEmbed, placeholder } =
        props || undefined;
    const [searchTerm, setSearchTerm] = useState("");

    const inputChangeHandler = e => {
        if (!e.isComposing) {
            setSearchTerm(inputRef.current.value);
            if (props.setExternalSearchTerm)
                props.setExternalSearchTerm(
                    inputRef.current.value
                );
        }
    };

    const searchTermDeletionHandler = e => {
        setSearchTerm("");
    };

    const submitHandler = () => {
        if (searchTerm)
            router.push(`/search/${searchTerm}`);
    };

    useEffect(() => {
        if (router.query.hasOwnProperty("query"))
            setSearchTerm(router.query.query);
        else if (router.query.hasOwnProperty("kanji"))
            setSearchTerm(router.query.kanji);
        else if (router.query.hasOwnProperty("word"))
            setSearchTerm(router.query.word);
    }, [router.query]);

    useEventListener(
        "keydown",
        useCallback(
            e => {
                if (!e.isComposing)
                    e.code === "Enter" && submitHandler();
            },
            [submitHandler]
        ),
        inputRef.current
    );

    return (
        <div
            className={`flex flex-row w-full ${
                navbarEmbed
                    ? `h-3/4 border`
                    : "h-12 sm:h-16 border-2"
            } bg-gray-50 hover:bg-white dark:bg-gray-600 hover:dark:bg-gray-500 shadow-inner shadow-gray-100 dark:shadow-black/10 border-black dark:border-gray-800 rounded-lg overflow-hidden transition-all`}
        >
            <input
                type="text"
                placeholder={placeholder || `Search...`}
                className={`w-full px-4 py-2 text-md sm:text-xl bg-transparent`}
                value={searchTerm}
                ref={inputRef}
                onChange={inputChangeHandler}
            />
            <div className={`flex justify-center`}>
                {/*<button*/}
                {/*    className={`block px-4 py-2 ${*/}
                {/*        navbarEmbed*/}
                {/*            ? "text-2xl"*/}
                {/*            : "text-2xl sm:text-3xl"*/}
                {/*    } hover:bg-gray-300 dark:hover:bg-gray-800`}*/}
                {/*>*/}
                {/*    <MdKeyboardVoice />*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    className={`block px-4 py-2 ${*/}
                {/*        navbarEmbed*/}
                {/*            ? "text-2xl"*/}
                {/*            : "text-2xl sm:text-3xl"*/}
                {/*    } hover:bg-gray-300 dark:hover:bg-gray-800`}*/}
                {/*>*/}
                {/*    <MdImageSearch />*/}
                {/*</button>*/}
                {searchTerm.length > 0 && (
                    <button
                        className={`block px-4 py-2 ${
                            navbarEmbed
                                ? "text-2xl"
                                : "text-2xl sm:text-3xl"
                        } hover:bg-gray-300 dark:hover:bg-gray-800`}
                        onClick={searchTermDeletionHandler}
                    >
                        <IoMdClose />
                    </button>
                )}
                {navbarEmbed ||
                    (embedSearchButton && (
                        <button
                            className={`block px-4 py-2 ${
                                navbarEmbed
                                    ? "text-2xl"
                                    : "text-2xl sm:text-3xl"
                            } hover:bg-gray-300 dark:hover:bg-gray-800`}
                            onClick={submitHandler}
                        >
                            <MdSearch />
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default SearchBar;
