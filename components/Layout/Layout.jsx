import React from "react";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";

const Layout = props => {
    return (
        <div
            className={`flex flex-col justify-between w-full h-screen items-center bg-gray-100 dark:bg-gray-700 dark:text-white overflow-hidden`}
        >
            <Nav />
            <div className={`w-full h-full overflow-y-scroll`}>{props.children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
