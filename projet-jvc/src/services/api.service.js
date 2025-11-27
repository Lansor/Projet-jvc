export class ApiService {
  constructor(baseUrl, token = "") {
    this.baseUrl = baseUrl?.replace(/\/$/, "") || "";
    this.token = token;
  }

  setToken(token) {
    this.token = token;
  }

  async request(method, path, body) {
    const url = `${this.baseUrl}${path}`;

    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return {
          error: true,
          status: res.status,
          message: data?.message || "Erreur lors de l'appel API",
          data,
        };
      }

      return { error: false, status: res.status, data };
    } catch (err) {
      console.error("Erreur réseau API", err);
      return {
        error: true,
        status: 0,
        message: "Erreur réseau",
        data: null,
      };
    }
  }

  get(path) {
    return this.request("GET", path);
  }

  post(path, body) {
    return this.request("POST", path, body);
  }

  put(path, body) {
    return this.request("PUT", path, body);
  }

  delete(path) {
    return this.request("DELETE", path);
  }
}
