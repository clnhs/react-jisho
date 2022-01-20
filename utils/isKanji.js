export const isKanji = char => {
    if (typeof char === "string")
        return !!char.match(/[一-龯]/);

    return false;
};