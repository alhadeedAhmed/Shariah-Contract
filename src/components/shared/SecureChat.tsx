import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Shield } from "lucide-react";
import { useState } from "react";

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
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-[#4A0404]" />
          <h3 className="text-lg font-semibold text-[#4A0404] tracking-tight">
            {title}
          </h3>
        </div>
        <span className="text-xs text-[#B4925F]">End-to-end encrypted</span>
      </div>
      <div className="flex-1 space-y-3 overflow-auto pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className="bg-white/70 border border-[#4A0404]/10 rounded-xl p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#4A0404]">
                {m.author}
              </span>
              <span className="text-xs text-[#B4925F]">{m.time}</span>
            </div>
            <p className="text-sm text-[#4A0404] mt-1">{m.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a secure message..."
          className="border-[#4A0404]/20"
        />
        <Button
          onClick={send}
          className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default SecureChat;
