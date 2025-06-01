// pages/api/image/error.js
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: '@vercel/python@4.3.0',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
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
            marginBottom: '30px',
          }}
        >
          😵
        </div>
        
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Oops! Something went wrong
        </div>
        
        <div
          style={{
            fontSize: '24px',
            opacity: 0.9,
            marginBottom: '40px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '20px 40px',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            maxWidth: '600px',
          }}
        >
          Don't worry, these things happen. Let's try again!
        </div>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '20px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            padding: '15px 30px',
            borderRadius: '30px',
            border: '2px solid rgba(255,255,255,0.5)',
          }}
        >
          <span>🔄</span>
          <span>Try Again</span>
        </div>
        
        <div
          style={{
            fontSize: '16px',
            opacity: 0.7,
            marginTop: '30px',
          }}
        >
          Your mood tracking journey continues... 🌟
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
