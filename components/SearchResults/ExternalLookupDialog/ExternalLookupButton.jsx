import React from "react";
import Image from "next/image";

const ExternalLookupButton = props => {
    const {
        iconPath,
        text,
        target,
        newTab = true,
    } = props || undefined;
    return (
        <button
            className={`flex flex-row items-center gap-1.5 px-4 py-2 rounded-md box-content bg-white dark:bg-gray-700 hover:bg-gray-300 border border-transparent hover:border-gray-300 dark:hover:border-gray-800 dark:hover:text-black transition-all`}
            onClick={e =>
                (newTab && window.open(target, "_blank")) ||
                window.open(target)
            }
        >
            <Image
                src={iconPath}
                width={24}
                height={24}
                className={`rounded-md`}
            />{" "}
            {text}
        </button>
    );
};

export default ExternalLookupButton;
