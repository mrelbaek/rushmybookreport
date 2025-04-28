// app/page.tsx
import BookReportForm from "../components/BookReportForm";
import { Headphones, Clock, CheckCircle, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 font-mono">
      {/* Top Retro Pattern */}
      <div className="w-full h-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
      
      {/* Navigation */}
      <div className="bg-white py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-xl font-bold tracking-wide text-pink-600">
            RUSH<span className="text-blue-600">MY</span>BOOK<span className="text-pink-600">REPORT</span>
          </div>
          <div className="hidden md:flex space-x-6 text-sm">
            <a href="#how-it-works" className="text-gray-700 hover:text-pink-600 uppercase tracking-wide">How It Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-pink-600 uppercase tracking-wide">Pricing</a>
            <a href="#testimonials" className="text-gray-700 hover:text-pink-600 uppercase tracking-wide">Testimonials</a>
          </div>
        </div>
      </div>
      
      {/* Hero Section with Form Front and Center */}
      <div className="relative py-12 sm:py-16">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600">
              Rush My Book Report
            </h1>
            <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
              Get your custom book report in as little as 1 hour. <span className="font-bold text-blue-500">No stress.</span> <span className="font-bold text-pink-500">No panic.</span>
            </p>
          </div>
          
          {/* Form Card - Front and Center - Styled with Retro Card */}
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border-4 border-pink-300 transform -rotate-1">
            <div className="bg-gradient-to-r from-pink-400 to-blue-400 py-2">
              <h2 className="text-center text-white font-bold uppercase tracking-wider text-lg">Order Now</h2>
            </div>
            <div className="p-6">
              <BookReportForm />
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-pink-500 mr-1.5" />
              <span className="font-bold tracking-wide">100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-1.5" />
              <span className="font-bold tracking-wide">Secure Payment</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-pink-500 mr-1.5" />
              <span className="font-bold tracking-wide">Custom-Written Reports</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works - 80s/90s Style */}
      <div id="how-it-works" className="py-16 bg-gradient-to-r from-blue-100 to-pink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center uppercase tracking-widest mb-2 text-gray-800">
            How It Works
          </h2>
          <div className="h-1 w-40 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <div className="bg-pink-200 p-4 rounded-full border-2 border-pink-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>,
                title: "1. Enter Book Details",
                description: "Book title, author, and your grade level",
              },
              {
                icon: <div className="bg-blue-200 p-4 rounded-full border-2 border-blue-400">
                        <Clock className="h-10 w-10 text-blue-600" />
                      </div>,
                title: "2. Choose Delivery",
                description: "Standard (24h) or Rush (1h)",
              },
              {
                icon: <div className="bg-pink-200 p-4 rounded-full border-2 border-pink-400">
                        <Zap className="h-10 w-10 text-pink-600" />
                      </div>,
                title: "3. We Generate",
                description: "AI creates your custom report",
              },
              {
                icon: <div className="bg-blue-200 p-4 rounded-full border-2 border-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                        </svg>
                      </div>,
                title: "4. Get Your Report",
                description: "Delivered straight to your email",
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wide">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Why Choose Us - 80s/90s Style Cards */}
      <div className="py-16 bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center uppercase tracking-widest mb-2 text-gray-800">
            Why Students Trust Us
          </h2>
          <div className="h-1 w-40 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "High-Quality Reports",
                description: "Every report is tailored to your grade level and can match your writing style",
                color: "from-pink-200 to-pink-100",
                border: "border-pink-400",
              },
              {
                title: "Quick Turnaround",
                description: "Get your report in as little as 1 hour with our rush service",
                color: "from-purple-200 to-purple-100",
                border: "border-purple-400",
              },
              {
                title: "Simple Pricing",
                description: "No hidden fees. Prices start at $9.99 for standard delivery",
                color: "from-blue-200 to-blue-100",
                border: "border-blue-400",
              },
            ].map((feature, i) => (
              <div key={i} className={`bg-gradient-to-b ${feature.color} rounded-lg p-6 border-2 ${feature.border} shadow-lg transform hover:-translate-y-1 transition-transform duration-300`}>
                <h3 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials - Retro Style */}
      <div id="testimonials" className="py-16 bg-gradient-to-r from-blue-100 to-pink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center uppercase tracking-widest mb-2 text-gray-800">
            What Our Students Say
          </h2>
          <div className="h-1 w-40 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Saved me during finals week! Got my report in under an hour and it matched my writing style perfectly.",
                name: "Alex J.",
                title: "High School Senior",
                color: "from-pink-200 to-white",
                border: "border-pink-400",
              },
              {
                quote: "The report was exactly what I needed - well researched and at my college level. Really helped me understand the book better.",
                name: "Jamie T.",
                title: "College Freshman",
                color: "from-blue-200 to-white",
                border: "border-blue-400",
              },
            ].map((testimonial, i) => (
              <div key={i} className={`bg-gradient-to-br ${testimonial.color} rounded-lg p-6 shadow-lg border-2 ${testimonial.border} transform rotate-${i % 2 === 0 ? '1' : '-1'}`}>
                <p className="text-gray-700 mb-4 italic font-medium">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="#top" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all duration-300 uppercase tracking-wide"
            >
              Get Your Report Now
            </a>
          </div>
        </div>
      </div>
      
      {/* Retro Footer */}
      <div className="w-full h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
                RUSHMYBOOKREPORT
              </h3>
              <p className="text-gray-400 text-sm">
                Providing students with high-quality book reports since 2024.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-pink-400">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#how-it-works" className="hover:text-pink-300">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-pink-300">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-pink-300">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-blue-400">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-300">Academic Integrity</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} RushMyBookReport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}