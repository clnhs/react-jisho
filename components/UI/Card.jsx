import React, { useEffect } from "react";
import useMatchMedia from "../../hooks/useMatchMedia";

const Card = (props) => {

    const { onClick, className } = props || undefined;

    return (
        <div
            className={`w-full group first:mt-0 p-[1px] rounded-lg  transition-all bg-white dark:bg-gray-700 dark:border dark:border-gray-800 ${className} shadow`}
            onClick={onClick}
        >
            {props.children}
        </div>
    );
};

export default Card;
