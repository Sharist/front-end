import axios, { AxiosRequestConfig } from 'axios';

const host =
  process.env.NODE_ENV === 'production'
    ? 'https://api.sharist.com'
    : 'https://localhost.api.sharist.com';

function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );

  return matches ? decodeURIComponent(matches[1]) : null;
}

function setupConfig(config: AxiosRequestConfig = {}) {
  const csrf = getCookie('csrf_token');
  config.withCredentials = true;

  // Attach timeout if not existed
  if (!config.timeout) {
    config.timeout = 1000;
  }

  // Attach CSRF token if available
  if (csrf) {
    console.log(`csrf is ${csrf}`);
    config.headers = { ...config.headers, 'x-csrf-token': csrf };
  }

  return config;
}

function resolveUrl(endpoint: string): string {
  if (endpoint.startsWith('http')) {
    return endpoint;
  }

  return new URL(endpoint, host).toString();
}

export function get(endpoint: string, config?: AxiosRequestConfig) {
  return axios.get(resolveUrl(endpoint), setupConfig(config));
}

export function post(endpoint: string, data?: any, config?: AxiosRequestConfig) {
  return axios.post(resolveUrl(endpoint), data, setupConfig(config));
}

export function patch(endpoint: string, data?: any, config?: AxiosRequestConfig) {
  return axios.patch(resolveUrl(endpoint), data, setupConfig(config));
}

export function del(endpoint: string, config?: AxiosRequestConfig) {
  return axios.delete(resolveUrl(endpoint), setupConfig(config));
}
