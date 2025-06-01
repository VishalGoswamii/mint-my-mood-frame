// pages/api/image/mood-grid.js
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const MOODS = [
  { id: 'happy', emoji: '😊', name: 'Happy', color: '#FFD700' },
  { id: 'excited', emoji: '🤩', name: 'Excited', color: '#FF6B6B' },
  { id: 'calm', emoji: '😌', name: 'Calm', color: '#4ECDC4' },
  { id: 'thoughtful', emoji: '🤔', name: 'Thoughtful', color: '#95A5A6' },
];

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  
  // For simplicity, showing first 4 moods
  const displayMoods = MOODS.slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '40px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          How are you feeling right now?
        </div>
        
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'center',
            maxWidth: '800px',
          }}
        >
          {displayMoods.map((mood, index) => (
            <div
              key={mood.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '30px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                minWidth: '180px',
              }}
            >
              <div
                style={{
                  fontSize: '80px',
                  marginBottom: '15px',
                }}
              >
                {mood.emoji}
              </div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {mood.name}
              </div>
            </div>
          ))}
        </div>
        
        <div
          style={{
            fontSize: '20px',
            opacity: 0.8,
            marginTop: '40px',
            textAlign: 'center',
          }}
        >
          Choose the mood that best represents your current state
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
