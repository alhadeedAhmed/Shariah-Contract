const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Individual User Authentication
  async individualSignup(userData) {
    return this.request("/auth/individual/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async individualSignin(credentials) {
    return this.request("/auth/individual/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  // Capital Provider Authentication
  async capitalProviderSignup(userData) {
    return this.request("/auth/capital-provider/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async capitalProviderSignin(credentials) {
    return this.request("/auth/capital-provider/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  // Common Authentication
  async refreshToken(refreshToken) {
    return this.request("/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  async signout() {
    return this.request("/auth/signout", {
      method: "POST",
    });
  }

  async getProfile() {
    return this.request("/auth/profile");
  }

  async verifyEmail(token) {
    return this.request("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  }

  // Health check
  async healthCheck() {
    return fetch("http://localhost:5000/health").then((res) => res.json());
  }

  // Marketplace API
  async getVehicles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/marketplace/vehicles?${queryString}`);
  }

  async getVehicleById(id) {
    return this.request(`/marketplace/vehicles/${id}`);
  }

  async searchVehicles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/marketplace/vehicles/search?${queryString}`);
  }

  async getServiceProviders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/marketplace/service-providers?${queryString}`);
  }

  async requestQuote(vehicleId, data) {
    return this.request(`/marketplace/vehicles/${vehicleId}/quotes`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getCustomerQuotes(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/marketplace/quotes?${queryString}`);
  }

  async getQuoteById(id) {
    return this.request(`/marketplace/quotes/${id}`);
  }

  async acceptQuote(id, data) {
    return this.request(`/marketplace/quotes/${id}/accept`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async rejectQuote(id, data) {
    return this.request(`/marketplace/quotes/${id}/reject`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async addQuoteMessage(id, data) {
    return this.request(`/marketplace/quotes/${id}/messages`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Contracts API
  async createMurabahahContract(data) {
    return this.request("/contracts/murabahah", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async runAIAnalysis(contractId) {
    return this.request(`/contracts/murabahah/${contractId}/ai-analysis`, {
      method: "POST",
    });
  }

  async generateContract(contractId) {
    return this.request(`/contracts/murabahah/${contractId}/generate`, {
      method: "POST",
    });
  }

  async submitContractForReview(contractId) {
    return this.request(`/contracts/murabahah/${contractId}/submit`, {
      method: "POST",
    });
  }

  async getCustomerContracts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/contracts/murabahah?${queryString}`);
  }

  async getContractById(id) {
    return this.request(`/contracts/murabahah/${id}`);
  }

  // Phase 4: Approval Process APIs
  async getContractApprovalStatus(contractId) {
    return this.request(`/contracts/murabahah/${contractId}/approval-status`);
  }

  async acceptContractTerms(contractId) {
    return this.request(`/contracts/murabahah/${contractId}/accept-terms`, {
      method: "POST",
    });
  }

  async initiateContractNegotiation(contractId, negotiationData) {
    return this.request(`/contracts/murabahah/${contractId}/negotiate`, {
      method: "POST",
      body: JSON.stringify(negotiationData),
    });
  }

  // Approval workflow APIs (for testing/demo purposes)
  async approveContractByScholar(contractId, scholarData) {
    return this.request(`/contracts/murabahah/${contractId}/scholar-approve`, {
      method: "POST",
      body: JSON.stringify(scholarData),
    });
  }

  async approveContractByCapitalProvider(contractId, capitalProviderData) {
    return this.request(
      `/contracts/murabahah/${contractId}/capital-provider-approve`,
      {
        method: "POST",
        body: JSON.stringify(capitalProviderData),
      }
    );
  }

  async getCustomerApplications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/contracts/applications?${queryString}`);
  }

  async getApplicationById(id) {
    return this.request(`/contracts/applications/${id}`);
  }

  // Quote response methods
  async getServiceProviderQuotes(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/marketplace/service-provider/quotes?${queryString}`);
  }

  async respondToQuote(quoteId, responseData) {
    return this.request(`/marketplace/quotes/${quoteId}/respond`, {
      method: "POST",
      body: JSON.stringify(responseData),
    });
  }

  // Contract AI Analysis
  async runAIAnalysis(contractId) {
    return this.request(`/contracts/murabahah/${contractId}/ai-analysis`, {
      method: "POST",
    });
  }
}

export default new ApiService();
