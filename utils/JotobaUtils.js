export const parsePos = part => {
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
                part.Noun.toLowerCase() + " noun"
            );
    } else if (part.hasOwnProperty("Adjective"))
        if (part.Adjective === "PreNounVerb")
            partsOfSpeech.push(`Pre-noun/verb adj.`);
        else partsOfSpeech.push(`${part.Adjective} adj.`);
    else partsOfSpeech.push(JSON.stringify(part.Verb));

    return partsOfSpeech;
};
