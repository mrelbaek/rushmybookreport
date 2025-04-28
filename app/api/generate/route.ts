// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Resend } from 'resend';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Resend for email delivery
const resend = new Resend(process.env.RESEND_API_KEY);

// For rate limiting
const REQUESTS_MAP = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(req: NextRequest) {
  try {
    // Apply basic rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;
    
    // Clear old requests
    REQUESTS_MAP.forEach((timestamp, key) => {
      if (timestamp < windowStart) REQUESTS_MAP.delete(key);
    });
    
    // Get existing requests for this IP
    const requestsThisWindow = [...REQUESTS_MAP.entries()]
      .filter(([key, _]) => key.startsWith(ip))
      .length;
      
    // Check rate limit
    if (requestsThisWindow >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ 
        success: false, 
        error: 'Rate limit exceeded. Please try again later.' 
      }, { status: 429 });
    }
    
    // Record this request
    REQUESTS_MAP.set(`${ip}:${now}`, now);
    
    // Parse and validate request body
    const body = await req.json();
    const { 
      bookTitle, 
      author, 
      level, 
      targetGrade, 
      length, 
      rush, 
      realism, 
      sampleText, 
      email 
    } = body;

    // Input validation
    if (!bookTitle || !author || !level || !length || !email) {
      return NextResponse.json({ 
        success: false,
        error: 'Missing required fields' 
      }, { status: 400 });
    }
    
    // Sanitize inputs
    const sanitizedBookTitle = bookTitle.slice(0, 200).trim();
    const sanitizedAuthor = author.slice(0, 100).trim();
    const sanitizedEmail = email.slice(0, 100).trim();
    const sanitizedSampleText = sampleText ? sampleText.slice(0, 2000).trim() : '';
    
    // Generate the book report
    const report = await generateBookReport({
      bookTitle: sanitizedBookTitle,
      author: sanitizedAuthor,
      level,
      targetGrade,
      length,
      realism,
      sampleText: sanitizedSampleText,
    });
    
    // In a production environment, log the order
    // await logOrder({
    //   bookTitle: sanitizedBookTitle,
    //   author: sanitizedAuthor,
    //   level,
    //   targetGrade,
    //   length,
    //   rush,
    //   realism,
    //   email: sanitizedEmail,
    //   report,
    // });
    
    // Send the report via email
    if (process.env.NODE_ENV === 'production') {
      await sendReportEmail({
        email: sanitizedEmail,
        bookTitle: sanitizedBookTitle,
        author: sanitizedAuthor,
        report,
      });
    }

    return NextResponse.json({ 
      success: true, 
      report
    });
  } catch (error: any) {
    console.error('Error generating report:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to generate report' 
    }, { status: 500 });
  }
}

/**
 * Generates a book report using OpenAI
 */
async function generateBookReport({
  bookTitle,
  author,
  level,
  targetGrade,
  length,
  realism = true,
  sampleText = '',
}: {
  bookTitle: string;
  author: string;
  level: string;
  targetGrade?: string;
  length: number;
  realism?: boolean;
  sampleText?: string;
}): Promise<string> {
  // Create education level description
  const educationLevelMap: Record<string, string> = {
    'elementary': 'an elementary school student (grades 1-5)',
    'middle': 'a middle school student (grades 6-8)',
    'high': 'a high school student (grades 9-12)',
    'college': 'a college/university student',
  };
  
  const educationLevel = educationLevelMap[level] || 'a high school student';
  
  // Create grade target description
  const gradeTargetDesc = targetGrade 
    ? `This report should be of ${targetGrade} quality.` 
    : 'This report should be of good quality.';
  
  // Create realism description
  const realismDesc = realism 
    ? 'Include some minor spelling and grammar mistakes that would be typical for a student at this level. Also include occasional awkward phrasing or simple observations along with more insightful ones.' 
    : 'Use perfect spelling and grammar throughout.';
  
  // Create style matching description
  const styleDesc = sampleText 
    ? `Match the writing style of this sample: "${sampleText.substring(0, 500)}..."` 
    : `Use a writing style appropriate for ${educationLevel}.`;
  
  // Create the prompt
  const prompt = `
Generate a book report about "${bookTitle}" by ${author}.
The report should be approximately ${length} words.
This report is for ${educationLevel}.
${gradeTargetDesc}
${realismDesc}

${styleDesc}

The report should include:
1. A brief introduction that mentions the book title, author, and main theme
2. A summary of the plot or key points (without spoiling major endings if fiction)
3. Analysis of main themes or arguments
4. Character analysis (for fiction) or evidence evaluation (for non-fiction)
5. Personal reflection/opinion
6. A conclusion that wraps up the main points

Make the report feel authentic and at the appropriate education level. Use vocabulary, sentence structure, and insight depth appropriate for ${educationLevel}.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4", // Using GPT-4 for better quality
    messages: [{ role: "system", content: "You are an expert at writing realistic student book reports." }, 
               { role: "user", content: prompt }],
    temperature: 0.7, // Some creative variation
    max_tokens: length * 4, // Estimate: 4 tokens per word on average
  });

  const reportText = response.choices[0]?.message?.content;

  if (!reportText) {
    throw new Error("Failed to generate book report");
  }

  return reportText;
}

/**
 * Sends the report via email
 */
async function sendReportEmail({
  email,
  bookTitle,
  author,
  report,
}: {
  email: string;
  bookTitle: string;
  author: string;
  report: string;
}): Promise<void> {
  try {
    await resend.emails.send({
      from: 'RushMyBookReport <reports@rushmybookreport.com>',
      to: email,
      subject: `Your Book Report for "${bookTitle}" is Ready!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0a0a0a; color: #4ade80; padding: 20px; text-align: center; font-family: monospace;">
            <h1>Your Book Report is Ready!</h1>
          </div>
          
          <div style="padding: 20px; border: 1px solid #4ade80; margin: 20px 0;">
            <h2>Book Report: ${bookTitle}</h2>
            <p>Author: ${author}</p>
            
            <div style="white-space: pre-wrap; margin-top: 20px; padding: 20px; background-color: #f9fafb; border: 1px solid #e5e7eb;">
              ${report}
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>Thank you for using RushMyBookReport!</p>
            <p>If you need any revisions or have questions, please reply to this email.</p>
            <p>© ${new Date().getFullYear()} RushMyBookReport. All rights reserved.</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw - we don't want to fail the API call if just the email fails
  }
}

// For GET requests (e.g., health checks)
export async function GET() {
  return NextResponse.json({ 
    status: 'available',
    message: 'Book report generation API is running',
  });
}