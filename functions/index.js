import { https } from "firebase-functions/v2";
import fetch from "node-fetch";

export const chatWithAI = https.onCall(
  {
    region: "europe-west1",
    secrets: ["OPENROUTER_API_KEY"],
  },
  async (req) => {
    const prompt = req.data.prompt;
    if (!prompt) {
      throw new https.HttpsError("invalid-argument", "No prompt provided");
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const text = await response.text();  // <-- loguer texte brut
      console.log("OpenRouter raw response:", text);

      const result = JSON.parse(text);     // parse après log
      if (!result?.choices?.[0]?.message?.content) {
        throw new https.HttpsError("internal", "Invalid response from OpenRouter API");
      }

      return { text: result.choices[0].message.content };
    } catch (err) {
      console.error("Firebase Function Error:", err);
      throw new https.HttpsError("internal", err.message);
    }
  }
);