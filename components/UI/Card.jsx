import React, { useEffect } from "react";
import useMatchMedia from "../../hooks/useMatchMedia";

const Card = (props) => {
    const isTouchScreen = useMatchMedia(["hover: none", "pointer: coarse"], "all");

    const { onClick, className } = props || undefined;

    return (
        <div
            className={`w-full box-content group first:mt-0 p-[1px] rounded-lg ${!isTouchScreen && `hover:shadow-sm hover:shadow-blue-300 hover:bg-blue-300 hover:cursor-pointer`} transition-all bg-black/10 dark:bg-black/40 ${className}`}
            onClick={onClick}
        >
            <div
                className={`w-full h-full rounded-md border-2 border-transparent w-full bg-white dark:bg-gray-700 ${!isTouchScreen && `group-hover:bg-opacity-80`} transition-all overflow-hidden`}>
                {props.children}
            </div>
        </div>
    );
};

export default Card;
