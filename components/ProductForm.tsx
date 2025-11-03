'use client';

import { useState, FormEvent } from 'react';

interface ProductFormProps {
  onSubmission: () => void;
}

// Enhanced form with progress indicators and psychological principles
export default function ProductForm({ onSubmission }: ProductFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactPostcode, setContactPostcode] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState<'product' | 'contact'>('product');

  // Calculate progress
  const productFieldsFilled = [title, description, price, condition].filter(Boolean).length;
  const contactFieldsFilled = [contactName, contactEmail, contactPhone, contactPostcode].filter(Boolean).length;
  const progress = ((productFieldsFilled + contactFieldsFilled) / 8) * 100;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setImages(filesArray);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !price || !condition || !contactName || !contactEmail || !contactPhone || !contactPostcode) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('condition', condition);
      formData.append('contactName', contactName);
      formData.append('contactEmail', contactEmail);
      formData.append('contactPhone', contactPhone);
      formData.append('contactPostcode', contactPostcode);
      
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      });

      // First check if response is ok
      if (!response.ok) {
        // Try to parse error JSON, fallback to text if fails
        let errorMessage = 'An error occurred while submitting';
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (parseErr) {
            console.error('Failed to parse error JSON:', parseErr);
          }
        } else {
          const textResponse = await response.text();
          errorMessage = textResponse || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // If ok, parse JSON
      const data = await response.json();
      onSubmission();
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Progress Bar - visual progress indicator */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2">
        <div 
          className="bg-white h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Header with section indicators */}
      <div className="p-6 sm:p-8 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Product Information
          </h2>
          <div className="text-sm text-gray-600 font-medium">
            {currentStep === 'product' ? 'Step 1 of 2' : 'Step 2 of 2'} • ~60 sec
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentStep('product')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentStep === 'product'
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              currentStep === 'product' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {productFieldsFilled === 4 ? '✓' : '1'}
            </div>
            <span className="text-sm">Product Details</span>
          </button>
          <div className="flex-1 h-0.5 bg-gray-200">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: contactFieldsFilled > 0 ? '100%' : '0%' }}
            ></div>
          </div>
          <button
            onClick={() => setCurrentStep('contact')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentStep === 'contact'
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              contactFieldsFilled === 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {contactFieldsFilled === 4 ? '✓' : '2'}
            </div>
            <span className="text-sm">Contact Info</span>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        {/* Error Message - with better visualisation */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Product Information Section */}
        {(currentStep === 'product' || productFieldsFilled === 4) && (
          <div className="space-y-6 mb-8">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                placeholder="E.g: iPhone 14 Pro 128GB"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Include exact model and storage capacity</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 resize-none"
                placeholder="E.g: iPhone 14 Pro 128GB, works perfectly, screen has no scratches, includes charger and box"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Include: model, storage, functionality, any defects</p>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">
                Asking Price (£) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">£</span>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                  placeholder="E.g: 800 or 'Best Offer'"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">What are you hoping to get for it?</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Condition <span className="text-red-500">*</span>
              </label>
              {/* Single row horizontal layout for better UX */}
              <div className="flex flex-wrap gap-3 justify-center">
                <label className={`relative flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  condition === 'like_new' 
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg' 
                    : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="condition"
                    value="like_new"
                    checked={condition === 'like_new'}
                    onChange={(e) => setCondition(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    condition === 'like_new' ? 'border-white' : 'border-gray-400'
                  }`}>
                    {condition === 'like_new' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${condition === 'like_new' ? 'text-white' : ''}`}>Like New</span>
                </label>
                <label className={`relative flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  condition === 'excellent' 
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg' 
                    : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="condition"
                    value="excellent"
                    checked={condition === 'excellent'}
                    onChange={(e) => setCondition(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    condition === 'excellent' ? 'border-white' : 'border-gray-400'
                  }`}>
                    {condition === 'excellent' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${condition === 'excellent' ? 'text-white' : ''}`}>Excellent</span>
                </label>
                <label className={`relative flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  condition === 'good' 
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg' 
                    : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="condition"
                    value="good"
                    checked={condition === 'good'}
                    onChange={(e) => setCondition(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    condition === 'good' ? 'border-white' : 'border-gray-400'
                  }`}>
                    {condition === 'good' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${condition === 'good' ? 'text-white' : ''}`}>Good</span>
                </label>
                <label className={`relative flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  condition === 'fair' 
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg' 
                    : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="condition"
                    value="fair"
                    checked={condition === 'fair'}
                    onChange={(e) => setCondition(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    condition === 'fair' ? 'border-white' : 'border-gray-400'
                  }`}>
                    {condition === 'fair' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${condition === 'fair' ? 'text-white' : ''}`}>Fair</span>
                </label>
                <label className={`relative flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  condition === 'poor' 
                    ? 'border-blue-600 bg-blue-600 text-white shadow-lg' 
                    : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="condition"
                    value="poor"
                    checked={condition === 'poor'}
                    onChange={(e) => setCondition(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    condition === 'poor' ? 'border-white' : 'border-gray-400'
                  }`}>
                    {condition === 'poor' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${condition === 'poor' ? 'text-white' : ''}`}>Poor</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="images" className="block text-sm font-semibold text-gray-900 mb-2">
                Photos <span className="text-gray-500 font-normal">(up to 5, optional)</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="images"
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600 font-medium">Click or drag photos here</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (max. 5MB)</span>
                </label>
              </div>
              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from(images).map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Continue Button - Always visible after Photos section */}
            <button
              type="button"
              onClick={() => setCurrentStep('contact')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 mt-6"
            >
              Continue to Contact Info
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}

        {/* Contact Information Section */}
        {(currentStep === 'contact' || productFieldsFilled === 4) && (
          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Contact Information
              </h3>
              <p className="text-sm text-gray-600 mb-6">Used only to send you the quote - we never share your details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                  placeholder="E.g: John Smith"
                  required
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="contactPhone" className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                placeholder="+44 7XXX XXXXXX"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Required for quick contact</p>
            </div>

            <div>
              <label htmlFor="contactPostcode" className="block text-sm font-semibold text-gray-900 mb-2">
                Postcode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactPostcode"
                value={contactPostcode}
                onChange={(e) => setContactPostcode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                placeholder="SW1A 1AA"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Required for shipping</p>
            </div>

            {/* Privacy Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Data Protection</p>
                  <p className="text-blue-700">Your contact information is used only for product enquiries. We never share your data with third parties.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button - with better visualisation */}
        {productFieldsFilled === 4 && contactFieldsFilled === 4 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Offer</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              By clicking the button, you agree to our data processing policy
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
