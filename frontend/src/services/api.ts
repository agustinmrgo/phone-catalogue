import axios, { AxiosInstance } from 'axios';
import {
  PhonesResponse,
  PhoneResponse,
  PhonesStatsResponse,
  HealthResponse,
  GetPhonesData
} from '@phone-catalogue/api-types';

// Create axios client
const client: AxiosInstance = axios.create({
  baseURL:
    (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL ||
    'http://localhost:4000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper to handle API responses
const handleApiResponse = <T>(response: { data: T }): T => response.data;
const handleApiError = (error: unknown): never => {
  console.error('API Error:', error);
  throw error;
};

// Export type-safe API functions
export const phonesAPI = {
  // Health check
  healthCheck: async (): Promise<HealthResponse> => {
    try {
      const response = await client.get<HealthResponse>('/health');
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get all phones with optional filters and pagination
  getPhones: async (
    params?: GetPhonesData['query']
  ): Promise<PhonesResponse> => {
    try {
      const response = await client.get<PhonesResponse>('/phones', { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get phone by ID
  getPhoneById: async (id: number): Promise<PhoneResponse> => {
    try {
      const response = await client.get<PhoneResponse>(`/phones/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get phones statistics
  getPhonesStats: async (): Promise<PhonesStatsResponse> => {
    try {
      const response = await client.get<PhonesStatsResponse>('/phones/stats');
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export { client };
export default client;
