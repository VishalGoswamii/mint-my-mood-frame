// pages/api/frame.js (Next.js API route)

const MOODS = [
  { id: 'happy', emoji: '😊', name: 'Happy' },
  { id: 'excited', emoji: '🤩', name: 'Excited' },
  { id: 'calm', emoji: '😌', name: 'Calm' },
  { id: 'thoughtful', emoji: '🤔', name: 'Thoughtful' },
  { id: 'tired', emoji: '😴', name: 'Tired' },
  { id: 'anxious', emoji: '😰', name: 'Anxious' },
  { id: 'grateful', emoji: '🙏', name: 'Grateful' },
  { id: 'creative', emoji: '🎨', name: 'Creative' },
  { id: 'motivated', emoji: '💪', name: 'Motivated' }
];

// In-memory storage (use database in production)
let moodHistory = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Initial frame display
    return res.status(200).send(generateInitialFrame());
  }
  
  if (req.method === 'POST') {
    // Handle button clicks
    const body = await req.body;
    const buttonIndex = body.untrustedData?.buttonIndex;
    const fid = body.untrustedData?.fid; // User's Farcaster ID
    
    // Validate the frame message (important for security)
    // In production, verify the message signature
    
    if (buttonIndex === 1) {
      // Show mood selection
      return res.status(200).send(generateMoodSelectionFrame());
    } else if (buttonIndex >= 2 && buttonIndex <= 10) {
      // User selected a mood
      const selectedMood = MOODS[buttonIndex - 2];
      return res.status(200).send(generateMoodConfirmationFrame(selectedMood, fid));
    } else if (buttonIndex === 11) {
      // Cast mood
      const selectedMoodId = body.untrustedData?.state; // Pass mood via state
      return res.status(200).send(generateSuccessFrame(selectedMoodId, fid));
    }
  }
  
  return res.status(400).send('Invalid request');
}

function generateInitialFrame() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>🎭 Mint My Mood</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://mint-my-mood-frame.vercel.app/api/image/welcome" />
        <meta property="fc:frame:button:1" content="🎭 Track My Mood" />
        <meta property="fc:frame:post_url" content="https://mint-my-mood-frame.vercel.app/api/frame" />
        
        <!-- Open Graph for sharing -->
        <meta property="og:title" content="🎭 Mint My Mood" />
        <meta property="og:description" content="Track and share your daily moods on Farcaster!" />
        <meta property="og:image" content="https://mint-my-mood-frame.vercel.app/api/image/welcome" />
      </head>
      <body>
        <h1>🎭 Mint My Mood</h1>
        <p>A Farcaster Frame for tracking your daily moods!</p>
      </body>
    </html>
  `;
}

function generateMoodSelectionFrame() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://mint-my-mood-frame.vercel.app/api/image/mood-grid" />
        <meta property="fc:frame:button:1" content="😊 Happy" />
        <meta property="fc:frame:button:2" content="🤩 Excited" />
        <meta property="fc:frame:button:3" content="😌 Calm" />
        <meta property="fc:frame:button:4" content="🤔 Thoughtful" />
        <meta property="fc:frame:post_url" content="https://mint-my-mood-frame.vercel.app/api/frame" />
      </head>
      <body>
        <h1>How are you feeling?</h1>
      </body>
    </html>
  `;
}

function generateMoodConfirmationFrame(mood, fid) {
  // Store the selected mood temporarily
  const timestamp = Date.now();
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://mint-my-mood-frame.vercel.app/api/image/mood-confirm?mood=${mood.id}" />
        <meta property="fc:frame:button:1" content="📱 Cast This Mood" />
        <meta property="fc:frame:button:2" content="🔄 Choose Different" />
        <meta property="fc:frame:state" content="${mood.id}" />
        <meta property="fc:frame:post_url" content="https://mint-my-mood-frame.vercel.app/api/frame" />
      </head>
      <body>
        <h1>You're feeling ${mood.name} ${mood.emoji}</h1>
      </body>
    </html>
  `;
}

function generateSuccessFrame(moodId, fid) {
  const mood = MOODS.find(m => m.id === moodId);
  
  // Save to mood history
  moodHistory.push({
    fid: fid,
    mood: mood,
    timestamp: new Date(),
    casted: true
  });
  
  // Generate cast text
  const castText = `${mood.emoji} Feeling ${mood.name.toLowerCase()} today! #MoodTracker #${mood.name}`;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://mint-my-mood-frame.vercel.app/api/image/success?mood=${moodId}" />
        <meta property="fc:frame:button:1" content="🎭 Track Another Mood" />
        <meta property="fc:frame:button:2" content="📊 View History" />
        <meta property="fc:frame:post_url" content="https://mint-my-mood-frame.vercel.app/api/frame" />
      </head>
      <body>
        <h1>Mood Shared Successfully! 🎉</h1>
        <p>Cast: "${castText}"</p>
      </body>
    </html>
  `;
}
