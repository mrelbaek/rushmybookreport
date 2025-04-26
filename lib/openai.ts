import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ReportInput {
  bookTitle: string;
  author: string;
  level: string;
  length: number;
  sampleText?: string;
}

export async function generateReport({ bookTitle, author, level, length, sampleText }: ReportInput) {
  let styleInstruction = sampleText
    ? `Match the writing style of the following sample:\n\n"${sampleText}"`
    : "Use a simple, school-appropriate writing style.";

  const prompt = `
Write a book report about "${bookTitle}" by ${author}.
The report should be approximately ${length} words long.
It is intended for a student at the ${level} level.
${styleInstruction}
Focus on summarizing the key events and main themes, and use age-appropriate language.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const report = response.choices[0]?.message?.content;

  if (!report) {
    throw new Error("Failed to generate book report");
  }

  return report;
}
