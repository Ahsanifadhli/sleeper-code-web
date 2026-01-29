"use client";
import { useState, useEffect, useRef } from "react";

export default function HackerTerminal({ onUnlock }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "SleeperOS v1.0.0 (tty1)",
    "Login successful.",
    "Type 'help' to see available commands.",
  ]);
  const endOfMsgRef = useRef(null);

  // Supaya scroll selalu di bawah
  useEffect(() => {
    endOfMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      let output = "";

      // LOGIKA PERINTAH DI SINI
      switch (command) {
        case "help":
          output = "Available commands: help, whoami, clear, reveal";
          break;
        case "whoami":
          output = "guest@sleeper-code. You are a visitor.";
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "reveal": // INI KODE RAHASIANYA
          output = "Access Granted. Decrypting identity...";
          onUnlock(); // Panggil fungsi pembuka rahasia
          break;
        case "":
          output = "";
          break;
        default:
          output = `Command not found: ${command}`;
      }

      setHistory([...history, `guest@sleeper:~$ ${input}`, output]);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-2xl mt-8 bg-black border-2 border-green-500 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.5)] p-4 font-mono text-sm md:text-base overflow-hidden">
      {/* Header Terminal */}
      <div className="flex items-center gap-2 mb-4 border-b border-green-900 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-green-700 ml-2 text-xs">root@sleeper-code</span>
      </div>

      {/* Area Output */}
      <div className="h-64 overflow-y-auto text-green-400 space-y-1 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className="break-words">
            {line}
          </div>
        ))}
        
        {/* Area Input */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-green-500">guest@sleeper:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-green-300 placeholder-green-800"
            autoFocus
            spellCheck="false"
          />
        </div>
        <div ref={endOfMsgRef} />
      </div>
    </div>
  );
}