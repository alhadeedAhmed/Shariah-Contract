import { Card } from "@/components/ui/card";

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
};

interface NotificationsCenterProps {
  items?: NotificationItem[];
}

const defaultItems: NotificationItem[] = [
  {
    id: "n1",
    title: "Scholar review started",
    detail: "Your contract is being reviewed for Shariah compliance.",
    time: "Just now",
  },
  {
    id: "n2",
    title: "Quote confirmed",
    detail: "Preliminary PO was created for Toyota Corolla.",
    time: "10m ago",
  },
];

export const NotificationsCenter = ({
  items = defaultItems,
}: NotificationsCenterProps) => {
  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
      <div className="flex items-center space-x-3 mb-5">
        <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
        <h3 className="text-xl font-semibold text-[#4A0404] tracking-tight">
          Notifications
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((n) => (
          <div
            key={n.id}
            className="p-4 rounded-xl border border-[#4A0404]/10 bg-white/60"
          >
            <p className="text-[#4A0404] font-medium">{n.title}</p>
            <p className="text-sm text-[#B4925F]">{n.detail}</p>
            <p className="text-xs text-[#B4925F] mt-1">{n.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NotificationsCenter;
