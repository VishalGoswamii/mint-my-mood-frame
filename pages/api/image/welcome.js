// pages/api/image/welcome.js
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: '120px',
            marginBottom: '20px',
          }}
        >
          🎭
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Mint My Mood
        </div>
        <div
          style={{
            fontSize: '32px',
            opacity: 0.9,
            marginBottom: '40px',
            maxWidth: '600px',
            lineHeight: 1.3,
          }}
        >
          Track and share your daily emotional journey on Farcaster
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '24px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '20px 40px',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span>✨</span>
          <span>Click "Track My Mood" to get started</span>
          <span>✨</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
