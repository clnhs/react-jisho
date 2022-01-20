import React from "react";
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
