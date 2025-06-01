// pages/api/image/success.js
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const MOODS = {
  'happy': { emoji: '😊', name: 'Happy' },
  'excited': { emoji: '🤩', name: 'Excited' },
  'calm': { emoji: '😌', name: 'Calm' },
  'thoughtful': { emoji: '🤔', name: 'Thoughtful' },
  'tired': { emoji: '😴', name: 'Tired' },
  'anxious': { emoji: '😰', name: 'Anxious' },
  'grateful': { emoji: '🙏', name: 'Grateful' },
  'creative': { emoji: '🎨', name: 'Creative' },
  'motivated': { emoji: '💪', name: 'Motivated' }
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const moodId = searchParams.get('mood') || 'happy';
  const mood = MOODS[moodId] || MOODS.happy;

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
          position: 'relative',
        }}
      >
        {/* Celebration elements */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '100px',
            fontSize: '60px',
            animation: 'bounce 2s infinite',
          }}
        >
          🎉
        </div>
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '120px',
            fontSize: '50px',
          }}
        >
          ✨
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '150px',
            fontSize: '40px',
          }}
        >
          🌟
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '120px',
            right: '100px',
            fontSize: '55px',
          }}
        >
          🎊
        </div>
        
        <div
          style={{
            fontSize: '120px',
            marginBottom: '20px',
          }}
        >
          {mood.emoji}
        </div>
        
        <div
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Mood Shared Successfully!
        </div>
        
        <div
          style={{
            fontSize: '24px',
            opacity: 0.9,
            marginBottom: '30px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '15px 30px',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
          }}
        >
          Your {mood.name.toLowerCase()} mood is now on Farcaster! 🚀
        </div>
        
        <div
          style={{
            display: 'flex',
            gap: '30px',
            fontSize: '18px',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.3)',
              padding: '12px 25px',
              borderRadius: '25px',
              border: '2px solid rgba(255,255,255,0.5)',
            }}
          >
            🎭 Track Another Mood
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '12px 25px',
              borderRadius: '25px',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            📊 View My History
          </div>
        </div>
        
        <div
          style={{
            fontSize: '16px',
            opacity: 0.7,
            marginTop: '30px',
          }}
        >
          Keep tracking to build your emotional journey! 💫
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
