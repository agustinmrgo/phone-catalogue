import { useState, useEffect, useCallback } from 'react';
import { phonesAPI } from '../services/api';
import type {
  Phone,
  PaginationInfo,
  UsePhoneFilters,
  UsePhonesReturn,
  PhonesStats
} from '../types';

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
        const response = await phonesAPI.getPhones({ ...filters, ...params });

        if (response && response.success) {
          setPhones(response.data);
          setPagination(response.pagination);
        } else {
          throw new Error('Failed to fetch phones');
        }
      } catch (err) {
        console.error('Error fetching phones:', err);
        if (err instanceof Error) {
          setError(err.message || 'Failed to load phones');
        }
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

      if (response && response.success) {
        setPhone(response.data);
      } else {
        throw new Error('Phone not found');
      }
    } catch (err) {
      console.error('Error fetching phone details:', err);
      if (err instanceof Error) {
        setError(err.message || 'Failed to load phone details');
      }
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

      if (response && response.success) {
        setStats(response.data);
      } else {
        throw new Error('Failed to fetch statistics');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      if (err instanceof Error) {
        setError(err.message || 'Failed to load statistics');
      }
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
