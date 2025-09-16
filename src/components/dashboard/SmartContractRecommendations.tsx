import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  Info,
  ChevronRight,
  Star,
  Shield,
  CreditCard,
} from "lucide-react";

const SmartContractRecommendations = () => {
  return (
    <Card className="border border-golden/20 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-maroon">
              Smart Contract Recommendations
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 flex items-center">
              <Star className="h-3 w-3 mr-1 fill-purple-800" />
              AI Powered
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Contract Card */}
          <div className="relative border border-golden/20 rounded-lg p-6 bg-gradient-to-br from-white to-golden/5 hover:shadow-lg transition-all duration-300">
            {/* Top Section */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-maroon">
                    Starter Murabahah Asset Purchase
                  </h3>
                  <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    LOW RISK
                  </span>
                </div>
                <p className="text-base text-golden-dark">
                  Ideal first Islamic Economy Contract for asset acquisition
                </p>

                {/* Metrics */}
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Info className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-purple-800 font-medium">
                      85% confidence
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-blue-800 font-medium">3-5 days</span>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="p-4 bg-maroon/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CreditCard className="h-4 w-4 text-maroon" />
                      <p className="text-sm font-medium text-maroon">
                        Suggested Amount
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-maroon">$50,000</p>
                  </div>
                  <div className="p-4 bg-maroon/5 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-maroon" />
                      <p className="text-sm font-medium text-maroon">
                        Duration
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-maroon">12 months</p>
                  </div>
                </div>

                {/* Benefits and Considerations */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="text-sm font-semibold text-maroon flex items-center mb-2">
                      <Star className="h-4 w-4 mr-2 text-golden" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Simple/flowered structure and documentation",
                        "High approval rate",
                        "Fixed monthly payments",
                      ].map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-golden-dark"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-golden mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-maroon flex items-center mb-2">
                      <Info className="h-4 w-4 mr-2 text-maroon" />
                      Considerations
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Asset ownership transfer required",
                        "Market price verification needed",
                      ].map((consideration, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-golden-dark"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-maroon mr-2" />
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Template Link */}
                <div className="mt-6">
                  <Button
                    variant="link"
                    className="text-maroon hover:text-maroon/80 p-0 h-auto font-medium"
                  >
                    View Murabahah Contract Template
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white h-12 text-lg font-medium">
                Generate AI Contract
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SmartContractRecommendations;
