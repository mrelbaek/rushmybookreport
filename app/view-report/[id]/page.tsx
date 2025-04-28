// app/view-report/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Download, Printer, Share2 } from 'lucide-react';
import Link from 'next/link';
import { getOrderById } from '../../../lib/local-storage-db';

export default function ViewReportPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the order from local storage
    const orderData = getOrderById(params.id);
    
    if (!orderData) {
      setError('Report not found. It may have expired or been deleted.');
      setLoading(false);
      return;
    }
    
    setOrder(orderData);
    setLoading(false);
  }, [params.id]);

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  // Handle downloading as text file
  const handleDownload = () => {
    if (!order?.reportText) return;
    
    const element = document.createElement('a');
    const file = new Blob([order.reportText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Book_Report_${order.bookTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Handle sharing
  const handleShare = () => {
    if (navigator.share && order) {
      navigator.share({
        title: `Book Report: ${order.bookTitle}`,
        text: `My book report for ${order.bookTitle} by ${order.author}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(error => console.log('Error copying to clipboard:', error));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested report could not be found.'}</p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print-only header */}
      <div className="hidden print:block p-4 text-center">
        <h1 className="text-xl font-bold">Book Report: {order.bookTitle}</h1>
        <p>Generated on {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>
      
      {/* Navigation bar - hidden when printing */}
      <div className="bg-white shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-700 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span>Back to Homepage</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrint}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Print report"
              >
                <Printer className="h-5 w-5" />
              </button>
              <button 
                onClick={handleDownload}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Download report"
              >
                <Download className="h-5 w-5" />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Share report"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="py-8 print:py-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Book report card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden print:shadow-none print:border-0">
            {/* Report header - hidden when printing */}
            <div className="bg-blue-600 text-white p-6 print:hidden">
              <h1 className="text-2xl font-bold">{order.bookTitle}</h1>
              <p className="text-blue-100">by {order.author}</p>
            </div>
            
            {/* Report details - hidden when printing */}
            <div className="border-b border-gray-200 print:hidden">
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Education Level</p>
                    <p className="font-medium text-gray-900">
                      {order.level === 'elementary' ? 'Elementary School' : 
                       order.level === 'middle' ? 'Middle School' :
                       order.level === 'high' ? 'High School' : 'College'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Report Length</p>
                    <p className="font-medium text-gray-900">{order.length} words</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Delivery Type</p>
                    <p className="font-medium text-gray-900">
                      {order.rush ? 'Rush (1 hour)' : 'Standard (24 hours)'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Generated On</p>
                    <p className="font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Report content */}
            <div className="p-6 prose prose-blue max-w-none">
              {order.reportText ? (
                <div className="whitespace-pre-line">{order.reportText}</div>
              ) : (
                <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <p>Your report is being generated. Please check back soon.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Disclaimer - hidden when printing */}
          <div className="mt-8 text-sm text-center text-gray-500 print:hidden">
            <p>
              This report was generated using RushMyBookReport's AI technology.
              It is intended for study assistance only. Students are encouraged to use this 
              report responsibly and adhere to their school's academic honesty policies.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}