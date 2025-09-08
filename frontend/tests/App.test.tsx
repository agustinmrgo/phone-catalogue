import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import * as api from '../src/services/api';

// Mock the API
vi.mock('../src/services/api');

const mockPhonesAPI = vi.mocked(api.phonesAPI);

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock successful API responses
    mockPhonesAPI.getPhones.mockResolvedValue({
      success: true,
      data: [
        {
          id: 1,
          name: 'Test Phone',
          manufacturer: 'Test Brand',
          price: 299,
          color: 'black',
          screen: '6.1 inch',
          processor: 'Test Chip',
          ram: 4,
          imageFileName: 'test.png',
          description: 'A test phone'
        }
      ],
      pagination: {
        page: 1,
        limit: 12,
        total: 1,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      }
    });

    mockPhonesAPI.getPhonesStats.mockResolvedValue({
      success: true,
      data: {
        total: 1,
        manufacturers: ['Test Brand'],
        colors: ['black'],
        priceRange: { min: 299, max: 299 }
      }
    });
  });

  it('renders the app without crashing', async () => {
    render(<App />);

    expect(screen.getByText('Phone Catalogue')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    render(<App />);

    expect(screen.getByText('Loading phones...')).toBeInTheDocument();
  });
});
