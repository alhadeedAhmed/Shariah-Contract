import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "Tokenized Contracts", value: "0", type: "Active" },
  { label: "Processing Status", value: "2", type: "Pending" },
  { label: "Vault Accounts", value: "5", type: "Connected" },
];

const TokenizationEngine = () => {
  return (
    <Card className="border border-adalah-golden/20">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Adalah Tokenization Engine Console
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">Engine Status</p>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {stat.value}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                      stat.type === "Active"
                        ? "bg-adalah-golden/20 text-adalah-primary"
                        : stat.type === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {stat.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6">
          Access Tokenization Console
        </Button>
      </div>
    </Card>
  );
};

export default TokenizationEngine;
