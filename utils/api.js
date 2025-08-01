const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.token = null;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.token) {
      defaultOptions.headers.Authorization = `Bearer ${this.token}`;
    }

    const requestOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Auth methods
  async login(email, password) {
    const data = await this.makeRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async register(name, email, password) {
    const data = await this.makeRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  // Profile methods
  async getProfile() {
    return await this.makeRequest("/profile");
  }

  async updateProfile(profileData) {
    return await this.makeRequest("/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  // Problem methods
  async submitProblem(problemData) {
    return await this.makeRequest("/problems", {
      method: "POST",
      body: JSON.stringify(problemData),
    });
  }

  async getProblems() {
    return await this.makeRequest("/problems");
  }

  logout() {
    this.removeToken();
  }
}

export default new ApiService();
