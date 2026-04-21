import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'No text provided' }, { status: 400 });
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an assistant that analyzes meeting transcripts.
For the given transcript, return a JSON object with:
- score: a number from 0 to 10 indicating how work-relevant the conversation is (0 = completely off-topic, 10 = fully work-focused)
- summary: a one sentence summary of what was discussed
- topics: an array of main topics discussed
- verdict: either "on-topic", "mixed", or "off-topic"

Respond with ONLY the JSON object, no extra text.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
  });
  
  const raw = response.choices[0].message.content!;
  const cleaned = raw.replace(/```json|```/g, '').trim();
  const result = JSON.parse(cleaned);
  return NextResponse.json(result);
}