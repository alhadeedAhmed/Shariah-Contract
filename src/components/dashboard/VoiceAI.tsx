import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  Brain,
  CheckCircle,
  AlertTriangle,
  FileText,
  Calculator,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
  isVoice?: boolean;
}

const VoiceAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI assistant. I can help you navigate the platform, generate contracts, check compliance, and answer questions about Islamic finance. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("contract") || lowerInput.includes("murabahah")) {
      return "I can help you generate a Murabahah contract. Based on your requirements, I'll create a Shariah-compliant contract with transparent profit margins. Would you like me to start the contract generation process?";
    }

    if (lowerInput.includes("compliance") || lowerInput.includes("shariah")) {
      return "I can check your contract for Shariah compliance. I'll analyze for Riba (interest), Gharar (uncertainty), and other prohibited elements. Please upload your contract or provide the details you'd like me to review.";
    }

    if (lowerInput.includes("payment") || lowerInput.includes("installment")) {
      return "I can help you with payment calculations and installment schedules. For Murabahah contracts, I can calculate the profit margin and monthly payments while ensuring Shariah compliance.";
    }

    if (lowerInput.includes("help") || lowerInput.includes("navigate")) {
      return "I can help you navigate the platform! Here are some things I can assist with:\n• Generate Shariah-compliant contracts\n• Check compliance and risk assessment\n• Calculate payments and installments\n• Navigate to different sections\n• Answer questions about Islamic finance\n\nWhat would you like to do?";
    }

    return (
      "I understand you're asking about: " +
      input +
      ". I can help you with contract generation, compliance checking, payment calculations, or general navigation. Could you be more specific about what you need assistance with?"
    );
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      // Stop voice recognition
    } else {
      setIsListening(true);
      // Start voice recognition
      // This would integrate with Web Speech API
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      setIsSpeaking(false);
      // Stop text-to-speech
    } else {
      setIsSpeaking(true);
      // Start text-to-speech for last AI message
      const lastAIMessage = messages.filter((m) => m.type === "ai").pop();
      if (lastAIMessage) {
        // This would integrate with Web Speech API
        setTimeout(() => setIsSpeaking(false), 3000);
      }
    }
  };

  const quickActions = [
    {
      label: "Generate Contract",
      icon: FileText,
      action: "Generate a new Murabahah contract",
    },
    {
      label: "Check Compliance",
      icon: CheckCircle,
      action: "Check contract for Shariah compliance",
    },
    {
      label: "Calculate Payment",
      icon: Calculator,
      action: "Calculate installment payments",
    },
    {
      label: "Navigate to Vault",
      icon: FileText,
      action: "Open digital vault",
    },
  ];

  return (
    <div className="space-y-6">
      {/* AI Status Card */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
              <Brain className="h-6 w-6 text-adalah-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                AI Assistant
              </h3>
              <p className="text-sm text-adalah-golden">Voice & Chat Enabled</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Online
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Bot className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </Card>

      {/* Chat Interface */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <MessageSquare className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Chat Interface
          </h3>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === "ai" && (
                    <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                  )}
                  {message.type === "user" && (
                    <User className="h-4 w-4 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message or use voice..."
            className="flex-1 border-adalah-primary/20 focus:border-adalah-golden"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={toggleListening}
            variant={isListening ? "default" : "outline"}
            className={`${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
            }`}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isProcessing}
            className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Quick Actions
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => {
                setInputText(action.action);
                handleSendMessage();
              }}
              className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5 h-auto p-4 flex flex-col items-center space-y-2"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-sm text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Voice Controls */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Volume2 className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Voice Controls
          </h3>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={toggleSpeaking}
            variant={isSpeaking ? "default" : "outline"}
            className={`${
              isSpeaking
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
            }`}
          >
            {isSpeaking ? (
              <VolumeX className="h-4 w-4 mr-2" />
            ) : (
              <Volume2 className="h-4 w-4 mr-2" />
            )}
            {isSpeaking ? "Stop Speaking" : "Text to Speech"}
          </Button>
          <div className="text-sm text-adalah-golden">
            {isListening
              ? "Listening..."
              : isSpeaking
              ? "Speaking..."
              : "Voice controls ready"}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VoiceAI;
