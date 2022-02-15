import React from "react";

/**
 * An about page. Much excite. Very about.
 * @returns {JSX.Element}
 * @constructor
 */
const AboutPage = () => {
    return (
        <div
            className={`flex w-full h-full flex-grow justify-center items-center p-8`}
        >
            <div
                className={`flex flex-col gap-6 w-full sm:w-96`}
            >
                <section className={`flex flex-col gap-2`}>
                    <h1 className={`text-4xl font-bold`}>
                        About this project
                    </h1>
                    <p>
                        The source code for this project is
                        available&nbsp;
                        <a
                            href="https://github.com/clnhs/react-jisho"
                            className={`font-bold underline hover:text-blue-700 dark:hover:text-blue-400`}
                        >
                            on GitHub
                        </a>
                        .
                    </p>
                    <p>
                        This project is a portfolio project
                        by Colin Hénault-Séguin. It
                        is built upon the&nbsp;
                        <a
                            href="https://jotoba.de"
                            className={`font-bold underline hover:text-blue-700 dark:hover:text-blue-400`}
                        >
                            Jotoba.de
                        </a>
                        &nbsp;API which immensely
                        facilitates implementing the common
                        data sources required for building a
                        Japanese dictionary.
                    </p>
                </section>
                <section className={`flex flex-col gap-2`}>
                    <h1 className={`text-4xl font-bold`}>
                        Licenses
                    </h1>
                    <ul className={`list-disc pl-4`}>
                        <li>
                            Book icon made available&nbsp;
                            <a
                                href="https://opensource.org/licenses/MIT"
                                className={`font-bold underline hover:text-blue-700 dark:hover:text-blue-400`}
                            >
                                under MIT license
                            </a>
                            &nbsp;from VMWare.
                        </li>
                        <li>
                            Other icons are part of the
                            Material Icons released by
                            Google under the{" "}
                            <a
                                href="http://www.apache.org/licenses/LICENSE-2.0.txt"
                                className={`font-bold underline hover:text-blue-700 dark:hover:text-blue-400`}
                            >
                                Apache License Version 2.0
                            </a>
                            .
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
