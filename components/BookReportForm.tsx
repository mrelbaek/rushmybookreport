"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { ArrowRight, CheckCircle, X, AlertTriangle } from "lucide-react";

export default function BookReportForm() {
  // Form states
  const [bookTitle, setBookTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [level, setLevel] = useState<string>("high");
  const [targetGrade, setTargetGrade] = useState<string>("A");
  const [length, setLength] = useState<number>(500);
  const [rush, setRush] = useState<boolean>(false);
  const [realism, setRealism] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [sampleText, setSampleText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [generatedReport, setGeneratedReport] = useState<string>("");
  
  // For demo mode - to skip payment and generate report directly
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // Education level options
  const educationLevels = [
    { value: "elementary", label: "ELEMENTARY (1-5)" },
    { value: "middle", label: "MIDDLE_SCHOOL (6-8)" },
    { value: "high", label: "HIGH_SCHOOL (9-12)" },
    { value: "college", label: "COLLEGE" },
  ];

  // Target grade options
  const targetGrades = [
    { value: "A+", label: "A+" },
    { value: "A", label: "A" },
    { value: "B+", label: "B+" },
    { value: "B", label: "B" },
    { value: "C+", label: "C+" },
    { value: "C", label: "C" },
  ];

  // Report length options with prices
  const reportLengths = [
    { value: 300, label: "300_WORDS", price: 7.99 },
    { value: 500, label: "500_WORDS", price: 7.99 },
    { value: 750, label: "750_WORDS", price: 9.99 },
    { value: 1000, label: "1000_WORDS", price: 11.99 },
  ];

  // Calculate price
  const calculatePrice = (): number => {
    const basePrice = reportLengths.find(option => option.value === length)?.price || 7.99;
    return rush ? basePrice * 2 : basePrice; // Rush is double price
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Form validation
    if (!bookTitle || !author || !email) {
      setError("ERROR: Missing required input parameters");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      if (demoMode) {
        // For demo: Generate report directly without payment
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookTitle,
            author,
            level,
            targetGrade,
            length,
            rush,
            realism,
            sampleText,
            email,
          }),
        });

        const data = await res.json();

        if (res.ok && data.report) {
          setGeneratedReport(data.report);
          setIsSuccess(true);
        } else {
          throw new Error(data.error || "Failed to generate report");
        }
      } else {
        // In production: Create checkout session with Stripe
        const res = await fetch("/api/create-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookTitle,
            author,
            level,
            targetGrade,
            length,
            rush,
            realism,
            sampleText,
            email,
          }),
        });

        const data = await res.json();

        if (res.ok && data.url) {
          // Redirect to Stripe checkout
          window.location.href = data.url;
        } else {
          throw new Error(data.error || "Failed to create checkout session");
        }
      }
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(`ERROR: ${err.message || "Unknown error occurred"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to initial state
  const resetForm = (): void => {
    setIsSuccess(false);
    setBookTitle("");
    setAuthor("");
    setTargetGrade("A");
    setEmail("");
    setSampleText("");
    setGeneratedReport("");
  };

  if (isSuccess) {
    return (
      <div className="text-green-400 py-4">
        <div className="border border-green-500 bg-black p-4 mb-6">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
            <span className="text-lg font-mono">SUCCESS: OPERATION COMPLETED</span>
          </div>
          
          <div className="text-sm text-gray-400 mb-6 border-l-2 border-green-500 pl-3">
            <p>Report for <span className="text-green-400 font-mono">{bookTitle}</span> generated.</p>
            <p>Delivery to <span className="text-green-400 font-mono">{email}</span> complete.</p>
          </div>
          
          {/* Preview of the report */}
          {generatedReport && (
            <div className="mb-6 bg-gray-900 border border-green-500 p-3 font-mono text-xs overflow-hidden">
              <div className="flex items-center mb-2 text-gray-500 border-b border-green-500/30 pb-1">
                <span className="text-green-500 mr-1">cat</span> report_preview.txt | <span className="text-green-500 ml-1">head -n 15</span>
              </div>
              <p className="text-gray-300 whitespace-pre-line h-40 overflow-y-auto">
                {generatedReport.substring(0, 500)}...
              </p>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-green-500 bg-black text-green-400 hover:bg-green-500 hover:text-black transition duration-200 font-mono text-sm"
            >
              $ new_order.sh
            </button>
            
            {generatedReport && (
              <button
                onClick={() => {
                  const element = document.createElement('a');
                  const file = new Blob([generatedReport], {type: 'text/plain'});
                  element.href = URL.createObjectURL(file);
                  element.download = `Book_Report_${bookTitle.replace(/\s+/g, '_')}.txt`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="px-4 py-2 border border-green-500 bg-black text-green-400 hover:bg-green-500 hover:text-black transition duration-200 font-mono text-sm"
              >
                $ download_report.sh
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-green-400 font-mono">
      {/* Form Header */}
      <div className="text-xs text-gray-500 border-b border-green-500/50 pb-2 mb-4">
        <span className="text-green-500">$</span> ./configure --book-report --options
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-500 p-3 text-xs flex items-start">
          <AlertTriangle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-500 font-bold">FATAL ERROR</p>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      )}

      {/* Book Details Section */}
      <div className="border border-green-500 p-3">
        <div className="text-xs text-gray-500 border-b border-green-500/30 pb-1 mb-3">
          <span className="text-green-500">#</span> Book Information
        </div>
        
        {/* Book Title */}
        <div className="mb-3">
          <label htmlFor="bookTitle" className="block text-xs text-gray-400 mb-1">
            BOOK_TITLE <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="bg-gray-800 border-y border-l border-green-500 px-2 py-1 text-green-400 text-sm flex items-center">$</span>
            <input
              id="bookTitle"
              type="text"
              value={bookTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBookTitle(e.target.value)}
              placeholder="Enter book title"
              className="flex-1 bg-black border border-green-500 p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-xs text-gray-400 mb-1">
            AUTHOR <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="bg-gray-800 border-y border-l border-green-500 px-2 py-1 text-green-400 text-sm flex items-center">$</span>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="flex-1 bg-black border border-green-500 p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Education Parameters Section */}
      <div className="border border-green-500 p-3">
        <div className="text-xs text-gray-500 border-b border-green-500/30 pb-1 mb-3">
          <span className="text-green-500">#</span> Education Parameters
        </div>
        
        {/* Education Level */}
        <div className="mb-3">
          <label htmlFor="level" className="block text-xs text-gray-400 mb-1">
            EDUCATION_LEVEL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="flex">
              <span className="bg-gray-800 border-y border-l border-green-500 px-2 py-1 text-green-400 text-sm flex items-center">$</span>
              <select
                id="level"
                value={level}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setLevel(e.target.value)}
                className="flex-1 appearance-none bg-black border border-green-500 p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 pr-8"
                required
              >
                {educationLevels.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Target Grade */}
        <div>
          <label htmlFor="targetGrade" className="block text-xs text-gray-400 mb-1">
            TARGET_GRADE
          </label>
          <div className="relative">
            <div className="flex">
              <span className="bg-gray-800 border-y border-l border-green-500 px-2 py-1 text-green-400 text-sm flex items-center">$</span>
              <select
                id="targetGrade"
                value={targetGrade}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setTargetGrade(e.target.value)}
                className="flex-1 appearance-none bg-black border border-green-500 p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 pr-8"
              >
                {targetGrades.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Report Configuration Section */}
      <div className="border border-green-500 p-3">
        <div className="text-xs text-gray-500 border-b border-green-500/30 pb-1 mb-3">
          <span className="text-green-500">#</span> Report Configuration
        </div>
        
        {/* Report Length */}
        <div className="mb-3">
          <label htmlFor="length" className="block text-xs text-gray-400 mb-1">
            REPORT_LENGTH
          </label>
          <div className="relative">
            <div className="flex">
              <span className="bg-gray-800 border-y border-l border-green-500 px-2 py-1 text-green-400 text-sm flex items-center">$</span>
              <select
                id="length"
                value={length}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setLength(Number(e.target.value))}
                className="flex-1 appearance-none bg-black border border-green-500 p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 pr-8"
              >
                {reportLengths.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label} - ${option.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Rush and Realism Options */}
        <div className="space-y-2">
          {/* Rush Option */}
          <div className="bg-black border border-green-500 p-2">
            <label className="flex items-center">
              <input
                id="rush"
                type="checkbox"
                checked={rush}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRush(e.target.checked)}
                className="h-4 w-4 bg-black border-green-500 text-green-500 focus:ring-0 focus:outline-none focus:ring-offset-0"
              />
              <span className="ml-2 text-sm">
                <span className="text-gray-400">--rush-delivery</span> <span className="text-xs text-gray-500">(1 hour - 2x price)</span>
              </span>
            </label>
          </div>

          {/* Realism Option */}
          <div className="bg-black border border-green-500 p-2">
            <label className="flex items-center">
              <input
                id="realism"
                type="checkbox"
                checked={realism}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRealism(e.target.checked)}
                className="h-4 w-4 bg-black border-green-500 text-green-500 focus:ring-0 focus:outline-none focus:ring-offset-0"
              />
              <span className="ml-2 text-sm">
                <span className="text-gray-400">--authentic-style</span> <span className="text-xs text-gray-500">(include realistic student errors)</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border border-green-500 p-3">
        <div className="text-xs text-gray-500 border-b border-green-500/30 pb-1 mb-3">
          <span className="text-green-500">#</span> Contact Information
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs text-gray-400 mb-1">
            EMAIL <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="bg-gray-800 border-y border-l border-green-500 px-2 py-1 text-green-400 text-sm flex items-center">$</span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Where to send your report"
              className="flex-1 bg-black border border-green-500 p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Writing Sample */}
      <div className="border border-green-500 p-3">
        <div className="text-xs text-gray-500 border-b border-green-500/30 pb-1 mb-3">
          <span className="text-green-500">#</span> Style Customization (Optional)
        </div>
        
        <div>
          <label htmlFor="sampleText" className="block text-xs text-gray-400 mb-1">
            YOUR_WRITING_SAMPLE
          </label>
          <textarea
            id="sampleText"
            value={sampleText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSampleText(e.target.value)}
            placeholder="Paste a sample of your writing to match your style"
            rows={4}
            className="w-full bg-black border border-green-500 p-2 text-green-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 font-mono"
          />
          <p className="mt-1 text-xs text-gray-500">
            # This helps match your personal writing style for authenticity
          </p>
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-green-900/20 border border-green-500 p-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold">TOTAL_PRICE:</span>
          <div className="bg-black border border-green-500 px-3 py-1">
            <span className="text-lg font-bold text-green-400">${calculatePrice().toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {rush ? '# Rush delivery (1 hour) applied' : '# Standard delivery (24 hours)'}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-black font-bold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            PROCESSING...
          </>
        ) : (
          <>
            {rush ? "EXECUTE rush_report.sh" : "EXECUTE standard_report.sh"} <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>

      {/* Trust Badge */}
      <div className="flex items-center justify-center bg-black p-2 border border-green-500 text-xs text-gray-500">
        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>SECURE_CHECKOUT = true; // No payment required until report is ready</span>
      </div>

      {/* Demo Mode Toggle (for development only) */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="pt-2 border-t border-green-500/30">
          <div className="flex items-center">
            <input
              id="demoMode"
              type="checkbox"
              checked={demoMode}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDemoMode(e.target.checked)}
              className="h-4 w-4 bg-black border-green-500 text-green-500 focus:ring-0 focus:outline-none focus:ring-offset-0"
            />
            <label htmlFor="demoMode" className="ml-2 block text-xs text-gray-500">
              # DEMO_MODE = true; // Skip Payment (development only)
            </label>
          </div>
        </div>
      )}
    </form>
  );
}