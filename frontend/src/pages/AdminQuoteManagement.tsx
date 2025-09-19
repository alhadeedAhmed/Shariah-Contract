import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Car,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import apiService from "@/services/api";

interface Quote {
  _id: string;
  quoteNumber: string;
  title: string;
  description: string;
  status: string;
  customer: {
    fullName: string;
    email: string;
    phone?: string;
  };
  serviceProvider: {
    businessName: string;
    email: string;
    phone?: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    price: number;
    currency: string;
  };
  vehicleDetails: {
    make: string;
    model: string;
    year: number;
    variant?: string;
    color?: string;
    mileage?: number;
  };
  pricing: {
    basePrice: number;
    totalPrice: number;
    currency: string;
  };
  response?: {
    status: string;
    message: string;
    pricing?: {
      totalPrice: number;
      currency: string;
      paymentTerms?: string;
    };
    terms?: string;
    respondedAt: string;
  };
  messages: Array<{
    sender: string;
    message: string;
    timestamp: string;
  }>;
  createdAt: string;
  expiresAt: string;
}

const AdminQuoteManagement = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [responseDialog, setResponseDialog] = useState(false);
  const [responseData, setResponseData] = useState({
    status: "responded",
    message: "",
    pricing: {
      totalPrice: 0,
      currency: "USD",
      paymentTerms: "Standard terms apply",
    },
    terms: "",
  });
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalQuotes: 0,
  });

  useEffect(() => {
    loadQuotes();
  }, [pagination.currentPage, filters]);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: "10",
        ...filters,
      });

      const response = await apiService.get(
        `/api/marketplace/admin/quotes?${params}`
      );
      if (response.success) {
        setQuotes(response.data.quotes);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error loading quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRespondToQuote = async () => {
    if (!selectedQuote) return;

    try {
      const response = await apiService.post(
        `/api/marketplace/admin/quotes/${selectedQuote._id}/respond`,
        responseData
      );

      if (response.success) {
        alert("Quote response sent successfully!");
        setResponseDialog(false);
        setSelectedQuote(null);
        setResponseData({
          status: "responded",
          message: "",
          pricing: {
            totalPrice: 0,
            currency: "USD",
            paymentTerms: "Standard terms apply",
          },
          terms: "",
        });
        loadQuotes();
      }
    } catch (error) {
      console.error("Error responding to quote:", error);
      alert("Failed to send response. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: "bg-gray-100 text-gray-800", icon: Clock },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      responded: { color: "bg-blue-100 text-blue-800", icon: MessageSquare },
      accepted: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
      expired: { color: "bg-gray-100 text-gray-600", icon: Clock },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 shadow-lg rounded-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg border-2 border-adalah-primary flex items-center justify-center">
                  <FileText className="h-5 w-5 text-adalah-primary" />
                </div>
                <h1 className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                  Quote Management
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search quotes..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="w-64 border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                />
                <Select
                  value={filters.status}
                  onValueChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <SelectTrigger className="w-40 border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quotes Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 shadow-lg rounded-2xl">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-adalah-primary"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quote #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote) => (
                      <TableRow key={quote._id}>
                        <TableCell className="font-medium">
                          {quote.quoteNumber || `#${quote._id.slice(-8)}`}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {quote.customer.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {quote.customer.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-adalah-primary" />
                            <div>
                              <div className="font-medium">
                                {quote.vehicleDetails.year}{" "}
                                {quote.vehicleDetails.make}{" "}
                                {quote.vehicleDetails.model}
                              </div>
                              <div className="text-sm text-gray-500">
                                {quote.vehicleDetails.variant || "Standard"}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-adalah-golden" />
                            <span className="font-medium">
                              {quote.pricing.currency}{" "}
                              {quote.pricing.totalPrice.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(quote.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">
                              {formatDate(quote.createdAt)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedQuote(quote)}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-adalah-primary font-inter-tight">
                                    Quote Details -{" "}
                                    {quote.quoteNumber ||
                                      `#${quote._id.slice(-8)}`}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-6">
                                  {/* Customer Info */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <h3 className="font-medium text-adalah-primary mb-2">
                                        Customer Information
                                      </h3>
                                      <div className="space-y-1 text-sm">
                                        <div className="flex items-center space-x-2">
                                          <span className="font-medium">
                                            Name:
                                          </span>
                                          <span>{quote.customer.fullName}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Mail className="h-4 w-4" />
                                          <span>{quote.customer.email}</span>
                                        </div>
                                        {quote.customer.phone && (
                                          <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4" />
                                            <span>{quote.customer.phone}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                      <h3 className="font-medium text-adalah-primary mb-2">
                                        Vehicle Details
                                      </h3>
                                      <div className="space-y-1 text-sm">
                                        <div>
                                          <span className="font-medium">
                                            Vehicle:
                                          </span>{" "}
                                          {quote.vehicleDetails.year}{" "}
                                          {quote.vehicleDetails.make}{" "}
                                          {quote.vehicleDetails.model}
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Variant:
                                          </span>{" "}
                                          {quote.vehicleDetails.variant ||
                                            "N/A"}
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Color:
                                          </span>{" "}
                                          {quote.vehicleDetails.color || "N/A"}
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Mileage:
                                          </span>{" "}
                                          {quote.vehicleDetails.mileage?.toLocaleString() ||
                                            "N/A"}{" "}
                                          km
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Quote Details */}
                                  <div className="p-4 bg-blue-50 rounded-lg">
                                    <h3 className="font-medium text-adalah-primary mb-2">
                                      Quote Information
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <span className="font-medium">
                                          Title:
                                        </span>{" "}
                                        {quote.title}
                                      </div>
                                      <div>
                                        <span className="font-medium">
                                          Description:
                                        </span>{" "}
                                        {quote.description}
                                      </div>
                                      <div>
                                        <span className="font-medium">
                                          Base Price:
                                        </span>{" "}
                                        {quote.pricing.currency}{" "}
                                        {quote.pricing.basePrice.toLocaleString()}
                                      </div>
                                      <div>
                                        <span className="font-medium">
                                          Expires:
                                        </span>{" "}
                                        {formatDate(quote.expiresAt)}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Messages */}
                                  {quote.messages &&
                                    quote.messages.length > 0 && (
                                      <div className="space-y-3">
                                        <h3 className="font-medium text-adalah-primary">
                                          Conversation
                                        </h3>
                                        {quote.messages.map(
                                          (message, index) => (
                                            <div
                                              key={index}
                                              className={`p-3 rounded-lg ${
                                                message.sender === "customer"
                                                  ? "bg-blue-50 ml-4"
                                                  : "bg-green-50 mr-4"
                                              }`}
                                            >
                                              <div className="flex justify-between items-start mb-1">
                                                <span className="text-sm font-medium">
                                                  {message.sender === "customer"
                                                    ? "Customer"
                                                    : "Service Provider"}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                  {formatDate(
                                                    message.timestamp
                                                  )}
                                                </span>
                                              </div>
                                              <p className="text-sm">
                                                {message.message}
                                              </p>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}

                                  {/* Response Section */}
                                  {quote.status === "pending" ||
                                  quote.status === "draft" ? (
                                    <div className="p-4 bg-yellow-50 rounded-lg">
                                      <h3 className="font-medium text-adalah-primary mb-3">
                                        Respond to Quote
                                      </h3>
                                      <div className="space-y-4">
                                        <div>
                                          <label className="block text-sm font-medium mb-2">
                                            Response Message
                                          </label>
                                          <Textarea
                                            placeholder="Enter your response message..."
                                            value={responseData.message}
                                            onChange={(e) =>
                                              setResponseData({
                                                ...responseData,
                                                message: e.target.value,
                                              })
                                            }
                                            className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                                          />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                            <label className="block text-sm font-medium mb-2">
                                              Final Price
                                            </label>
                                            <Input
                                              type="number"
                                              placeholder="Enter final price"
                                              value={
                                                responseData.pricing.totalPrice
                                              }
                                              onChange={(e) =>
                                                setResponseData({
                                                  ...responseData,
                                                  pricing: {
                                                    ...responseData.pricing,
                                                    totalPrice:
                                                      parseFloat(
                                                        e.target.value
                                                      ) || 0,
                                                  },
                                                })
                                              }
                                              className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium mb-2">
                                              Payment Terms
                                            </label>
                                            <Input
                                              placeholder="e.g., 30 days"
                                              value={
                                                responseData.pricing
                                                  .paymentTerms
                                              }
                                              onChange={(e) =>
                                                setResponseData({
                                                  ...responseData,
                                                  pricing: {
                                                    ...responseData.pricing,
                                                    paymentTerms:
                                                      e.target.value,
                                                  },
                                                })
                                              }
                                              className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium mb-2">
                                            Terms & Conditions
                                          </label>
                                          <Textarea
                                            placeholder="Enter terms and conditions..."
                                            value={responseData.terms}
                                            onChange={(e) =>
                                              setResponseData({
                                                ...responseData,
                                                terms: e.target.value,
                                              })
                                            }
                                            className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                                          />
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                          <Button
                                            onClick={() => {
                                              setResponseData({
                                                status: "rejected",
                                                message: responseData.message,
                                                pricing: responseData.pricing,
                                                terms: responseData.terms,
                                              });
                                              handleRespondToQuote();
                                            }}
                                            variant="outline"
                                            className="text-red-600 border-red-600 hover:bg-red-50"
                                          >
                                            Reject Quote
                                          </Button>
                                          <Button
                                            onClick={handleRespondToQuote}
                                            className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
                                          >
                                            Send Response
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : quote.response ? (
                                    <div className="p-4 bg-green-50 rounded-lg">
                                      <h3 className="font-medium text-adalah-primary mb-2">
                                        Response Sent
                                      </h3>
                                      <div className="space-y-2 text-sm">
                                        <div>
                                          <span className="font-medium">
                                            Status:
                                          </span>{" "}
                                          {quote.response.status}
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Message:
                                          </span>{" "}
                                          {quote.response.message}
                                        </div>
                                        {quote.response.pricing && (
                                          <div>
                                            <span className="font-medium">
                                              Final Price:
                                            </span>{" "}
                                            {quote.response.pricing.currency}{" "}
                                            {quote.response.pricing.totalPrice.toLocaleString()}
                                          </div>
                                        )}
                                        <div>
                                          <span className="font-medium">
                                            Responded At:
                                          </span>{" "}
                                          {formatDate(
                                            quote.response.respondedAt
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-6">
                <Button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: prev.currentPage - 1,
                    }))
                  }
                  disabled={pagination.currentPage === 1}
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
                  disabled={pagination.currentPage === pagination.totalPages}
                  variant="outline"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  Next
                </Button>
              </div>
            )}

            {/* No Results */}
            {!loading && quotes.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-adalah-primary/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-adalah-primary mb-2">
                  No quotes found
                </h3>
                <p className="text-adalah-primary/70">
                  No quotes match your current filters.
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminQuoteManagement;
