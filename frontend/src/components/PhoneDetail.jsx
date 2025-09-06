import { useState } from 'react';

const PhoneDetail = ({ phone, onBack }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const specifications = [
    { label: 'Screen', value: phone.screen, icon: '📱' },
    { label: 'Processor', value: phone.processor, icon: '⚡' },
    { label: 'RAM', value: `${phone.ram}GB`, icon: '💾' },
    {
      label: 'Color',
      value: phone.color.charAt(0).toUpperCase() + phone.color.slice(1),
      icon: '🎨'
    },
    { label: 'Price', value: formatPrice(phone.price), icon: '💰' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 animate-slide-up">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center">
            <button
              onClick={onBack}
              className="btn-secondary mr-4 flex items-center"
            >
              ← Back to Phones
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {phone.name}
              </h1>
              <p className="text-primary-600 font-medium">
                {phone.manufacturer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image section */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 lg:p-12">
              {!imageError ? (
                <img
                  src={`/images/phones/${phone.imageFileName}`}
                  alt={`${phone.name} - ${phone.manufacturer}`}
                  className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                  onError={handleImageError}
                />
              ) : (
                <div className="text-center">
                  <div className="text-8xl mb-4">📱</div>
                  <p className="text-gray-500 text-lg">Image not available</p>
                </div>
              )}
            </div>

            {/* Details section */}
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {phone.name}
                  </h2>
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-lg text-xl font-bold">
                    {formatPrice(phone.price)}
                  </div>
                </div>

                <p className="text-lg text-primary-600 font-medium mb-6">
                  by {phone.manufacturer}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {phone.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{spec.icon}</span>
                        <span className="font-medium text-gray-700">
                          {spec.label}
                        </span>
                      </div>
                      <span className="text-gray-900 font-semibold">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color indicator */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Available Color
                </h3>
                <div className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300 mr-3 shadow-sm"
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
                  <span className="text-gray-900 font-medium capitalize">
                    {phone.color}
                  </span>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Interested in this device? Contact our sales team for more
                    information.
                  </p>
                  <button className="btn-primary px-8 py-3 text-lg">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetail;
