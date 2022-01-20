import React from "react";

const Ruby = props => {
    const { char, furigana } = props.rubyData || undefined;
    return (
        <ruby>
            <span>{char}</span>
            <rp>(</rp>
            {
                <rt
                    className={`text-sm jp pointer-events-none`}
                >
                    {furigana}
                </rt>
            }
            <rp>)</rp>
        </ruby>
    );
};
export default Ruby;
