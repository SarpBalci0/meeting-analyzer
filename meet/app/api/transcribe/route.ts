import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audio = formData.get('audio') as File;

    if (!audio) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    console.log('Audio received, size:', audio.size);
    console.log('OpenAI key exists:', !!process.env.OPENAI_API_KEY);

    const transcription = await openai.audio.transcriptions.create({
      file: audio,
      model: 'whisper-1',
      language: 'en',
    });

    console.log('Transcription:', transcription.text);
    return NextResponse.json({ text: transcription.text });

  } catch (error) {
    console.error('Transcribe error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}