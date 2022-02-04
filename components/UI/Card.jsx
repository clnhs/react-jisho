import React from "react";

const Card = (props) => {
    const { onClick, className } = props || undefined;

    return (
        <div
            className={`w-full box-content group first:mt-0 p-[1px] rounded-lg bg-black/10 dark:bg-black/40 hover:shadow-sm hover:shadow-blue-300 hover:bg-blue-300 hover:cursor-pointer transition-all` + className}
            onClick={onClick}
        >
            <div className={`w-full h-full rounded-md border-2 border-transparent w-full bg-white dark:bg-gray-700 group-hover:bg-opacity-80 transition-all overflow-hidden`}>
                {props.children}
            </div>
        </div>
    );
};

export default Card;
