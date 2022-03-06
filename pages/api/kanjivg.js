import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";

export default function handler(req, res) {
    const getData = async callback => {
        const kanjivgFilePath = path.resolve(
            "./public/kanjivg/kanjivg-20160426.xml"
        );

        return fs.readFile(
            path.join(`/${kanjivgFilePath}`),
            "utf8",
            (err, data) => {
                if (err)
                    throw new Error(
                        "Couldn't read KanjiVG file."
                    );

                callback(data);
            }
        );
    };

    try {
        void getData(data => {
            const dataDOM = new JSDOM(data, {
                contentType: "image/svg+xml",
                charset: "utf-8",
            });

            const matchedNode =
                dataDOM.window.document.getElementById(
                    "kvg:kanji_06083"
                );

           res.status(200).json({
                message: "Found KanjiVG data",
                nodeString:
                    matchedNode.innerHTML.toString(),
            })
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
