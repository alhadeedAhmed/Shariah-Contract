import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NotificationsCenter from "@/components/notifications/NotificationsCenter";

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10">
        <NotificationsCenter />
      </div>
    </div>
  );
};

export default Notifications;
