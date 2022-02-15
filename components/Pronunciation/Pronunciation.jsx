import React from "react";
import PitchAccent from "./PitchAccent";

/**
 * Wrapper for both the Pitch and Listen components.
 *
 * @param props {{pitch:string,audio:string}}
 * @returns {JSX.Element}
 * @constructor
 */
const Pronunciation = props => {
    const { pitch, audio } = props || undefined;
    return (
        <div
            className={`col-span-full xl:col-span-3 gap-2`}
        >
            {pitch && <PitchAccent pitch={pitch} />}
            {/*{audio && (*/}
            {/*    <Listen audio={audio}/>*/}
            {/*)}*/}
        </div>
    );
};

export default Pronunciation;
