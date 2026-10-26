import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables from .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to Google Gemini instead of OpenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Receive chat messages from React
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Check for an empty message
    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // Send the message to Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
    });

    // Return the answer in the format React expects
    res.json({
      reply: response.text,
    });

  } catch (error) {
    // Display the actual error in the backend terminal
    console.error("Gemini API error:", error.message);

    res.status(500).json({
      error: "Failed to get Gemini response",
    });
  }
});

// Start the Express backend
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
