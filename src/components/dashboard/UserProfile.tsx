import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CheckCircle,
  AlertTriangle,
  Edit,
  Save,
  X,
  Camera,
  FileText,
  CreditCard,
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

interface ProfileData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    profileImage: string;
  };
  businessInfo: {
    businessName: string;
    businessType: string;
    registrationNumber: string;
    taxId: string;
    businessAddress: string;
    businessPhone: string;
  };
  kycStatus: {
    personal: "verified" | "pending" | "rejected";
    business: "verified" | "pending" | "rejected";
    documents: "verified" | "pending" | "rejected";
  };
  compliance: {
    shariahCompliance: boolean;
    regulatoryCompliance: boolean;
    riskAssessment: "low" | "medium" | "high";
  };
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      firstName: "Ahmed",
      lastName: "Al-Rashid",
      email: "ahmed.alrashid@email.com",
      phone: "+966 50 123 4567",
      dateOfBirth: "1985-03-15",
      address: "Riyadh, Saudi Arabia",
      profileImage: "",
    },
    businessInfo: {
      businessName: "Al-Rashid Trading LLC",
      businessType: "Trading Company",
      registrationNumber: "1010123456",
      taxId: "300123456789003",
      businessAddress: "King Fahd Road, Riyadh, Saudi Arabia",
      businessPhone: "+966 11 234 5678",
    },
    kycStatus: {
      personal: "verified",
      business: "verified",
      documents: "verified",
    },
    compliance: {
      shariahCompliance: true,
      regulatoryCompliance: true,
      riskAssessment: "low",
    },
  });

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "business", label: "Business Info", icon: Building2 },
    { id: "kyc", label: "KYC Status", icon: Shield },
    { id: "compliance", label: "Compliance", icon: CheckCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getKYCStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-adalah-golden to-adalah-dark rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0 bg-adalah-primary hover:bg-adalah-primary/80"
              >
                <Camera className="h-3 w-3 text-white" />
              </Button>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-adalah-primary font-inter-tight">
                {profileData.personalInfo.firstName}{" "}
                {profileData.personalInfo.lastName}
              </h3>
              <p className="text-adalah-golden">
                {profileData.businessInfo.businessName}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  className={getKYCStatusColor(profileData.kycStatus.personal)}
                >
                  {getKYCStatusIcon(profileData.kycStatus.personal)}
                  <span className="ml-1">KYC Verified</span>
                </Badge>
                <Badge
                  className={getRiskColor(
                    profileData.compliance.riskAssessment
                  )}
                >
                  Risk: {profileData.compliance.riskAssessment}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowSensitiveData(!showSensitiveData)}
              className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
            >
              {showSensitiveData ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
            >
              {isEditing ? (
                <Save className="h-4 w-4 mr-2" />
              ) : (
                <Edit className="h-4 w-4 mr-2" />
              )}
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
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
      </Card>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "personal" && (
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-5 w-5 text-adalah-primary" />
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Personal Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  First Name
                </label>
                <Input
                  value={profileData.personalInfo.firstName}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        firstName: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Last Name
                </label>
                <Input
                  value={profileData.personalInfo.lastName}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        lastName: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Email
                </label>
                <Input
                  value={profileData.personalInfo.email}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        email: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Phone
                </label>
                <Input
                  value={profileData.personalInfo.phone}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        phone: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  value={profileData.personalInfo.dateOfBirth}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        dateOfBirth: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Address
                </label>
                <Input
                  value={profileData.personalInfo.address}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        address: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
            </div>
          </Card>
        )}

        {activeTab === "business" && (
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="h-5 w-5 text-adalah-primary" />
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Business Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Business Name
                </label>
                <Input
                  value={profileData.businessInfo.businessName}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      businessInfo: {
                        ...prev.businessInfo,
                        businessName: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Business Type
                </label>
                <Input
                  value={profileData.businessInfo.businessType}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      businessInfo: {
                        ...prev.businessInfo,
                        businessType: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Registration Number
                </label>
                <Input
                  value={
                    showSensitiveData
                      ? profileData.businessInfo.registrationNumber
                      : "••••••••••"
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Tax ID
                </label>
                <Input
                  value={
                    showSensitiveData
                      ? profileData.businessInfo.taxId
                      : "•••••••••••••••"
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Business Address
                </label>
                <Input
                  value={profileData.businessInfo.businessAddress}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      businessInfo: {
                        ...prev.businessInfo,
                        businessAddress: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-adalah-primary mb-2">
                  Business Phone
                </label>
                <Input
                  value={profileData.businessInfo.businessPhone}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      businessInfo: {
                        ...prev.businessInfo,
                        businessPhone: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                  className="border-adalah-primary/20 focus:border-adalah-golden"
                />
              </div>
            </div>
          </Card>
        )}

        {activeTab === "kyc" && (
          <div className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-5 w-5 text-adalah-primary" />
                <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                  KYC Status
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-adalah-primary" />
                    <div>
                      <div className="font-medium text-adalah-primary">
                        Personal Verification
                      </div>
                      <div className="text-sm text-adalah-golden">
                        Identity documents and personal information
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={getKYCStatusColor(
                      profileData.kycStatus.personal
                    )}
                  >
                    {getKYCStatusIcon(profileData.kycStatus.personal)}
                    <span className="ml-1 capitalize">
                      {profileData.kycStatus.personal}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-adalah-primary" />
                    <div>
                      <div className="font-medium text-adalah-primary">
                        Business Verification
                      </div>
                      <div className="text-sm text-adalah-golden">
                        Business registration and legal documents
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={getKYCStatusColor(
                      profileData.kycStatus.business
                    )}
                  >
                    {getKYCStatusIcon(profileData.kycStatus.business)}
                    <span className="ml-1 capitalize">
                      {profileData.kycStatus.business}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-adalah-primary" />
                    <div>
                      <div className="font-medium text-adalah-primary">
                        Document Verification
                      </div>
                      <div className="text-sm text-adalah-golden">
                        Supporting documents and certificates
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={getKYCStatusColor(
                      profileData.kycStatus.documents
                    )}
                  >
                    {getKYCStatusIcon(profileData.kycStatus.documents)}
                    <span className="ml-1 capitalize">
                      {profileData.kycStatus.documents}
                    </span>
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-5 w-5 text-adalah-primary" />
                <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                  Required Documents
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-adalah-primary/10 rounded-lg">
                  <span className="text-adalah-primary">
                    National ID / Passport
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Uploaded
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-adalah-primary/10 rounded-lg">
                  <span className="text-adalah-primary">
                    Business Registration Certificate
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Uploaded
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-adalah-primary/10 rounded-lg">
                  <span className="text-adalah-primary">
                    Tax Registration Certificate
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    Uploaded
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-adalah-primary/10 rounded-lg">
                  <span className="text-adalah-primary">
                    Bank Statement (3 months)
                  </span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="space-y-6">
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-5 w-5 text-adalah-primary" />
                <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                  Compliance Status
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-adalah-primary" />
                    <div>
                      <div className="font-medium text-adalah-primary">
                        Shariah Compliance
                      </div>
                      <div className="text-sm text-adalah-golden">
                        Adherence to Islamic financial principles
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      profileData.compliance.shariahCompliance
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {profileData.compliance.shariahCompliance
                      ? "Compliant"
                      : "Non-Compliant"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-adalah-primary" />
                    <div>
                      <div className="font-medium text-adalah-primary">
                        Regulatory Compliance
                      </div>
                      <div className="text-sm text-adalah-golden">
                        Meeting regulatory requirements
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      profileData.compliance.regulatoryCompliance
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {profileData.compliance.regulatoryCompliance
                      ? "Compliant"
                      : "Non-Compliant"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-adalah-primary" />
                    <div>
                      <div className="font-medium text-adalah-primary">
                        Risk Assessment
                      </div>
                      <div className="text-sm text-adalah-golden">
                        Current risk level evaluation
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={getRiskColor(
                      profileData.compliance.riskAssessment
                    )}
                  >
                    {profileData.compliance.riskAssessment.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="h-5 w-5 text-adalah-primary" />
                <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                  Compliance Alerts
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-800">
                      All compliance requirements met
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-yellow-800">
                      Annual compliance review due in 2 months
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="h-5 w-5 text-adalah-primary" />
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Account Settings
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                <div>
                  <div className="font-medium text-adalah-primary">
                    Email Notifications
                  </div>
                  <div className="text-sm text-adalah-golden">
                    Receive updates via email
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary"
                >
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                <div>
                  <div className="font-medium text-adalah-primary">
                    SMS Notifications
                  </div>
                  <div className="text-sm text-adalah-golden">
                    Receive updates via SMS
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary"
                >
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                <div>
                  <div className="font-medium text-adalah-primary">
                    Two-Factor Authentication
                  </div>
                  <div className="text-sm text-adalah-golden">
                    Add extra security to your account
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary"
                >
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                <div>
                  <div className="font-medium text-adalah-primary">
                    Change Password
                  </div>
                  <div className="text-sm text-adalah-golden">
                    Update your account password
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary"
                >
                  Change
                </Button>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default UserProfile;
