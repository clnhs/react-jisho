import React, { useState } from "react";
import Tooltip from "../UI/Tooltip";
import ReactAudioPlayer from "react-audio-player";
import { MdVolumeUp } from "react-icons/md";

/**
 * Component to display a play/pause button so that our user
 *  can listen to any audio. **Currently unused due to API issue**.
 *
 * @param props {{audio:string}}
 * @returns {JSX.Element}
 * @constructor
 */
const Listen = props => {
    const { audio } = props || undefined;
    const [isAudioLoaded, setIsAudioLoaded] =
        useState(false);

    return (
        <Tooltip>
            <span>
                <ReactAudioPlayer
                    src={`https://jotoba.de${audio}`}
                    crossOrigin={"anonymous"}
                />
                <MdVolumeUp
                    className={`inline text-2xl dark:text-white ${
                        !isAudioLoaded
                            ? "animate-pulse"
                            : ""
                    }`}
                />
            </span>
        </Tooltip>
    );
};

export default Listen;
