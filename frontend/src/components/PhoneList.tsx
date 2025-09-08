import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { usePhones, usePhonesStats } from '../hooks/usePhones';
import type { Phone, UsePhoneFilters } from '@/types';
import Loader from './Loader';
import PhoneCard from './PhoneCard';
import PhoneDetail from './PhoneDetail';

const PhoneList: FC = () => {
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const {
    phones,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    goToPage,
    resetFilters
  } = usePhones();

  const { stats } = usePhonesStats();

  const handleFilterChange = (
    filterName: keyof UsePhoneFilters,
    value: string
  ): void => {
    const parsedValue =
      filterName === 'minPrice' || filterName === 'maxPrice'
        ? value === ''
          ? undefined
          : parseFloat(value)
        : value === ''
          ? undefined
          : value;

    updateFilters({ [filterName]: parsedValue });
  };

  const handleSort = (sortBy: UsePhoneFilters['sortBy']): void => {
    const sortOrder =
      filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    updateFilters({ sortBy, sortOrder });
  };

  const clearFilters = (): void => {
    resetFilters();
    setShowFilters(false);
  };

  if (selectedPhone) {
    return (
      <PhoneDetail
        phone={selectedPhone}
        onBack={() => setSelectedPhone(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Phone Catalogue
            </h1>
            <p className="mt-2 text-gray-600">
              Discover the latest smartphones from top brands
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary text-sm"
            >
              <span className="mr-2">🔍</span>
              Filters
            </button>

            {/* Quick sort buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => handleSort('name')}
                className={`px-3 py-1 text-sm rounded-md border ${
                  filters.sortBy === 'name'
                    ? 'bg-primary-100 border-primary-300 text-primary-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Name{' '}
                {filters.sortBy === 'name' &&
                  (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSort('price')}
                className={`px-3 py-1 text-sm rounded-md border ${
                  filters.sortBy === 'price'
                    ? 'bg-primary-100 border-primary-300 text-primary-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Price{' '}
                {filters.sortBy === 'price' &&
                  (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>

            {/* Active filters indicator */}
            {(filters.manufacturer ||
              filters.color ||
              filters.minPrice ||
              filters.maxPrice) && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="text-sm text-gray-600">
            {pagination?.total} phone{pagination?.total !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 bg-white rounded-lg border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Manufacturer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manufacturer
                </label>
                <select
                  value={filters.manufacturer || ''}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChange('manufacturer', e.target.value)
                  }
                  className="input-field"
                >
                  <option value="">All Manufacturers</option>
                  {stats?.manufacturers?.map(manufacturer => (
                    <option key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <select
                  value={filters.color || ''}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChange('color', e.target.value)
                  }
                  className="input-field"
                >
                  <option value="">All Colors</option>
                  {stats?.colors?.map(color => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price ($)
                </label>
                <input
                  type="number"
                  value={filters.minPrice || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('minPrice', e.target.value)
                  }
                  placeholder={`Min: $${stats?.priceRange?.min || 0}`}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price ($)
                </label>
                <input
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('maxPrice', e.target.value)
                  }
                  placeholder={`Max: $${stats?.priceRange?.max || 999}`}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-400 text-xl mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <Loader size="lg" text="Loading phones..." />
        ) : phones.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📱</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No phones found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        ) : (
          <>
            {/* Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {phones.map(phone => (
                <PhoneCard
                  key={phone.id}
                  phone={phone}
                  onClick={() => setSelectedPhone(phone)}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => goToPage(pagination.page - 1)}
                    disabled={!pagination.hasPrev}
                    className={`px-3 py-2 text-sm border rounded-md ${
                      pagination.hasPrev
                        ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      const page =
                        Math.max(
                          1,
                          Math.min(
                            pagination.totalPages - 4,
                            pagination.page - 2
                          )
                        ) + i;
                      if (page <= pagination.totalPages) {
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-2 text-sm border rounded-md ${
                              page === pagination.page
                                ? 'bg-primary-500 border-primary-500 text-white'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      return null;
                    }
                  )}

                  <button
                    onClick={() => goToPage(pagination.page + 1)}
                    disabled={!pagination.hasNext}
                    className={`px-3 py-2 text-sm border rounded-md ${
                      pagination.hasNext
                        ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneList;
