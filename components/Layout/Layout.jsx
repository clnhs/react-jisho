import React from "react";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";

/**
 * Our main layout sandwiching our content between our
 *  Nav and Footer components.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = props => {
    return (
        <>
            <Nav />
            <div
                id={"contents"}
            >
                {props.children}
            </div>
            <Footer />
        </>
    );
};

export default Layout;
