import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Shield } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type Message = {
  id: string;
  author: string;
  text: string;
  time: string;
};

interface SecureChatProps {
  title?: string;
  initialMessages?: Message[];
}

export const SecureChat = ({
  title = "Secure Chat",
  initialMessages = [],
}: SecureChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        author: "You",
        text: draft.trim(),
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setDraft("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border border-adalah-primary/20 h-full flex flex-col rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-adalah-primary" />
            <h3 className="text-lg font-semibold text-adalah-primary tracking-tight font-inter-tight">
              {title}
            </h3>
          </div>
          <span className="text-xs text-adalah-golden">
            End-to-end encrypted
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-auto pr-1">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 border border-adalah-primary/10 rounded-xl p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-adalah-primary">
                  {m.author}
                </span>
                <span className="text-xs text-adalah-golden">{m.time}</span>
              </div>
              <p className="text-sm text-adalah-primary mt-1">{m.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center space-x-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a secure message..."
            className="border-adalah-primary/20"
          />
          <Button
            onClick={send}
            className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default SecureChat;
