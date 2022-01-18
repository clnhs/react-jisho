import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
    MdHelpOutline,
    MdImageSearch,
    MdKeyboardVoice,
    MdNotifications,
    MdSettings,
} from "react-icons/md";
import Hero from "../components/Hero/Hero";

const IndexPage = () => {
    return (
        <div
            className={`flex flex-col w-full h-full flex-grow items-center`}
        >
            <Hero/>
        </div>
    );
};

export default IndexPage;
