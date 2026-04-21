# Meeting Analyzer

A meeting app that listens to conversations, transcribes them using OpenAI Whisper, and scores how work-relevant the discussion was using GPT-4.

## Built With
- [LiveKit Meet](https://github.com/livekit-examples/meet) — video conferencing
- OpenAI Whisper — speech to text
- GPT-4o — work relevance scoring
- Next.js

## How It Works
1. Join a meeting room
2. Talk during the meeting
3. Click Leave when done
4. Get redirected to a dashboard showing:
   - Work relevance score (0-10)
   - Meeting verdict (on-topic / mixed / off-topic)
   - Topics discussed
   - Full transcript

## Setup

1. Clone the repo
2. Install dependencies:
```bash
   pnpm install
```
3. Copy `.env.example` to `.env.local` and fill in:
```env
   LIVEKIT_URL=wss://your-project.livekit.cloud
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret
   OPENAI_API_KEY=your_openai_key
```
4. Run:
```bash
   pnpm dev
```
