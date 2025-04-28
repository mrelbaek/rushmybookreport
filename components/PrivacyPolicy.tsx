// components/PrivacyPolicy.tsx
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="border border-green-500 bg-black text-green-400 font-mono">
      <div className="p-4 border-b border-green-500 flex items-center">
        <span className="text-gray-500 mr-2">$</span>
        <span className="text-lg">cat</span>
        <span className="text-white ml-2">privacy_policy.md</span>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl mb-2"># PRIVACY POLICY</h2>
          <p className="text-gray-500 text-sm">// Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 1. INTRODUCTION</h3>
            <p className="text-gray-400 mb-2">
              RushMyBookReport ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 2. INFORMATION WE COLLECT</h3>
            <p className="text-gray-400 mb-2">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Personal information: email address</li>
              <li>Order information: book title, author, education level, target grade</li>
              <li>Optional information: writing samples (for style matching)</li>
              <li>Payment information: processed through Stripe (we do not store your payment details)</li>
              <li>Usage data: how you interact with our service</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 3. HOW WE USE YOUR INFORMATION</h3>
            <p className="text-gray-400 mb-2">
              We use the collected information for:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Generating custom book reports</li>
              <li>Processing payments</li>
              <li>Delivering reports to your email</li>
              <li>Improving our service</li>
              <li>Customer support</li>
              <li>Communication about your orders</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 4. DATA RETENTION</h3>
            <p className="text-gray-400 mb-2">
              We retain your information only as long as necessary to provide our services and for legitimate business purposes. Order information is kept for accounting and compliance purposes. Writing samples are used only for generating your report and are not permanently stored.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 5. DATA SHARING AND THIRD PARTIES</h3>
            <p className="text-gray-400 mb-2">
              We share your information with:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Stripe: for payment processing</li>
              <li>Resend/Postmark: for email delivery</li>
              <li>OpenAI: for report generation (temporarily and without PII)</li>
              <li>Service providers: for hosting, analytics, and customer support</li>
            </ul>
            <p className="text-gray-400 mt-2">
              We do not sell your personal information to third parties.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 6. YOUR RIGHTS</h3>
            <p className="text-gray-400 mb-2">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Object to or restrict certain processing</li>
              <li>Data portability</li>
              <li>Withdraw consent for future processing</li>
            </ul>
            <p className="text-gray-400 mt-2">
              To exercise these rights, contact us at privacy@rushmybookreport.com.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 7. SECURITY</h3>
            <p className="text-gray-400 mb-2">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 8. COOKIES AND TRACKING</h3>
            <p className="text-gray-400 mb-2">
              We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can control cookies through your browser settings.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 9. CHILDREN'S PRIVACY</h3>
            <p className="text-gray-400 mb-2">
              Our service is not directed to individuals under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 10. CHANGES TO THIS PRIVACY POLICY</h3>
            <p className="text-gray-400 mb-2">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
          
          <section>
            <h3 className="text-green-400 font-bold mb-2">## 11. CONTACT US</h3>
            <p className="text-gray-400 mb-2">
              If you have questions or concerns about this Privacy Policy, please contact us at:  
              privacy@rushmybookreport.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}