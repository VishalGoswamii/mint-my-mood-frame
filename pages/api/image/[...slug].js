// pages/api/image/[...slug].js
import { ImageResponse } from 'next/og';

export const config = {
  runtime: 'edge',
};

const MOODS = {
  happy: { emoji: '😊', name: 'Happy', color: '#FFD700' },
  excited: { emoji: '🤩', name: 'Excited', color: '#FF6B6B' },
  calm: { emoji: '😌', name: 'Calm', color: '#4ECDC4' },
  thoughtful: { emoji: '🤔', name: 'Thoughtful', color: '#A8E6CF' },
  tired: { emoji: '😴', name: 'Tired', color: '#B8B8B8' },
  anxious: { emoji: '😰', name: 'Anxious', color: '#FFB347' },
  grateful: { emoji: '🙏', name: 'Grateful', color: '#DDA0DD' },
  creative: { emoji: '🎨', name: 'Creative', color: '#FF69B4' },
  motivated: { emoji: '💪', name: 'Motivated', color: '#32CD32' }
};

export default function handler(req) {
  const { slug } = req.nextUrl.searchParams;
  const [imageType, ...params] = slug;
  
  try {
    if (imageType === 'welcome') {
      return new ImageResponse(generateWelcomeImage(), {
        width: 1200,
        height: 630,
      });
    }
    
    if (imageType === 'mood-grid') {
      return new ImageResponse(generateMoodGridImage(), {
        width: 1200,
        height: 630,
      });
    }
    
    if (imageType === 'mood-confirm') {
      const mood = req.nextUrl.searchParams.get('mood');
      return new ImageResponse(generateMoodConfirmImage(mood), {
        width: 1200,
        height: 630,
      });
    }
    
    if (imageType === 'success') {
      const mood = req.nextUrl.searchParams.get('mood');
      return new ImageResponse(generateSuccessImage(mood), {
        width: 1200,
        height: 630,
      });
    }
    
  } catch (e) {
    console.log(e.message);
    return new Response('Failed to generate image', { status: 500 });
  }
}

function generateWelcomeImage() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: 60,
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 120, marginBottom: 20 }}>🎭</div>
      <div>Mint My Mood</div>
      <div style={{ fontSize: 32, fontWeight: 400, marginTop: 20 }}>
        Track your daily vibes on Farcaster
      </div>
      <div style={{ 
        fontSize: 24, 
        marginTop: 40, 
        padding: '10px 30px', 
        border: '2px solid white', 
        borderRadius: 30 
      }}>
        Click to start tracking! 👆
      </div>
    </div>
  );
}

function generateMoodGridImage() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontSize: 48,
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 80, marginBottom: 30 }}>🎭</div>
      <div style={{ marginBottom: 40 }}>How are you feeling today?</div>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 20, 
        justifyContent: 'center',
        maxWidth: 800 
      }}>
        {Object.entries(MOODS).slice(0, 4).map(([key, mood]) => (
          <div key={key} style={{
            background: 'white',
            color: '#333',
            padding: '20px',
            borderRadius: '15px',
            fontSize: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '40px' }}>{mood.emoji}</span>
            {mood.name}
          </div>
        ))}
      </div>
      
      <div style={{ fontSize: 24, marginTop: 30, opacity: 0.9 }}>
        Choose one of the options below 👇
      </div>
    </div>
  );
}

function generateMoodConfirmImage(moodId) {
  const mood = MOODS[moodId];
  if (!mood) return generateWelcomeImage();
  
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${mood.color} 0%, #764ba2 100%)`,
        fontSize: 48,
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 150, marginBottom: 30 }}>{mood.emoji}</div>
      <div style={{ marginBottom: 20 }}>You're feeling</div>
      <div style={{ fontSize: 80, marginBottom: 40 }}>{mood.name}</div>
      
      <div style={{ 
        fontSize: 28, 
        background: 'rgba(255,255,255,0.2)', 
        padding: '15px 30px', 
        borderRadius: 20,
        marginBottom: 30
      }}>
        Ready to share this mood?
      </div>
      
      <div style={{ fontSize: 24, opacity: 0.9 }}>
        Cast it to your followers or choose different 👇
      </div>
    </div>
  );
}

function generateSuccessImage(moodId) {
  const mood = MOODS[moodId];
  if (!mood) return generateWelcomeImage();
  
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)',
        fontSize: 48,
        fontWeight: 700,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 100, marginBottom: 30 }}>🎉</div>
      <div style={{ marginBottom: 20 }}>Mood Shared Successfully!</div>
      
      <div style={{ 
        background: 'rgba(255,255,255,0.2)', 
        padding: '20px', 
        borderRadius: 15,
        marginBottom: 30,
        fontSize: 36
      }}>
        {mood.emoji} {mood.name}
      </div>
      
      <div style={{ fontSize: 24, opacity: 0.9, marginBottom: 20 }}>
        Your vibe is now live on Farcaster! ✨
      </div>
      
      <div style={{ fontSize: 20, opacity: 0.8 }}>
        Track another mood or view your history 👇
      </div>
    </div>
  );
}
