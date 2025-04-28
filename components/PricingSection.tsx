// components/PricingSection.tsx
import { CheckCircle } from "lucide-react";

export default function PricingSection() {
  const standardFeatures = [
    "Custom book report in 24 hours",
    "Matched to your education level",
    "Free revisions within 24 hours",
    "Matches your writing style (optional)",
    "Delivered to your email",
  ];

  const rushFeatures = [
    "Urgent book report in 1 hour",
    "Matched to your education level",
    "Free revisions within 4 hours",
    "Matches your writing style (optional)",
    "Priority support",
    "Delivered to your email",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Choose the option that fits your deadline
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Standard Plan */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
          <div className="px-6 py-12">
            <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">Standard Delivery</h3>
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-end">
                <span className="text-5xl font-extrabold text-gray-900">$14</span>
                <span className="text-xl font-medium text-gray-500 ml-1">.99</span>
              </span>
            </div>
            <p className="text-center text-gray-500 mb-8">Delivered within 24 hours</p>
            <ul className="space-y-4 mb-12">
              {standardFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <a 
                href="#order-form" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full"
              >
                Get Standard Report
              </a>
            </div>
          </div>
        </div>

        {/* Rush Plan */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md overflow-hidden border border-blue-200 transition-all hover:shadow-lg relative">
          <div className="absolute top-0 right-0 -mt-1 -mr-1">
            <div className="inline-flex rounded-bl-lg rounded-tr-lg overflow-hidden">
              <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5">
                MOST POPULAR
              </div>
            </div>
          </div>
          <div className="px-6 py-12">
            <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">Rush Delivery</h3>
            <div className="flex justify-center mb-8">
              <span className="inline-flex items-end">
                <span className="text-5xl font-extrabold text-gray-900">$22</span>
                <span className="text-xl font-medium text-gray-500 ml-1">.99</span>
              </span>
            </div>
            <p className="text-center text-gray-500 mb-8">Delivered within 1 hour</p>
            <ul className="space-y-4 mb-12">
              {rushFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <a 
                href="#order-form" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus: