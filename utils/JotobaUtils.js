// import {
//     simple as simplePosData,
//     detailed as detailedPosData,
// } from "./PartsOfSpeech.json";

export const parsePos = (
    pos,
    posData,
    config = { short: false, kana: false, lang: "en" }
) => {
    if (posData) {
        const {
            simple: simplePosData,
            detailed: detailedPosData,
        } = posData || undefined;
        let posStr = "missing";
        let posMatch = null;
        if (typeof pos === "object") {
            const mainPart = Object.keys(pos)[0];
            const subPart = Object.values(pos)[0];
            if (subPart) {
                if (typeof subPart === "string")
                    posMatch =
                        detailedPosData[mainPart][subPart];
                else {
                    const category =
                        detailedPosData[mainPart];
                    const subCategory =
                        category[Object.keys(subPart)[0]];
                    if (subCategory)
                        posMatch =
                            subCategory.types[
                                Object.values(subPart)[0]
                            ];
                }
            } else posMatch = detailedPosData[mainPart];
        } //string
        else posMatch = simplePosData[pos];

        if (posMatch) {
            if (config.short) posStr = posMatch.short;
            else posStr = posMatch.long || posMatch;
        }

        return posStr;
    } else {
        throw new Error("Missing part of speech data.");
    }
};
