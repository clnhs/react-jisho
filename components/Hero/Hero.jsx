import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useRouter } from "next/router";
import Image from "next/image";
import useMatchMedia from "../../hooks/useMatchMedia";

/**
 * Our Hero component containing used on our home/index route.
 *  Displays a big logo, search field and search button as a
 *  proper search engine does.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Hero = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const submitHandler = () => {
        if (searchTerm)
            router.push(`/search/${searchTerm}`);
    };

    const isMobileLandscape = useMatchMedia(["hover: none", "pointer: coarse", "orientation: landscape"], "all");

    return (
        <section
            id={"hero"}
            className={`flex flex-col flex-nowrap items-center justify-center ${isMobileLandscape ? "gap-0 -mt-16" : `gap-12`}`}
        >
            <div className={`scale-75 md:scale-100`}>
                <Image
                    src="/logo.svg"
                    width={502}
                    height={152}
                    className={`dark:invert`}
                />
            </div>
            <div className={`w-11/12 sm:w-9/12`}>
                <SearchBar
                    embedSearchButton={isMobileLandscape}
                    setExternalSearchTerm={setSearchTerm}
                />
            </div>
            {!isMobileLandscape && <div className={`flex gap-6 px-3`}>
                <button
                    className={`px-8 py-4 bg-black hover:bg-gray-300 dark:hover:bg-white border-2 border-opacity-0 hover:border-black text-white hover:text-black rounded-lg border-gray-300 dark:border-gray-800 transition-all`}
                    onClick={submitHandler}
                >
                    Search
                </button>
                {/*<button*/}
                {/*    className={`px-8 py-4 bg-black hover:bg-gray-300 dark:hover:bg-white border-2 border-opacity-0 hover:border-black text-white hover:text-black rounded-lg border-gray-300 dark:border-gray-800 transition-all`}*/}
                {/*    style={{ wordBreak: "keep-all" }}*/}
                {/*>*/}
                {/*    I&lsquo;m feeling ラッキー*/}
                {/*</button>*/}
            </div>}
        </section>
    );
};

export default Hero;
