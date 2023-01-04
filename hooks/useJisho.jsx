import React from "react";
import useFetch from "../utils/fetch";

const useJisho = () => {
    const [isLoading, hasError, sendRq] = useFetch(
        "https://jisho.org/api/v1/search/words"
    );

    return { isLoading, hasError, sendRq };
};

export default useJisho;
