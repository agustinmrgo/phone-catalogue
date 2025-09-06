// Re-export shared API types
export * from '@phone-catalogue/api-types';

// Custom application types that aren't in the API
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// Component prop types
export interface PhoneCardProps {
  phone: Phone;
  onClick?: (phone: Phone) => void;
}

export interface PhoneListProps {
  className?: string;
}

// Hook types
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

// Import Phone and PaginationInfo types for use in other interfaces
import type { Phone, PaginationInfo } from '@phone-catalogue/api-types';
