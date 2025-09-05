import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load phones data synchronously during module initialization
let phonesData = [];
try {
  const phonesPath = path.join(__dirname, '../data/phones.json');
  console.log('Loading phones data from:', phonesPath);
  const data = fs.readFileSync(phonesPath, 'utf8');
  phonesData = JSON.parse(data);
  console.log(`Successfully loaded ${phonesData.length} phones`);
} catch (error) {
  console.error('Error loading phones data:', error.message);
  console.error('Current working directory:', process.cwd());
  console.error('Expected path:', path.join(__dirname, '../data/phones.json'));
  // Fallback empty array
  phonesData = [];
}

export const getAllPhones = async (req, res, next) => {
  try {
    console.log('getAllPhones called with query:', req.query);
    console.log('Available phones data length:', phonesData.length);
    let result = [...phonesData];

    // Apply filtering
    const { manufacturer, color, minPrice, maxPrice } = req.query;

    if (manufacturer) {
      result = result.filter(phone =>
        phone.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
      );
    }

    if (color) {
      result = result.filter(phone =>
        phone.color.toLowerCase().includes(color.toLowerCase())
      );
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        result = result.filter(phone => phone.price >= min);
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        result = result.filter(phone => phone.price <= max);
      }
    }

    // Apply sorting
    const { sortBy = 'name', sortOrder = 'asc' } = req.query;
    const validSortFields = ['name', 'manufacturer', 'price', 'ram'];

    if (validSortFields.includes(sortBy)) {
      result.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];

        // Handle string comparisons
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (sortOrder === 'desc') {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      });
    }

    // Apply pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResult = result.slice(startIndex, endIndex);

    // Build response with metadata
    const response = {
      success: true,
      data: paginatedResult,
      pagination: {
        page,
        limit,
        total: result.length,
        totalPages: Math.ceil(result.length / limit),
        hasNext: endIndex < result.length,
        hasPrev: startIndex > 0
      }
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getPhoneById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const phoneId = parseInt(id);

    if (isNaN(phoneId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone ID'
      });
    }

    const phone = phonesData.find(p => p.id === phoneId);

    if (!phone) {
      return res.status(404).json({
        success: false,
        error: 'Phone not found'
      });
    }

    res.json({
      success: true,
      data: phone
    });
  } catch (error) {
    next(error);
  }
};

export const getPhonesStats = async (req, res, next) => {
  try {
    const manufacturers = [...new Set(phonesData.map(p => p.manufacturer))];
    const colors = [...new Set(phonesData.map(p => p.color))];
    const priceRange = {
      min: Math.min(...phonesData.map(p => p.price)),
      max: Math.max(...phonesData.map(p => p.price))
    };

    res.json({
      success: true,
      data: {
        total: phonesData.length,
        manufacturers,
        colors,
        priceRange
      }
    });
  } catch (error) {
    next(error);
  }
};
