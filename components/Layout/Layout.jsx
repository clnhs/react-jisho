import React from "react";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";

const Layout = props => {
    return (
        <div
            id={"layout-container"}
            className={`flex flex-col justify-between items-center bg-gray-100 dark:bg-gray-700 dark:text-white`}
        >
            <Nav />
            <div
                id={"contents"}
            >
                {props.children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
