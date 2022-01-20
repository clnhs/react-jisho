import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdHelpOutline } from "react-icons/md";
import SearchBar from "../../SearchBar/SearchBar";
import { useRouter } from "next/router";

const Nav = props => {
    const router = useRouter();
    const isOnHome = router.pathname === "/";

    return (
        <nav
            className={`grid grid-cols-4 md:grid-cols-12 sticky top-0 z-10 justify-between w-full h-16 box-content ${
                !isOnHome
                    ? "bg-gray-100 dark:bg-gray-700 dark:backdrop-blur-2xl dark:bg-opacity-70 border-b border-black/10 dark:border-gray-800 dark:drop-shadow-lg"
                    : ""
            }`}
        >
            {!isOnHome && (
                <>
                    <div
                        id={"nav-group-left"}
                        className={`col-span-1 md:col-span-2 hidden sm:flex flex-row flex-nowrap justify-start items-center pl-2 text-2xl`}
                    >
                        <Link href={"/"}>
                            <a className={`inline-flex`}>
                                <Image
                                    src="/logo.svg"
                                    width={502 / 3}
                                    height={152 / 3}
                                    className={`dark:invert`}
                                />
                            </a>
                        </Link>
                    </div>
                    <div
                        id={"nav-group-center"}
                        className={`col-span-3 sm:col-span-2 md:col-span-8 md:col-start-3 flex flex-row flex-nowrap justify-center items-center px-2`}
                    >
                        <SearchBar navbarEmbed />
                    </div>
                </>
            )}
            <div
                id={"nav-group-right"}
                className={`flex flex-row flex-nowrap col-span-1 ${
                    isOnHome
                        ? "col-start-4"
                        : "col-start-auto"
                } md:col-span-2 md:col-start-11 justify-end items-center text-2xl`}
            >
                {/*<Link href="#">*/}
                {/*    <a className={`py-2 px-2 md:px-4`}>*/}
                {/*        <MdSettings />*/}
                {/*    </a>*/}
                {/*</Link>*/}
                <Link href="#">
                    <a className={`py-2 px-2 md:px-4`}>
                        <MdHelpOutline />
                    </a>
                </Link>
            </div>
        </nav>
    );
};

export default Nav;