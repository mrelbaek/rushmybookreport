// components/AcademicIntegrity.tsx
import React from 'react';

export default function AcademicIntegrity() {
  return (
    <div className="border border-green-500 bg-black text-green-400 font-mono">
      <div className="p-4 border-b border-green-500 flex items-center">
        <span className="text-gray-500 mr-2">$</span>
        <span className="text-lg">cat</span>
        <span className="text-white ml-2">academic_integrity.md</span>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl mb-2"># ACADEMIC INTEGRITY POLICY</h2>
          <p className="text-gray-500 text-sm">// Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="text-green-400 font-bold mb-2">## OUR POSITION ON ACADEMIC INTEGRITY</h3>
            <p className="text-gray-400 mb-2">
              RushMyBookReport is committed to promoting academic integrity and ethical use of our services. We provide AI-generated book reports as educational tools to help students better understand literary works and improve their analytical skills. Our reports are intended to be used as reference materials, not as substitutes for original work.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## ACCEPTABLE USE OF OUR REPORTS</h3>
            <p className="text-gray-400 mb-2">
              We encourage users to utilize our reports in the following ways:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>As a starting point for understanding complex literary works</li>
              <li>As a reference for identifying key themes, characters, and plot elements</li>
              <li>As a model for structuring your own analysis and arguments</li>
              <li>As a supplementary resource to complement your own reading and research</li>
              <li>As a study aid to prepare for discussions or exams</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## PROHIBITED USE OF OUR REPORTS</h3>
            <p className="text-gray-400 mb-2">
              The following uses of our reports are prohibited and violate academic integrity principles:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Submitting our reports as your own original work</li>
              <li>Presenting the ideas or analysis from our reports without proper attribution</li>
              <li>Using our reports to avoid reading the assigned book</li>
              <li>Sharing or selling our reports to other students</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## GUIDELINES FOR ETHICAL USE</h3>
            <p className="text-gray-400 mb-2">
              To use our services ethically:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Read the assigned book yourself</li>
              <li>Form your own initial thoughts and analysis</li>
              <li>Use our report to enhance your understanding, not replace it</li>
              <li>If incorporating ideas from our reports in your work, properly cite RushMyBookReport as a source</li>
              <li>Always follow your school's specific guidelines regarding the use of AI tools and reference materials</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## EDUCATIONAL INSTITUTION POLICIES</h3>
            <p className="text-gray-400 mb-2">
              Different educational institutions have varying policies regarding the use of AI-generated content and reference materials. It is your responsibility to understand and comply with your specific institution's academic integrity policy. When in doubt, consult with your instructor or academic advisor.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## PROPER CITATION</h3>
            <p className="text-gray-400 mb-2">
              If you use insights from our reports in your academic work and your institution permits citing AI assistance, we recommend the following citation format:
            </p>
            <div className="bg-gray-900 p-3 border border-green-500 mb-2">
              <p className="text-green-400">
                RushMyBookReport. "Book Report on [Title]." AI-Generated Report, [Date Generated], rushmybookreport.com.
              </p>
            </div>
            <p className="text-gray-400">
              Always follow the specific citation style (MLA, APA, Chicago, etc.) required by your instructor.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## CONSEQUENCES OF MISUSE</h3>
            <p className="text-gray-400 mb-2">
              Misuse of our services may lead to serious academic consequences, including:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Academic penalties (failing grades)</li>
              <li>Disciplinary action from your educational institution</li>
              <li>Long-term impact on your academic record</li>
              <li>Missed learning opportunities and skill development</li>
            </ul>
            <p className="text-gray-400 mt-2">
              RushMyBookReport is not responsible for any academic or disciplinary consequences resulting from the misuse of our services.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## OUR COMMITMENT</h3>
            <p className="text-gray-400 mb-2">
              We are committed to providing educational resources that help students succeed through better understanding and skill development, not through circumventing academic responsibilities. We believe that technology should enhance education, not replace the learning process.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## QUESTIONS OR CONCERNS</h3>
            <p className="text-gray-400 mb-2">
              If you have questions about how to use our services ethically or need guidance on proper attribution, please contact us at:  
              integrity@rushmybookreport.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}