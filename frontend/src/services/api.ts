import {
  getHealth,
  getPhones,
  getPhoneById,
  getPhonesStats
} from '@phone-catalogue/api-types/generated/sdk.gen';
import type { GetPhonesData } from '@phone-catalogue/api-types';

export const phonesAPI = {
  healthCheck: async () => {
    const response = await getHealth();
    return response.data;
  },

  getPhones: async (params?: GetPhonesData['query']) => {
    const response = await getPhones({ query: params });
    return response.data;
  },

  getPhoneById: async (id: number) => {
    const response = await getPhoneById({ path: { id } });
    return response.data;
  },

  getPhonesStats: async () => {
    const response = await getPhonesStats();
    return response.data;
  }
};

export default phonesAPI;
