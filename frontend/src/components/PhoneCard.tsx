import { useState } from 'react';
import type { FC } from 'react';
import type { Phone } from '@phone-catalogue/api-types';

interface PhoneCardProps {
  phone: Phone;
  onClick: () => void;
}

const PhoneCard: FC<PhoneCardProps> = ({ phone, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = (): void => {
    setImageError(true);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      className="card cursor-pointer transform hover:scale-105 transition-all duration-200 animate-fade-in"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {!imageError ? (
          <img
            src={`/images/phones/${phone.imageFileName}`}
            alt={`${phone.name} - ${phone.manufacturer}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <p className="text-sm text-gray-500">Image not available</p>
            </div>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded-md text-sm font-semibold shadow-lg">
          {formatPrice(phone.price)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">
              {phone.name}
            </h3>
            <p className="text-primary-600 text-sm font-medium">
              {phone.manufacturer}
            </p>
          </div>
        </div>

        {/* Specs */}
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">📱</span>
            <span>{phone.screen}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">⚡</span>
            <span>{phone.processor}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">💾</span>
            <span>{phone.ram}GB RAM</span>
          </div>
        </div>

        {/* Color indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2"
              style={{
                backgroundColor:
                  phone.color === 'black'
                    ? '#000000'
                    : phone.color === 'white'
                      ? '#FFFFFF'
                      : phone.color === 'blue'
                        ? '#3B82F6'
                        : phone.color === 'grey'
                          ? '#6B7280'
                          : phone.color === 'gray'
                            ? '#6B7280'
                            : phone.color
              }}
            />
            <span className="text-sm text-gray-600 capitalize">
              {phone.color}
            </span>
          </div>

          <div className="text-primary-500 text-sm font-medium">
            View Details →
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
