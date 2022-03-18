import fs from "fs";
import path from "path";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

export default function handler(req, res) {
    const { kanjivg: kanjiCharCode } = req.query;
    const xmlParser = new XMLParser({
        ignoreAttributes: false,
        preserveOrder: true,
    });

    const xmlBuilder = new XMLBuilder({
        ignoreAttributes: false,
        preserveOrder: true,
    });

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
        if (kanjiCharCode) {
            void getData(data => {
                const match = xmlParser
                    .parse(data)[1]
                    .kanjivg.find(
                        kanjivgEl =>
                            kanjivgEl[":@"]["@_id"] ===
                            `kvg:kanji_${kanjiCharCode}`
                    );

                if (match)
                    res.status(200).json({
                        message: "Found KanjiVG data",
                        nodeString: xmlBuilder.build(
                            match.kanji
                        ),
                    });
                else
                    res.status(400).json({
                        error: `No kanji matching charcode ${kanjiCharCode}`,
                    });
            });
        } else
            res.status(400).json({
                error: "No kanji to find.",
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
