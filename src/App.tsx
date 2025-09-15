// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { AppStoreProvider } from "./context/AppStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import AIContracts from "./pages/AIContracts";
import EnhancedWorkflow from "./pages/EnhancedWorkflow";
import CreateContract from "./pages/CreateContract";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import MurabahahWizard from "./pages/MurabahahWizard";
import ApplicationStatus from "./pages/ApplicationStatus";
import DeliveryTimeline from "./pages/DeliveryTimeline";
import Payments from "./pages/Payments";
import Signup from "./pages/IndividualSignup";
import SignupIndex from "./pages/SignupIndex";
import Notifications from "./pages/Notifications";
import VehicleServices from "./pages/VehicleServices";
// import AuditLog from "./pages/AuditLog";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import BusinessSignup from "./pages/BusinessSignup";
import ServiceProviderSignup from "./pages/ServiceProviderSignup";
import Investments from "./pages/Investments";
import ProposalNew from "./pages/ProposalNew";
import MusharakahConvert from "./pages/MusharakahConvert";
import BusinessStatus from "./pages/BusinessStatus";
// import BusinessDashboard from "./pages/BusinessDashboard";
import ProviderDashboard from "./pages/ServiceProviderDashboard";
import ScholarSignup from "./pages/ScholarSignup";
import ScholarDashboard from "./pages/ScholarDashboard";
import ScholarApplication from "./pages/ScholarApplication";
import ApplicationsList from "./pages/ApplicationsList";
import CapitalProviderSignup from "./pages/CapitalProviderSignup";
import CapitalProviderDashboard from "./pages/CapitalProviderDashboard";
import CapitalProviderApplication from "./pages/CapitalProviderApplication";
import CapitalProviderPortfolio from "./pages/CapitalProviderPortfolio";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSystemOversight from "./pages/AdminSystemOversight";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminComplianceHub from "./pages/AdminComplianceHub";
import AdminManageAccess from "./pages/AdminManageAccess";
import IndividualSignup from "./pages/IndividualSignup";
import TEEDashboard from "./components/dashboard/TEEDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppStoreProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tee-dashboard"
                element={
                  <ProtectedRoute>
                    <TEEDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-contracts"
                element={
                  <ProtectedRoute>
                    <AIContracts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/enhanced-workflow"
                element={
                  <ProtectedRoute>
                    <EnhancedWorkflow />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-contract"
                element={
                  <ProtectedRoute>
                    <CreateContract />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <ProtectedRoute allow={["individual"]}>
                    <Marketplace />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<SignupIndex />} />
              <Route path="/signup/individual" element={<IndividualSignup />} />
              <Route path="/signup/business" element={<BusinessSignup />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/business/signup" element={<BusinessSignup />} />
              <Route
                path="/signup/service-provider"
                element={<ServiceProviderSignup />}
              />
              <Route
                path="/murabahah/new"
                element={
                  <ProtectedRoute allow={["individual"]}>
                    <MurabahahWizard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications/:id"
                element={
                  <ProtectedRoute allow={["individual"]}>
                    <ApplicationStatus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delivery/:id"
                element={
                  <ProtectedRoute allow={["individual"]}>
                    <DeliveryTimeline />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payments"
                element={
                  <ProtectedRoute allow={["individual"]}>
                    <Payments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
                    <ApplicationsList />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/business/dashboard"
                element={
                  <ProtectedRoute allow={["business"]}>
                    <BusinessDashboard />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/vehicle-services"
                element={
                  <ProtectedRoute allow={["individual"]}>
                    <VehicleServices />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/audit"
                element={
                  <ProtectedRoute>
                    <AuditLog />
                  </ProtectedRoute>
                }
              /> */}
              {/* Business routes */}
              <Route
                path="/investments"
                element={
                  <ProtectedRoute allow={["business"]}>
                    <Investments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/proposal/new"
                element={
                  <ProtectedRoute allow={["business"]}>
                    <ProposalNew />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/musharakah/convert"
                element={
                  <ProtectedRoute allow={["business"]}>
                    <MusharakahConvert />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/business/applications/:id"
                element={
                  <ProtectedRoute allow={["business"]}>
                    <BusinessStatus />
                  </ProtectedRoute>
                }
              />
              {/* Provider routes */}
              <Route
                path="/provider/dashboard"
                element={
                  <ProtectedRoute allow={["provider"]}>
                    <ProviderDashboard />
                  </ProtectedRoute>
                }
              />
              {/* Scholar routes */}
              <Route path="/signup/scholar" element={<ScholarSignup />} />
              <Route
                path="/scholar/dashboard"
                element={
                  <ProtectedRoute allow={["scholar"]}>
                    <ScholarDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scholar/applications/:id"
                element={
                  <ProtectedRoute allow={["scholar"]}>
                    <ScholarApplication />
                  </ProtectedRoute>
                }
              />
              {/* Capital Provider routes */}
              <Route
                path="/signup/capital"
                element={<CapitalProviderSignup />}
              />
              <Route
                path="/capital/dashboard"
                element={
                  <ProtectedRoute allow={["capitalProvider"]}>
                    <CapitalProviderDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/capital/applications/:id"
                element={
                  <ProtectedRoute allow={["capitalProvider"]}>
                    <CapitalProviderApplication />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/capital/portfolio/:id"
                element={
                  <ProtectedRoute allow={["capitalProvider"]}>
                    <CapitalProviderPortfolio />
                  </ProtectedRoute>
                }
              />
              {/* Admin routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allow={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/system-oversight"
                element={
                  <ProtectedRoute allow={["admin"]}>
                    <AdminSystemOversight />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/user-management"
                element={
                  <ProtectedRoute allow={["admin"]}>
                    <AdminUserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute allow={["admin"]}>
                    <AdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/compliance"
                element={
                  <ProtectedRoute allow={["admin"]}>
                    <AdminComplianceHub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/permissions"
                element={
                  <ProtectedRoute allow={["admin"]}>
                    <AdminManageAccess />
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppStoreProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
