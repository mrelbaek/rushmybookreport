// components/FaqSection.tsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "Is using RushMyBookReport considered plagiarism?",
      answer: "RushMyBookReport provides AI-generated drafts intended to be study aids and reference materials. We strongly encourage users to use our reports as a starting point for understanding the book and developing their own insights. Users should always follow their school's academic honesty policies and properly cite any sources they use, including our reports if appropriate."
    },
    {
      question: "How does the writing style matching work?",
      answer: "When you provide a writing sample, our AI analyzes your vocabulary level, sentence structure, and common phrases or transitions. It then generates a report that mimics your style while maintaining appropriate academic quality for your grade level. This helps ensure the report feels like it could have been written by you."
    },
    {
      question: "What's the difference between standard and rush delivery?",
      answer: "Standard delivery provides your custom book report within 24 hours for $7.99. Rush delivery expedites this process to deliver your report within 1 hour for $14.99. Both options provide the same high-quality content, just on different timelines."
    },
    {
      question: "What does the 'authentic style' option do?",
      answer: "The authentic style toggle makes your report more realistic by optionally including minor spelling errors, occasional grammar mistakes, or insights that feel authentic to a student at your grade level. This is useful if you want a report that doesn't appear too polished or professional."
    },
    {
      question: "How do I use the target grade feature?",
      answer: "The target grade feature allows you to specify the grade you're aiming for (A+, A, B+, etc.). Our AI will adjust the depth of analysis, complexity of language, and quality of insights to match what would typically earn that grade at your education level."
    },
    {
      question: "Do you store my writing samples or book reports?",
      answer: "We store your information only as long as necessary to generate and deliver your report. Your writing samples are used solely for style matching and are not permanently stored. We prioritize your privacy and handle all data in accordance with our Privacy Policy."
    },
    {
      question: "What if I'm not satisfied with my report?",
      answer: "We offer a 100% satisfaction guarantee. If your report doesn't meet your expectations, contact our support team within 24 hours of delivery, and we'll either revise it according to your specifications or provide a full refund."
    }
  ];

  return (
    <div className="border border-green-500 bg-black text-green-400 font-mono">
      <div className="p-4 border-b border-green-500 flex items-center">
        <span className="text-gray-500 mr-2">$</span>
        <span className="text-lg">cat</span>
        <span className="text-white ml-2">frequently_asked_questions.md</span>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl mb-2"># FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-gray-500 text-sm">// Answers to common questions about our service</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-green-500/50">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-3 flex justify-between items-center hover:bg-green-900/20 focus:outline-none text-left"
              >
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">function</span>
                  <span className="text-green-400">{faq.question.replace(/\s+/g, '_').toLowerCase()}</span>
                  <span className="text-gray-500">() {'{}'}</span>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-green-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-green-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-3 bg-gray-900/30 border-t border-green-500/50">
                  <div className="text-gray-400 text-sm whitespace-pre-line">
                    <span className="text-gray-500">// </span>
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}