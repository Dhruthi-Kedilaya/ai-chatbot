import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMsgStore = create((set, get) => ({
  messages: [],
  isSendingMsg: false,
  getAllMsgs: async () => {
    try {
      const response = await axiosInstance.get("/messages");
      set({ messages: response.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    }
  },
  sendMsg: async (msg) => {
    set({ isSendingMsg: true });
    const userMsg = { text: msg, sender: "user" };
    set((state) => ({ messages: [...state.messages, userMsg] }));
    try {
      const currentMessages = get().messages;
      const response = await axiosInstance.post("/messages", {
        messages: currentMessages,
      });
      const aiMsg = response.data;
      set((state) => ({
        messages: [...state.messages, aiMsg],
      }));
      if (response) {
        console.log("Message sent successfully:", response.data);
        toast.success("Message sent successfully");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      set({ isSendingMsg: false });
    }
  },
  clearChat: async () => {
    try {
      const response = await axiosInstance.delete("/messages");
      set({ messages: [] });
      toast.success("Chat cleared successfully!");
    } catch (error) {
      console.error("Error in clearing the chat", error);
      toast.error("Failed to clear chat");
    }
  },
  theme: localStorage.getItem("ai-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("ai-theme", theme);
    set({ theme });
  },
}));
