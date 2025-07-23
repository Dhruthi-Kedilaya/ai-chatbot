import express from "express";
import Message from "../models/message.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash",
    });
    if (!prompt) {
      console.error("Prompt is required for generating content");
      return;
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    const reply = new Message({
      sender: "gemini",
      text: text,
    });
    await reply.save();
  } catch (error) {
    console.error("Error generating reply from the gemini:", error);
    res.status(500).json({
      message: "Error generating reply from the gemini",
    });
  }
}

const router = express.Router();
router.get("/messages", async (req, res) => {
  try {
    const allmsgs = await Message.find();
    if (!allmsgs || allmsgs.length === 0) {
      return res.status(200).json({ message: "No messages found" });
    }
    res.status(200).json(allmsgs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
    console.error("Error fetching messages:", error);
  }
});

router.post("/messages", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Messages history is required" });
    }
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.text) {
      return res.status(400).json({ message: "Invalid message text" });
    }

    const userMessage = new Message({
      sender: "user",
      text: lastMessage.text,
    });
    await userMessage.save();
    const formattedHistory = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash",
    });
    const result = await model.generateContent({ contents: formattedHistory });
    const response = await result.response;
    const text = response.text();

    const aiMessage = new Message({
      sender: "gemini",
      text,
    });
    await aiMessage.save();

    res.status(200).json(aiMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Error creating message" });
  }
});

router.delete("/messages",async(req,res)=>{
  try {
    const deletedMsgs=await Message.deleteMany({});
    res.status(200).json(deletedMsgs);
  } catch (error) {
    console.error("Error deleting messages:", error);
    res.status(500).json({ message: "Error deleting messages" });
  }
})

export default router;
