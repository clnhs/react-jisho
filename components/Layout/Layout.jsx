import React from "react";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";

const Layout = props => {
    return (
        <div
            id={"layout-container"}
            className={`flex flex-col justify-between items-center bg-gray-100 dark:bg-gray-700 dark:text-white overflow-y-scroll`}
        >
            <Nav />
            <div
                className={`w-full pt-16`}
            >
                {props.children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
