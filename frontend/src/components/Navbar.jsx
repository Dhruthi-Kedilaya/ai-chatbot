import React, { use } from "react";
import { Cross, Moon, Sun, X } from "lucide-react";
import { useMsgStore } from "../store/msgStore";

const Navbar = () => {
  const { theme, setTheme, clearChat } = useMsgStore();
  return (
    <div>
      <div className="navbar items-center justify-content flex bg-base-200">
        <h1 className="text-3xl flex-1 font-bold">Chat Application</h1>
        <button
          className="btn btn-ghost btn-sm text-xl font-bold rounded-btn"
          onClick={() => setTheme(theme === "fantasy" ? "dark" : "fantasy")}
        >
          {theme === "fantasy" ? (
            <span className="flex items-center gap-2">
              <Moon className="size-6 text-primary" /> Dark
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sun className="size-6 text-primary" /> Light
            </span>
          )}
        </button>
        <button
          className="btn btn-ghost btn-sm text-xl font-bold rounded-btn"
          onClick={() => {clearChat()}}
        >
          <span className="flex items-center gap-2">
            <X className="size-6 text-primary" /> Clear Chat
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
