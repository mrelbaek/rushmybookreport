// app/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Clock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!sessionId) {
        setError('No order information found.');
        setLoading(false);
        return;
      }

      try {
        // In a real implementation, you would fetch order details from your API
        // const response = await fetch(`/api/orders/detail?sessionId=${sessionId}`);
        // const data = await response.json();
        
        // For demo, we'll simulate a successful response
        // This would come from your database in a real implementation
        setTimeout(() => {
          setOrderDetails({
            id: 'ord_' + Math.random().toString(36).substr(2, 9),
            bookTitle: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            isRush: Math.random() > 0.5,
            email: 'student@example.com',
            createdAt: new Date().toISOString(),
          });
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to fetch order details. Please contact support.');
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-4 max-w-md w-full bg-white rounded-lg shadow-md">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-20 w-20 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-red-100 p-4 mb-4">
              <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/" className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 py-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-white p-3">
              <CheckCircle className="h-10 w-10 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="p-6 sm:p-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Thank you for your order. Your book report is being prepared.
          </p>
          
          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{orderDetails.id}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Book:</span>
                  <span className="font-medium">{orderDetails.bookTitle}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Author:</span>
                  <span className="font-medium">{orderDetails.author}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium">{orderDetails.isRush ? 'Rush (1 hour)' : 'Standard (24 hours)'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{orderDetails.email}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                {orderDetails?.isRush ? (
                  <Clock className="h-5 w-5 text-blue-600" />
                ) : (
                  <Mail className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Next Steps</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    {orderDetails?.isRush 
                      ? 'Your rush book report will be delivered to your email within 1 hour.' 
                      : 'Your book report will be delivered to your email within 24 hours.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Homepage
            </Link>
            
            <button
              onClick={() => window.print()}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}