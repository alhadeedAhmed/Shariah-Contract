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
}

export default new ApiService();
