// Import Phone and PaginationInfo types for use in other interfaces
import type { Phone, PaginationInfo } from '@phone-catalogue/api-types';

export * from '@phone-catalogue/api-types';

export interface UsePhoneFilters {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'manufacturer' | 'price' | 'ram';
  sortOrder?: 'asc' | 'desc';
  manufacturer?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface UsePhonesReturn {
  phones: Phone[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo | null;
  filters: UsePhoneFilters;
  updateFilters: (newFilters: Partial<UsePhoneFilters>) => void;
  goToPage: (page: number) => void;
  resetFilters: () => void;
  refetch: () => Promise<void>;
}
