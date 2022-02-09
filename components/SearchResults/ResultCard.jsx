import React from "react";
import Card from "../UI/Card";
import useMatchMedia from "../../hooks/useMatchMedia";

const ResultCard = (props) => {
    const isTouchScreen = useMatchMedia(["hover: none", "pointer: coarse"], "all");

    const { onClick, className } = props;

    return (
        <Card onClick={onClick} className={`bg-white ${!isTouchScreen && `hover:shadow-sm hover:shadow-blue-300 hover:bg-blue-300 hover:cursor-pointer hover:border-transparent`} ${className}`}>
            <div
                className={`w-full h-full rounded-md border-2 border-transparent w-full bg-white dark:bg-gray-700 ${!isTouchScreen && `group-hover:bg-opacity-80`} transition-all`}>
                {props.children}
            </div>
        </Card>
    );
};

export default ResultCard;
