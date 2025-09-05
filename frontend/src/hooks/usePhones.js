import { useState, useEffect, useCallback } from 'react';
import { phonesAPI } from '../services/api';

export const usePhones = (initialFilters = {}) => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    sortBy: 'name',
    sortOrder: 'asc',
    ...initialFilters
  });

  const fetchPhones = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await phonesAPI.getPhones({ ...filters, ...params });
      
      if (response.data.success) {
        setPhones(response.data.data);
        setPagination(response.data.pagination);
      } else {
        throw new Error('Failed to fetch phones');
      }
    } catch (err) {
      console.error('Error fetching phones:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load phones');
      setPhones([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Update filters and fetch data
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  // Navigate to specific page
  const goToPage = useCallback((page) => {
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

export const usePhoneDetails = (phoneId) => {
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhone = useCallback(async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await phonesAPI.getPhoneById(id);
      
      if (response.data.success) {
        setPhone(response.data.data);
      } else {
        throw new Error('Phone not found');
      }
    } catch (err) {
      console.error('Error fetching phone details:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load phone details');
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
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await phonesAPI.getPhonesStats();
      
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        throw new Error('Failed to fetch statistics');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load statistics');
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