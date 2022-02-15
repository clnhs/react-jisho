import React, { useEffect } from "react";
import useMatchMedia from "../../hooks/useMatchMedia";

/**
 * The Card component is used almost everywhere we display
 *  information to our user. Serves as base for ResultCard.
 *
 * @param props {{onclick:function,className:string}}
 * @returns {JSX.Element}
 * @constructor
 */
const Card = (props) => {

    const { onClick, className } = props || undefined;

    return (
        <div
            className={`w-full group first:mt-0 p-[1px] rounded-lg  transition-all bg-white dark:bg-gray-700 dark:border dark:border-gray-800 shadow ${className}`}
            onClick={onClick}
        >
            {props.children}
        </div>
    );
};

export default Card;
