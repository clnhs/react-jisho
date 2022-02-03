import React from "react";
import Nav from "./partials/Nav";
import Footer from "./partials/Footer";

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
