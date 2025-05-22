import axios from "axios";

const baseUrl = "http://api.dev.mtte.erp-intel.local/account/api";

const token = localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

const Index = {
  list: () => api.get(`${baseUrl}/Right`).then((res) => res),
};

export default Index;
