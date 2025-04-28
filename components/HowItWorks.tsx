// components/HowItWorks.tsx
import { BookOpen, Clock, FileText, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Enter Book Details",
      description: "Simply provide the book title, author, and your education level. No complex forms or lengthy questionnaires."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: "Quick Payment",
      description: "Choose between standard (24 hour) and rush (1 hour) delivery. Secure payment through Stripe."
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Generation",
      description: "Our advanced AI creates a custom book report matching your education level and writing style."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Rapid Delivery",
      description: "Receive your completed report via email in as little as 1 hour, depending on your chosen delivery option."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          How It Works
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Get your book report in four simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -ml-3 transform translate-x-3" />
            )}
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 h-full relative z-10">
              <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100">
                {step.icon}
              </div>
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <a 
          href="#order-form" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Get Started Now
        </a>
      </div>
    </div>
  );
}