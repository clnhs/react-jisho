import React from "react";
import { MdBrush, MdOutlineSchool } from "react-icons/md";

const InfoHeader = props => {
    const { grade, jlpt, stroke_count } =
        props.data || undefined;
    return (
        <div
            className={`flex flex-row text-sm border-b border-gray-300 dark:border-gray-800`}
        >
            {stroke_count && (
                <div
                    className={`flex items-center justify-center px-0.5 py-0.5 w-full text-center border-r last:border-r-0 border-gray-300 dark:border-gray-800`}
                >
                    <span>
                        <MdBrush className={`inline`} />
                        &nbsp;{stroke_count}
                    </span>
                </div>
            )}
            {jlpt && (
                <div
                    className={`flex items-center justify-center px-0.5 py-0.5 w-full text-center border-r last:border-r-0 border-gray-300 dark:border-gray-800`}
                >
                    <span>JLPT&nbsp;N{jlpt}</span>
                </div>
            )}
            {grade && (
                <div
                    className={`flex items-center justify-center px-0.5 py-0.5 w-full text-center border-r last:border-r-0 border-gray-300 dark:border-gray-800`}
                >
                    <MdOutlineSchool className={`inline`} />
                    &nbsp;{grade}
                </div>
            )}
        </div>
    );
};

export default InfoHeader;
