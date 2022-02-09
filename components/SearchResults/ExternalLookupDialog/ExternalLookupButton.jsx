import React from "react";
import Image from "next/image";
import Tooltip from "../../UI/Tooltip";

const ExternalLookupButton = props => {
    const {
        icon,
        iconPath,
        text,
        tooltip,
        tooltipSide,
        target,
        newTab = true,
        onClick,
    } = props || undefined;

    const Button = props => {
        return (
            <button
                className={`flex flex-row items-center gap-1.5 px-4 py-2 rounded-md box-content bg-white dark:bg-gray-700 hover:bg-gray-300 border border-transparent hover:border-gray-300 dark:hover:border-gray-800 dark:hover:text-black transition-all`}
                onClick={e => {
                    if (!target && onClick) onClick();
                    else if (target) {
                        if (newTab)
                            window.open(target, "_blank");
                        else
                            window.open(target);
                    }
                }}
            >
                {props.children}
            </button>
        );
    };

    return (
        <>
            {tooltip && (
                <Tooltip
                    text={tooltip}
                    side={tooltipSide || "top"}
                >
                    <Button>
                        {iconPath && (
                            <Image
                                src={iconPath}
                                width={24}
                                height={24}
                                className={`rounded-md`}
                            />
                        )}
                        {!iconPath && icon && <>{icon}</>}
                        {text && ` ${text}`}
                    </Button>
                </Tooltip>
            )}
            {!tooltip && (
                <Button>
                    {iconPath && (
                        <Image
                            src={iconPath}
                            width={24}
                            height={24}
                            className={`rounded-md`}
                        />
                    )}
                    {!iconPath && icon && <>{icon}</>}
                    {text && ` ${text}`}
                </Button>
            )}
        </>
    );
};

export default ExternalLookupButton;
