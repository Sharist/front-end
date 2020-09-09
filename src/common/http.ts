import axios, { AxiosRequestConfig } from "axios";
import { resolve } from "url";

const host = process.env.NODE_ENV === "production"
  ? "http://api.sharist.com"
  : "http://localhost:3000";

function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );

  return matches ? decodeURIComponent(matches[1]) : null;
}

function attachAuth(config?: AxiosRequestConfig) {
  const csrf = getCookie("csrf_token");
  const configHeaders = config?.headers;

  if (csrf) {
    const headers = { ...configHeaders, "x-csrf-token": csrf };

    return { ...config, headers };
  }

  return config;
}

export function get(endpoint: string, config?: AxiosRequestConfig) {
  return axios.get(resolve(host, endpoint), attachAuth(config));
}

export function post(
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig,
) {
  return axios.post(resolve(host, endpoint), data, attachAuth(config));
}

export function patch(
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig,
) {
  return axios.patch(resolve(host, endpoint), data, attachAuth(config));
}

export function del(endpoint: string, config?: AxiosRequestConfig) {
  return axios.delete(resolve(host, endpoint), attachAuth(config));
}
