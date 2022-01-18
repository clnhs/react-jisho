import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const Tooltip = (props) => {
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root delayDuration={300}>
                <TooltipPrimitive.Trigger>
                    {props.children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content side={"top"} className={`bg-black text-white py-1 px-2 rounded-md`}>
                    Listen
                    <TooltipPrimitive.Arrow />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
};

export default Tooltip;
