import React, { useEffect } from "react";
import Card from "../../UI/Card";
import RubyText from "../../UI/RubyText/RubyText";

/**
 * Display sentences related to a word to our user when viewing
 *  a WordDetails page.
 *
 * @param props {{sentences:Array<string>}}
 * @returns {JSX.Element}
 * @constructor
 */
const SentencesCard = props => {
    const { sentences } = props || undefined;

    return (
        <Card>
            <ul>
                {sentences.map((sentence,index) => (
                    <li key={`sentence-${index}`} className={`p-4`}>
                        {!sentence.furigana && (
                            <p className={`text-xl jp`}>{sentence.content}</p>
                        )}
                        {sentence.furigana && (
                            <p className={`text-xl jp`}>
                                <RubyText
                                    text={sentence.content}
                                    furigana={
                                        sentence.furigana
                                    }
                                />
                            </p>
                        )}
                        <p
                            className={`text-md text-black/50 dark:text-white/70 leading-none`}
                        >
                            {sentence.translation}
                        </p>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default SentencesCard;
