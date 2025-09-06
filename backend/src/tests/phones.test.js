import request from 'supertest';
import server from '../server.js';

describe('Phones API', () => {
  afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  describe('GET /api/phones', () => {
    it('should return all phones with pagination', async () => {
      const response = await request(server)
        .get('/api/phones')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
    });

    it('should filter phones by manufacturer', async () => {
      const response = await request(server)
        .get('/api/phones?manufacturer=Apple')
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.forEach(phone => {
        expect(phone.manufacturer.toLowerCase()).toContain('apple');
      });
    });

    it('should sort phones by price', async () => {
      const response = await request(server)
        .get('/api/phones?sortBy=price&sortOrder=asc')
        .expect(200);

      expect(response.body.success).toBe(true);
      const prices = response.body.data.map(phone => phone.price);
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });

    it('should paginate results correctly', async () => {
      const response = await request(server)
        .get('/api/phones?page=1&limit=3')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeLessThanOrEqual(3);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(3);
    });
  });

  describe('GET /api/phones/:id', () => {
    it('should return a specific phone by ID', async () => {
      const response = await request(server)
        .get('/api/phones/0')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(0);
      expect(response.body.data.name).toBeDefined();
    });

    it('should return 404 for non-existent phone', async () => {
      const response = await request(server)
        .get('/api/phones/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Phone not found');
    });

    it('should return 400 for invalid phone ID', async () => {
      const response = await request(server)
        .get('/api/phones/invalid')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid phone ID');
    });
  });

  describe('GET /api/phones/stats', () => {
    it('should return phones statistics', async () => {
      const response = await request(server)
        .get('/api/phones/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.total).toBeDefined();
      expect(response.body.data.manufacturers).toBeInstanceOf(Array);
      expect(response.body.data.colors).toBeInstanceOf(Array);
      expect(response.body.data.priceRange).toBeDefined();
      expect(response.body.data.priceRange.min).toBeDefined();
      expect(response.body.data.priceRange.max).toBeDefined();
    });
  });

  describe('GET /health', () => {
    it('should return health check status', async () => {
      const response = await request(server)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.message).toBe('Phone Catalogue API is running');
    });
  });
});
