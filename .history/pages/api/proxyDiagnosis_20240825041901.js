// pages/api/proxyDiagnosis.js
import axios from "axios";

export default async function handler(req, res) {
  const { age, gender, symptoms } = req.query;
  const appId = process.env.NEXT_PUBLIC_WOLFRAM_APP_ID;

  try {
    const query = `${symptoms} a ${age} year old ${gender}`;

    const response = await axios.get(`https://www.wolframalpha.com/api/v1/llm-api?input=${query}&appid=${appId}&maxchars=500`);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diagnosis" });
  }
}
