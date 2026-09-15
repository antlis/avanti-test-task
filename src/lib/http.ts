import axios from 'axios'

/**
 * Shared Axios instance. Point VITE_API_BASE at the Laravel API to swap the
 * bundled mock JSON for the real REST backend (Sanctum-ready: withCredentials).
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
