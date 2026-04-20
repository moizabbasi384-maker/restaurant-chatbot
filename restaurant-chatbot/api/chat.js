export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Get user message from frontend
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    // Your Gemini API key (stored safely in Vercel)
    const API_KEY = process.env.GEMINI_API_KEY;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a helpful restaurant assistant for Lahori Dhaba.

Rules:
- Answer in simple Urdu + English mix
- Help customers with menu, orders, prices
- Be friendly and short

Customer says: ${message}
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I didn't understand that.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}