import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useRouter } from "next/router";
import Image from "next/image";

const Hero = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const submitHandler = () => {
        if (searchTerm)
            router.push(`/search/${searchTerm}`);
    };

    return (
        <section
            id={"hero"}
            className={`flex flex-col gap-12 flex-nowrap w-full h-full justify-center items-center`}
        >
            <Image
                src="/logo.svg"
                width={502 / 1.2}
                height={152 / 1.2}
                className={`dark:invert z-10`}
            />
            <div className={`w-11/12 sm:w-9/12 z-10`}>
                <SearchBar
                    setExternalSearchTerm={setSearchTerm}
                />
            </div>
            <div className={`flex gap-6 px-3 z-10`}>
                <button
                    className={`px-8 py-4 bg-black hover:bg-gray-300 dark:hover:bg-white border-2 border-opacity-0 hover:border-black text-white hover:text-black rounded-lg border-gray-300 dark:border-gray-800 transition-all`}
                    onClick={submitHandler}
                >
                    Search
                </button>
                <button
                    className={`px-8 py-4 bg-black hover:bg-gray-300 dark:hover:bg-white border-2 border-opacity-0 hover:border-black text-white hover:text-black rounded-lg border-gray-300 dark:border-gray-800 transition-all`}
                    style={{ wordBreak: "keep-all" }}
                >
                    I&lsquo;m feeling ラッキー
                </button>
            </div>
        </section>
    );
};

export default Hero;
