import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI, //pk proccess.env
      withCredentials: true,  //clave para que se pida y se pase los datos en cada petición al server nuestra cookie(la del nav del user)
    });
  }

  whoami() {
    return this.apiClient.get("/whoami");
  }

  login(body) {
    return this.apiClient.post("/login", body);
  }

  signup(body) {
    return this.apiClient.post("/signup", body);
  }

  logout() {
    return this.apiClient.get("/logout");
  }
}

const apiClient = new ApiClient();
export default apiClient;
