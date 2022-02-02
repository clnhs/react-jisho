import { simple as simplePosData, detailed as detailedPosData } from "./PartsOfSpeech.json";

export const parsePos = (pos, short = false, kana = false, lang = "en") => {
    let posStr = "missing";
    let posMatch = null;
    if (typeof pos === "object") {
        const mainPart = Object.keys(pos)[0];
        const subPart = Object.values(pos)[0];
        if (subPart){
            if (typeof subPart === "string")
                posMatch = detailedPosData[mainPart][subPart];
            else
                posMatch = detailedPosData[mainPart][Object.keys(subPart)[0]].types[Object.values(subPart)[0]]
        }
        else posMatch = detailedPosData[mainPart];
    } //string
    else posMatch = simplePosData[pos];

    if (posMatch) {
        if (short) posStr = posMatch.short;
        else posStr = posMatch.long || posMatch;
    }

    return posStr;
};

export const parsePos_old = part => {
    const partsOfSpeech = [];

    if (typeof part === "string") {
        if (part !== "AuxiliaryVerb") {
            partsOfSpeech.push(`Auxiliary verb`);
        } else partsOfSpeech.push(part);
    } else if (part.hasOwnProperty("Verb")) {
        if (typeof part.Verb === "string")
            partsOfSpeech.push(part.Verb + " verb");
        else if (part.Verb.hasOwnProperty("Godan")) {
            partsOfSpeech.push(`Godan verb`);
        } else if (part.Verb.hasOwnProperty("Irregular")) {
            if (part.Verb.Irregular === "NounOrAuxSuru")
                partsOfSpeech.push(`Irregular 〜する verb`);
        }
    } else if (part.hasOwnProperty("Noun")) {
        if (part.Noun === "Normal")
            partsOfSpeech.push(`Noun`);
        else
            partsOfSpeech.push(
                part.Noun.toLowerCase() + " noun",
            );
    } else if (part.hasOwnProperty("Adjective"))
        if (part.Adjective === "PreNounVerb")
            partsOfSpeech.push(`Pre-noun/verb adj.`);
        else partsOfSpeech.push(`${part.Adjective} adj.`);
    else partsOfSpeech.push(JSON.stringify(part.Verb));

    return partsOfSpeech;
};
