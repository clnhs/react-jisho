import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../utils/fetch";

const useKanjiVG = () => {
    const [isLoading, hasError, sendRq] = useFetch();

    const getKanjiVG = useCallback((charCode, callback) => {
        return sendRq(
            {
                method: "GET",
                url: `/api/kanjivg/${charCode}`,
            },
            async dataJson => {
                const { nodeString } =
                    await dataJson.json();
                callback(nodeString);
            },
        );
    }, []);

    return {
        kanjiVGIsLoading: isLoading,
        kanjiVGHasError: hasError,
        getKanjiVG,
    };
};

export default useKanjiVG;
