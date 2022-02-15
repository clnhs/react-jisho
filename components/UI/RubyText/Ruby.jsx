import React from "react";

/**
 * Wrapper component for the ruby HTMLElement. Used in
 *  the RubyText component.
 *
 * @param props {{char:string,furigana:string}}
 * @returns {JSX.Element}
 * @constructor
 */
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
