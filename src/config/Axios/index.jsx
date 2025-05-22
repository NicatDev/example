import { message } from "antd";
import axios from "axios";

import API from "@/api";
import { notify } from "../../components/utils/notification";
import { i18n } from "../Languages";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["Accept-Language"] =
  localStorage.getItem("language") || import.meta.env.VITE_LANGUAGE;
axios.defaults.timeout = 60 * 1000;
let isRefreshing = false;
let failedRequests = [];

axios.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }
    return req;
  },
  (err) => {
    console.error("Request interceptor error:", err);
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 400) {
      notify.error({ message: i18n.t("CommonContent.400") });
    } else if (error.response?.status === 500) {
      notify.error({ message: i18n.t("CommonContent.500") });
    } else if (error.response?.status === 404) {
      notify.error({ message: i18n.t("CommonContent.404") });
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh_token = sessionStorage.getItem("refreshToken");
      const token = localStorage.getItem("accessToken");

      return new Promise((resolve, reject) => {
        API.Auth.refreshToken({ token, refresh_token })
          .then(({ data }) => {
            const {
              access_token: newAccessToken,
              refresh_token: newRefreshToken,
            } = data;

            localStorage.setItem("accessToken", newAccessToken);
            sessionStorage.setItem("refreshToken", newRefreshToken);

            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            resolve(axios(originalRequest));
          })
          .catch((err) => {
            localStorage.clear();
            window.location.href = "/login";
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default axios;
