import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Car,
  Search,
  FileText,
  Filter,
  MapPin,
  Star,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import apiService from "@/services/api";
import { useAuth } from "@/context/AuthContext";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  variant?: string;
  price: number;
  currency: string;
  specifications: {
    engine?: string;
    transmission?: string;
    fuelType?: string;
    mileage?: number;
    color?: string;
    bodyType?: string;
  };
  availability: string;
  stockQuantity: number;
  description?: string;
  features: string[];
  condition: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  serviceProvider: {
    _id: string;
    businessName: string;
    address: {
      city: string;
      country: string;
    };
  };
  views: number;
  inquiries: number;
  tags: string[];
  verificationStatus: {
    isVerified: boolean;
  };
  shariahCompliance: {
    isCompliant: boolean;
  };
}

const Marketplace = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    year: "",
    bodyType: "",
    fuelType: "",
  });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [quoteMessage, setQuoteMessage] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalVehicles: 0,
    hasNext: false,
    hasPrev: false,
  });
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  // Load vehicles on component mount
  useEffect(() => {
    loadVehicles();
  }, [pagination.currentPage, filters]);

  // Load vehicles from API
  const loadVehicles = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage.toString(),
        limit: "12",
        ...filters,
      };

      const response = await apiService.getVehicles(params);
      if (response.success) {
        setVehicles(response.data.vehicles);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error loading vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await apiService.searchVehicles({
        q: searchTerm,
        page: "1",
        limit: "12",
      });
      if (response.success) {
        setVehicles(response.data.vehicles);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error searching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle quote request
  const handleQuoteRequest = async (vehicleId: string) => {
    if (!selectedVehicle) return;

    try {
      const response = await apiService.requestQuote(vehicleId, {
        title: `Quote for ${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`,
        description:
          quoteMessage ||
          `Interested in purchasing this vehicle. Please provide a detailed quote.`,
        message: quoteMessage,
        preferredContactMethod: "email",
        pricing: {
          basePrice: selectedVehicle.price,
          currency: selectedVehicle.currency,
          totalPrice: selectedVehicle.price,
        },
        vehicleDetails: {
          make: selectedVehicle.make,
          model: selectedVehicle.model,
          year: selectedVehicle.year,
          variant: selectedVehicle.variant,
          color: selectedVehicle.specifications.color,
          mileage: selectedVehicle.specifications.mileage,
        },
        terms: {
          validityPeriod: 30,
          deliveryTime: 7,
          warranty: "Manufacturer warranty applies",
          conditions: [
            "Subject to vehicle availability",
            "Price valid for 30 days",
            "Delivery within 7 business days",
          ],
        },
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      });
      if (response.success) {
        alert("Quote request submitted successfully!");
        setQuoteMessage("");
        setSelectedVehicle(null);
      }
    } catch (error) {
      console.error("Error requesting quote:", error);
      alert("Failed to submit quote request. Please try again.");
    }
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    // Treat "all" as empty string for filtering
    const filterValue = value === "all" ? "" : value;
    setFilters((prev) => ({ ...prev, [key]: filterValue }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      make: "",
      model: "",
      minPrice: "",
      maxPrice: "",
      year: "",
      bodyType: "",
      fuelType: "",
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 shadow-lg rounded-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg border-2 border-adalah-primary flex items-center justify-center">
                  <Car className="h-5 w-5 text-adalah-primary" />
                </div>
                <h1 className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                  Marketplace
                </h1>
              </div>
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full md:w-64 border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                />
                <Button
                  onClick={handleSearch}
                  variant="outline"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 shadow-lg rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-adalah-primary mb-2">
                    Make
                  </label>
                  <Input
                    placeholder="e.g., Toyota"
                    value={filters.make}
                    onChange={(e) => handleFilterChange("make", e.target.value)}
                    className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-adalah-primary mb-2">
                    Model
                  </label>
                  <Input
                    placeholder="e.g., Camry"
                    value={filters.model}
                    onChange={(e) =>
                      handleFilterChange("model", e.target.value)
                    }
                    className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-adalah-primary mb-2">
                    Body Type
                  </label>
                  <Select
                    value={filters.bodyType || "all"}
                    onValueChange={(value) =>
                      handleFilterChange("bodyType", value)
                    }
                  >
                    <SelectTrigger className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Coupe">Coupe</SelectItem>
                      <SelectItem value="Convertible">Convertible</SelectItem>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-adalah-primary mb-2">
                    Fuel Type
                  </label>
                  <Select
                    value={filters.fuelType || "all"}
                    onValueChange={(value) =>
                      handleFilterChange("fuelType", value)
                    }
                  >
                    <SelectTrigger className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="CNG">CNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-adalah-primary mb-2">
                    Min Price
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-adalah-primary mb-2">
                    Max Price
                  </label>
                  <Input
                    type="number"
                    placeholder="1000000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-adalah-primary mb-2">
                    Year
                  </label>
                  <Input
                    type="number"
                    placeholder="2023"
                    value={filters.year}
                    onChange={(e) => handleFilterChange("year", e.target.value)}
                    className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-adalah-primary"></div>
          </div>
        )}

        {/* Vehicle Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 shadow-md hover:shadow-xl transition-all rounded-2xl flex flex-col justify-between h-full">
                  {/* Vehicle Image */}
                  {vehicle.images && vehicle.images.length > 0 && (
                    <div className="mb-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Car className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {/* Vehicle Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10">
                      <Car className="h-6 w-6 text-adalah-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-adalah-primary font-semibold text-lg font-inter-tight">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                        {vehicle.variant && ` ${vehicle.variant}`}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-adalah-golden">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {vehicle.serviceProvider.address.city},{" "}
                          {vehicle.serviceProvider.address.country}
                        </span>
                      </div>
                      <div className="text-xs text-adalah-primary/60 mt-1">
                        Dealer: {vehicle.serviceProvider.businessName}
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-adalah-primary/70">Body Type:</span>
                      <span className="text-adalah-primary">
                        {vehicle.specifications.bodyType || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-adalah-primary/70">Fuel Type:</span>
                      <span className="text-adalah-primary">
                        {vehicle.specifications.fuelType || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-adalah-primary/70">
                        Transmission:
                      </span>
                      <span className="text-adalah-primary">
                        {vehicle.specifications.transmission || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-adalah-primary/70">Mileage:</span>
                      <span className="text-adalah-primary">
                        {vehicle.specifications.mileage?.toLocaleString() ||
                          "0"}{" "}
                        km
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                      {vehicle.currency} {vehicle.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-adalah-golden">
                      {vehicle.condition === "new"
                        ? "New Vehicle"
                        : vehicle.condition === "used"
                        ? "Used Vehicle"
                        : "Certified Pre-Owned"}
                    </p>
                  </div>

                  {/* Verification Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vehicle.verificationStatus.isVerified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    )}
                    {vehicle.shariahCompliance.isCompliant && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Shariah Compliant
                      </span>
                    )}
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      Stock: {vehicle.stockQuantity}
                    </span>
                  </div>

                  {/* Features */}
                  {vehicle.features && vehicle.features.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-adalah-primary mb-2">
                        Key Features:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {vehicle.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-adalah-golden/10 text-adalah-golden text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {vehicle.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{vehicle.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-3 mt-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-b border-adalah-dark text-adalah-dark"
                          onClick={() => setSelectedVehicle(vehicle)}
                        >
                          <FileText className="h-4 w-4" /> Get Quote
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[520px] rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-adalah-primary font-inter-tight">
                            Request Quote
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-adalah-primary font-medium font-inter-tight">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                              {vehicle.variant && ` ${vehicle.variant}`}
                            </p>
                            <p className="text-adalah-golden">
                              Price: {vehicle.currency}{" "}
                              {vehicle.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-adalah-primary/70">
                              Dealer: {vehicle.serviceProvider.businessName}
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-adalah-primary mb-2">
                              Message (Optional)
                            </label>
                            <Textarea
                              placeholder="Add any specific requirements or questions..."
                              value={quoteMessage}
                              onChange={(e) => setQuoteMessage(e.target.value)}
                              className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                            />
                          </div>
                          <Button
                            onClick={() => handleQuoteRequest(vehicle._id)}
                            className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold w-full shadow-md hover:shadow-lg"
                          >
                            Submit Quote Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Link
                      to={`/murabahah/new?vehicle=${vehicle._id}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-gradient-to-r from-adalah-golden to-adalah-dark text-white shadow-md hover:shadow-lg">
                        Start Murabahah
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && vehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-adalah-primary/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-adalah-primary mb-2">
              No vehicles found
            </h3>
            <p className="text-adalah-primary/70">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage - 1,
                }))
              }
              disabled={!pagination.hasPrev}
              variant="outline"
              className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-adalah-primary">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <Button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  currentPage: prev.currentPage + 1,
                }))
              }
              disabled={!pagination.hasNext}
              variant="outline"
              className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
