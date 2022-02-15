import React from "react";
import Card from "../UI/Card";
import useMatchMedia from "../../hooks/useMatchMedia";

/**
 * The card component used to display search results in our SearchResultsPage ([query]) page component.
 *  Serves as the base to the KanjiEntry and WordEntry components.
 *
 * @param props {{onClick: function, className:string}}
 * @returns {JSX.Element}
 * @constructor
 */
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
