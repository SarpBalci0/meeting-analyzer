'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [transcript, setTranscript] = React.useState<string>('');
  const [score, setScore] = React.useState<any>(null);

  React.useEffect(() => {
    const savedTranscript = localStorage.getItem('lastMeetingTranscript');
    const savedScore = localStorage.getItem('lastMeetingScore');

    if (savedTranscript) setTranscript(savedTranscript);
    if (savedScore) setScore(JSON.parse(savedScore));
  }, []);

  if (!score) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', color: 'white', background: '#111' }}>
        <p>No meeting data yet. Join a meeting first!</p>
        <button onClick={() => router.push('/')} style={{ marginTop: '16px', padding: '10px 20px', cursor: 'pointer' }}>
          Go to Home
        </button>
      </div>
    );
  }

  const scoreColor = score.score >= 7 ? '#22c55e' : score.score >= 4 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Meeting Analysis</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>Here's how work-relevant your meeting was</p>

      {/* Score */}
      <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontSize: '64px', fontWeight: 'bold', color: scoreColor }}>
          {score.score}<span style={{ fontSize: '24px' }}>/10</span>
        </div>
        <div>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>{score.summary}</div>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            background: score.verdict === 'on-topic' ? '#166534' : score.verdict === 'mixed' ? '#78350f' : '#7f1d1d',
          }}>
            {score.verdict}
          </div>
        </div>
      </div>

      {/* Topics */}
      <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '16px' }}>Topics Discussed</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {score.topics?.map((topic: string, i: number) => (
            <span key={i} style={{ background: '#333', padding: '6px 14px', borderRadius: '20px', fontSize: '14px' }}>
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Transcript */}
      <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '16px' }}>Transcript</h2>
        <p style={{ color: '#ccc', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{transcript}</p>
      </div>

      <button
        onClick={() => router.push('/')}
        style={{ padding: '12px 24px', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
      >
        Back to Home
      </button>
    </div>
  );
}