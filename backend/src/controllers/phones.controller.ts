import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Response, NextFunction } from 'express';
import {
  Phone,
  PhonesResponse,
  PhoneResponse,
  PhonesStatsResponse,
  ErrorResponse,
  GetPhonesData,
  GetPhoneByIdData
} from '@phone-catalogue/api-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load phones data synchronously during module initialization
let phonesData: Phone[] = [];
try {
  const phonesPath = path.join(__dirname, '../data/phones.json');
  console.log('Loading phones data from:', phonesPath);
  const data = fs.readFileSync(phonesPath, 'utf8');
  phonesData = JSON.parse(data) as Phone[];
  console.log(`Successfully loaded ${phonesData.length} phones`);
} catch (error) {
  console.error('Error loading phones data:', (error as Error).message);
  console.error('Current working directory:', process.cwd());
  console.error('Expected path:', path.join(__dirname, '../data/phones.json'));
  // Fallback empty array
  phonesData = [];
}

type GetPhonesRequest = Request<object, PhonesResponse, object, GetPhonesData['query']>;
type GetPhonesResponse = Response<PhonesResponse | ErrorResponse>;

export const getAllPhones = async (req: GetPhonesRequest, res: GetPhonesResponse, next: NextFunction): Promise<void> => {
  try {
    console.log('getAllPhones called with query:', req.query);
    console.log('Available phones data length:', phonesData.length);
    let result: Phone[] = [...phonesData];

    // Apply filtering
    const { manufacturer, color, minPrice, maxPrice } = req.query || {};

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
      const min = parseFloat(minPrice.toString());
      if (!isNaN(min)) {
        result = result.filter(phone => phone.price >= min);
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice.toString());
      if (!isNaN(max)) {
        result = result.filter(phone => phone.price <= max);
      }
    }

    // Apply sorting
    const { sortBy = 'name', sortOrder = 'asc' } = req.query || {};
    const validSortFields: Array<keyof Phone> = ['name', 'manufacturer', 'price', 'ram'];

    if (validSortFields.includes(sortBy as keyof Phone)) {
      result.sort((a, b) => {
        const sortField = sortBy as keyof Phone;
        let aVal = a[sortField];
        let bVal = b[sortField];

        // Handle string comparisons
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase() as string & number;
          bVal = (bVal as string).toLowerCase() as string & number;
        }

        if (sortOrder === 'desc') {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      });
    }

    // Apply pagination
    const page = parseInt((req.query?.page || 1).toString()) || 1;
    const limit = parseInt((req.query?.limit || 10).toString()) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResult = result.slice(startIndex, endIndex);

    // Build response with metadata
    const response: PhonesResponse = {
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

type GetPhoneByIdRequest = Request<GetPhoneByIdData['path'], PhoneResponse | ErrorResponse>;
type GetPhoneByIdResponse = Response<PhoneResponse | ErrorResponse>;

export const getPhoneById = async (req: GetPhoneByIdRequest, res: GetPhoneByIdResponse, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const phoneId = parseInt(id.toString());

    if (isNaN(phoneId)) {
      res.status(400).json({
        success: false,
        error: 'Invalid phone ID'
      });
      return;
    }

    const phone = phonesData.find(p => p.id === phoneId);

    if (!phone) {
      res.status(404).json({
        success: false,
        error: 'Phone not found'
      });
      return;
    }

    res.json({
      success: true,
      data: phone
    });
  } catch (error) {
    next(error);
  }
};

type GetPhonesStatsRequest = Request<object, PhonesStatsResponse>;
type GetPhonesStatsResponse = Response<PhonesStatsResponse | ErrorResponse>;

export const getPhonesStats = async (req: GetPhonesStatsRequest, res: GetPhonesStatsResponse, next: NextFunction): Promise<void> => {
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
