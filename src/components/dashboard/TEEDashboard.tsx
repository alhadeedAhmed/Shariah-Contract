import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Mic,
  MicOff,
  MessageSquare,
  Upload,
  Download,
  Wallet,
  User,
  Building,
  Activity,
  FileText,
  CreditCard,
} from "lucide-react";
import VoiceAI from "./VoiceAI";
import DigitalVault from "./DigitalVault";
import WalletDisplay from "./WalletDisplay";
import UserProfile from "./UserProfile";
import TransactionFeed from "./TransactionFeed";
import CrossDashboard from "./CrossDashboard";

const TEEDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isTEEActive, setIsTEEActive] = useState(true);
  const [securityLevel, setSecurityLevel] = useState("maximum");

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "ai", label: "AI Assistant", icon: MessageSquare },
    { id: "vault", label: "Digital Vault", icon: FileText },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "profile", label: "Profile", icon: User },
    { id: "cross", label: "Cross-Dashboard", icon: Building },
  ];

  const securityStatus = {
    maximum: {
      color: "bg-green-500",
      text: "Maximum Security",
      icon: CheckCircle,
    },
    high: {
      color: "bg-yellow-500",
      text: "High Security",
      icon: AlertTriangle,
    },
    medium: {
      color: "bg-orange-500",
      text: "Medium Security",
      icon: AlertTriangle,
    },
    low: { color: "bg-red-500", text: "Low Security", icon: AlertTriangle },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/10">
      {/* TEE Security Header */}
      <div className="bg-gradient-to-r from-adalah-primary to-adalah-dark text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6" />
              <span className="font-bold text-lg font-inter-tight">
                TEE Dashboard
              </span>
            </div>
            <Badge
              className={`${securityStatus[securityLevel].color} text-white`}
            >
              {React.createElement(securityStatus[securityLevel].icon, {
                className: "h-3 w-3 mr-1",
              })}
              {securityStatus[securityLevel].text}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span className="text-sm">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Blockchain Secured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <Card className="mb-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
                        : "text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Main Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Security Status */}
              <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-adalah-primary" />
                  <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                    TEE Security Status
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-adalah-golden">
                      Encryption Level
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      AES-256
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-adalah-golden">
                      Blockchain Hash
                    </span>
                    <span className="text-xs text-adalah-primary font-mono">
                      0x4a7b...
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-adalah-golden">
                      Last Verified
                    </span>
                    <span className="text-xs text-adalah-primary">
                      2 minutes ago
                    </span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="h-6 w-6 text-adalah-primary" />
                  <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                    Quick Actions
                  </h3>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-adalah-golden to-adalah-dark text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start AI Chat
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-adalah-primary border-adalah-primary"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-adalah-primary border-adalah-primary"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Contract
                  </Button>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="h-6 w-6 text-adalah-primary" />
                  <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                    Recent Activity
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-adalah-primary">
                      Document uploaded to vault
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-adalah-primary">
                      Contract generated
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-adalah-primary">
                      Payment processed
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "ai" && <VoiceAI />}
          {activeTab === "vault" && <DigitalVault />}
          {activeTab === "wallet" && <WalletDisplay />}
          {activeTab === "transactions" && <TransactionFeed />}
          {activeTab === "profile" && <UserProfile />}
          {activeTab === "cross" && <CrossDashboard />}
        </motion.div>
      </div>
    </div>
  );
};

export default TEEDashboard;
