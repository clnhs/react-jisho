import React from "react";
import PitchAccent from "./PitchAccent";
import Listen from "./Listen";

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
