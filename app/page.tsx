'use client';

import { useState } from 'react';
import ProductForm from '@/components/ProductForm';

// Main page with professional design
export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmission = () => {
    setIsSubmitted(true);
    // Scroll to top after submission
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section - with trust signals */}
      <header className="relative overflow-hidden bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Brand Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ptsltech.co.uk
            </h1>
          </div>
          
          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Trusted Process</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Quick Response</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              <span className="font-medium">Professional Valuation</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
              Sell Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Electronics
              </span>
              <br />
              Quickly & Safely
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Fill out the form and receive a response within{' '}
              <span className="font-semibold text-gray-900">24 hours</span>. 
              All items verified before purchase.
            </p>

            {/* Social Proof Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600 mt-1">Items Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">24h</div>
                <div className="text-sm text-gray-600 mt-1">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600 mt-1">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Primary CTA above fold */}
        {!isSubmitted && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              Get Your Quote in 24 Hours
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Free valuation • Fast response • Best prices
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                ✓ No credit card required
              </div>
              <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                ✓ UK-wide pickup available
              </div>
            </div>
          </div>
        )}

        {/* Trusted Security Badges - Before form */}
        {!isSubmitted && (
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-4 text-center font-medium">Trusted & Secure</p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  PP
                </div>
                <span className="text-sm font-semibold">PayPal</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-12 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">VISA</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden" style={{background: 'linear-gradient(to right, #eb001b 0%, #eb001b 50%, #ff5f00 50%, #ff5f00 100%)'}}>
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
                <span className="text-sm font-semibold">Mastercard</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 18l-5-5 1.414-1.414L10 15.172l7.586-7.586L19 9l-9 9z"/>
                </svg>
                <span className="text-sm font-semibold">Secure</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Success Message - with animation */}
        {isSubmitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-green-500 rounded-full p-4">
                  <svg
                    className="h-12 w-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You For Your Submission! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-2 max-w-2xl mx-auto">
              Your submission has been successfully received and is being reviewed.
            </p>
            <p className="text-base text-gray-500 mb-8">
              We'll contact you within <span className="font-semibold text-gray-700">24 hours</span> with feedback on your electronics.
            </p>
            
            {/* Trust Indicators */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Data Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Trusted Valuation</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  <span>Quick Response</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Submit Another Offer
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <ProductForm onSubmission={handleSubmission} />
            
            {/* How It Works - after form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Describe Your Item</h3>
                  <p className="text-sm text-gray-600">
                    Fill in details, upload photos, set your asking price
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">We Review</h3>
                  <p className="text-sm text-gray-600">
                    Professional evaluation within 24 hours
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Your Quote</h3>
                  <p className="text-sm text-gray-600">
                    Receive offer & arrange convenient pickup
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Reviews - Social Proof */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                What Our Customers Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      DS
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">David S.</div>
                      <div className="text-xs text-gray-500">Manchester</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic">
                    "Sold my iPhone 14 within 24 hours. Professional service and fair price. Highly recommend!"
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      EM
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">Emma M.</div>
                      <div className="text-xs text-gray-500">London</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic">
                    "Quick response, great communication. Made selling my MacBook so easy. Thank you!"
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      JM
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">James M.</div>
                      <div className="text-xs text-gray-500">Birmingham</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic">
                    "Fast and efficient. Received my quote the same day and the process was smooth from start to finish."
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer - with additional trust signals */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Trust & Reliability</h3>
              <p className="text-sm text-gray-600">
                All items verified before purchase. We only contact sellers with the most reliable offers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Fast Process</h3>
              <p className="text-sm text-gray-600">
                Response within 24 hours. Professional valuation and quick decision-making.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Security & Privacy</h3>
              <p className="text-sm text-gray-600">
                Your data is stored securely and used only for contact. GDPR compliance guaranteed.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; 2024 ptsltech.co.uk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
