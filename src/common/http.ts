import axios, { AxiosRequestConfig } from 'axios';
import qs from 'querystring';

const apiHost =
  process.env.NODE_ENV === 'production'
    ? 'https://api.sharist.com'
    : 'https://api.sharist.localhost';

function setupConfig(config: AxiosRequestConfig = {}) {
  const csrf = getCookie('csrf_token');
  config.withCredentials = true;

  // Attach timeout if not existed
  if (!config.timeout) {
    config.timeout = 1000;
  }

  // Attach CSRF token if available
  if (csrf) {
    config.headers = { ...config.headers, 'x-csrf-token': csrf };
  }

  return config;
}

export function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );

  return matches ? decodeURIComponent(matches[1]) : null;
}

function resolveUrl(endpoint: string): string {
  if (endpoint.startsWith('http')) {
    return endpoint;
  }

  return new URL(endpoint, apiHost).toString();
}

export function get<T>(endpoint: string, config?: AxiosRequestConfig) {
  return axios.get<T>(resolveUrl(endpoint), setupConfig(config));
}

export function post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
  return axios.post<T>(resolveUrl(endpoint), data, setupConfig(config));
}

export function put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
  return axios.put<T>(resolveUrl(endpoint), data, setupConfig(config));
}

export function patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
  return axios.patch<T>(resolveUrl(endpoint), data, setupConfig(config));
}

export function del<T>(endpoint: string, config?: AxiosRequestConfig) {
  return axios.delete<T>(resolveUrl(endpoint), setupConfig(config));
}

/**
 * Parse query string. Can be retrieved from `location?.search` from router prop.
 *
 * @param search Search string, in the format of `?query1=value1&query2=value2`
 */
export function parseQueryString(search: string = ''): ReturnType<typeof qs.parse> {
  const searchString = search.startsWith('?') ? search.substr(1) : search;

  return qs.parse(searchString);
}
