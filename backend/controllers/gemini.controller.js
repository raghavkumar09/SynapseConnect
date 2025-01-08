import { generateResult } from "../services/gemini.service.js";

export const getGeminiResult = async (req, res) => {
    try {
        const result = await generateResult(req.query.prompt);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}