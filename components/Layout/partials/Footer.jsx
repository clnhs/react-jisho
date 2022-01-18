import React from 'react';

const Footer = () => {
    return (
        <footer
            className={`z-10 flex flex-col flex-nowrap shrink-0 w-full p-4 sm:p-1 justify-center items-center text-white bg-black dark:bg-gray-800`}
        >
            <p>Built by @clnhs. Based on API from <a className={`font-bold underline`} href="https://jotoba.de">Jotoba.de</a>.</p>
        </footer>
    );
};

export default Footer;
