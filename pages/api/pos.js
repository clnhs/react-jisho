import { parsePos } from "../../utils/JotobaUtils";

const fs = require("fs");
const path = require("path");

const handler = (req, res) => {
    const internalResDir = path.resolve(process.cwd(), "internal-resources");
    const posData = JSON.parse(
        fs.readFileSync(
            path.join(internalResDir, "PartsOfSpeech.json"),
            "utf8"
        )
    );

    if (req.method === "POST")
        if (posData) {
            if (req.method === "POST") {
                const partsOfSpeech =
                    req.body.partsOfSpeech;
                const config = req.body.config;

                if (partsOfSpeech) {
                    res.status(200).json(
                        partsOfSpeech.map(part =>
                            parsePos(part, posData, config)
                        )
                    );
                }
            }
        } else {
            res.status(200).json("Something's up with the parts of speech data.");
        }
    else
        res.status(200).json(`Unexpected request.`);
};

export default handler;
