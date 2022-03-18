import React, { useState } from "react";
import useFetch from "./useFetch";

const useKanjiVG = () => {
    const [isLoading, hasError, sendRq] = useFetch();

    const getKanjiVG = (charCode, callback) => {
        return sendRq(
            {
                method: "GET",
                url: `/api/kanjivg/${charCode}`,
            },
            data => {
                const { nodeString } = data;
                callback(nodeString);
            }
        );
    };

    return {
        kanjiVGIsLoading: isLoading,
        kanjiVGHasError: hasError,
        getKanjiVG,
    };
};

export default useKanjiVG;
