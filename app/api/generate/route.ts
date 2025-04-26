import { NextRequest, NextResponse } from 'next/server';
import { generateReport } from '../../../lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookTitle, author, level, length, rush, sampleText, email } = body;

    if (!bookTitle || !author || !level || !length || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const report = await generateReport({
      bookTitle,
      author,
      level,
      length,
      sampleText,
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
