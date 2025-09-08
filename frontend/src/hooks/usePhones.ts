import { useState, useEffect, useCallback } from 'react';
import { phonesAPI } from '../services/api';
import type { Phone, PaginationInfo, PhonesStats, GetPhonesData } from '@phone-catalogue/api-types';

// Define local aliases to avoid relying on the '@/types' barrel
export type UsePhoneFilters = NonNullable<GetPhonesData['query']>;

export type UsePhonesReturn = {
  phones: Phone[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo | null;
  filters: UsePhoneFilters;
  updateFilters: (newFilters: Partial<UsePhoneFilters>) => void;
  goToPage: (page: number) => void;
  resetFilters: () => void;
  refetch: () => Promise<void>;
};

export const usePhones = (
  initialFilters: UsePhoneFilters = {}
): UsePhonesReturn => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [filters, setFilters] = useState<UsePhoneFilters>({
    page: 1,
    limit: 12,
    sortBy: 'name',
    sortOrder: 'asc',
    ...initialFilters
  });

  const fetchPhones = useCallback(
    async (params: Partial<UsePhoneFilters> = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await phonesAPI.getPhones({
          ...filters,
          ...params
        } as GetPhonesData['query']);

        if (response) {
          setPhones(response.data || []);
          setPagination(response.pagination || null);
        } else {
          setPhones([]);
          setPagination(null);
        }
      } catch (err) {
        console.error('Error fetching phones:', err);
        setError(err instanceof Error ? err.message : 'Failed to load phones');
        setPhones([]);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // Update filters and fetch data
  const updateFilters = useCallback((newFilters: Partial<UsePhoneFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  // Navigate to specific page
  const goToPage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 12,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  }, []);

  // Effect to fetch phones when filters change
  useEffect(() => {
    fetchPhones();
  }, [fetchPhones]);

  return {
    phones,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    goToPage,
    resetFilters,
    refetch: fetchPhones
  };
};

export const usePhoneDetails = (phoneId?: number) => {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhone = useCallback(async (id?: number) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await phonesAPI.getPhoneById(id);

      if (response) {
        setPhone(response.data || null);
      } else {
        setPhone(null);
      }
    } catch (err) {
      console.error('Error fetching phone details:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load phone details'
      );
      setPhone(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhone(phoneId);
  }, [phoneId, fetchPhone]);

  return {
    phone,
    loading,
    error,
    refetch: () => fetchPhone(phoneId)
  };
};

export const usePhonesStats = () => {
  const [stats, setStats] = useState<PhonesStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await phonesAPI.getPhonesStats();

      if (response) {
        setStats(response.data || null);
      } else {
        setStats(null);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load statistics'
      );
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};
