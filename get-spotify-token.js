/**
 * Spotify Token Helper Script
 *
 * This script helps you obtain a Spotify refresh token for your portfolio website.
 *
 * SETUP STEPS:
 *
 * 1. Go to https://developer.spotify.com/dashboard
 * 2. Log in with your Spotify account
 * 3. Click "Create app"
 * 4. Fill in:
 *    - App name: "My Portfolio - NowPlaying"
 *    - App description: "Shows currently playing music on my portfolio"
 *    - Redirect URI: http://localhost:3000/api/callback
 *    - Check "Web API"
 * 5. Click "Save"
 * 6. Go to Settings and copy your Client ID and Client Secret
 * 7. Replace CLIENT_ID and CLIENT_SECRET below with your values
 *
 * USAGE:
 *
 * Step 1: Run this script to get the authorization URL
 *   node get-spotify-token.js
 *
 * Step 2: Open the URL in your browser and authorize
 *
 * Step 3: Copy the 'code' parameter from the redirect URL
 *
 * Step 4: Run the script again with the code
 *   node get-spotify-token.js YOUR_CODE_HERE
 *
 * Step 5: Save the refresh token to your .env.local file
 */

// @ts-nocheck

// ===== CONFIGURATION =====
// Replace these with your Spotify App credentials
const CLIENT_ID = '87ea8a74ff6f409eae6fe45a2bfffe69';
const CLIENT_SECRET = '780e54cd0ba746d9b5fe0a8803091feb';
const REDIRECT_URI = 'http://127.0.0.1:3000/api/callback';

// Required Spotify API scopes
const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
];

// ===== SCRIPT LOGIC =====

function generateAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    show_dialog: 'true',
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/**
 * @param {string} code
 */
async function exchangeCodeForToken(code) {
  const authHeader = 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authHeader,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Spotify API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('\n❌ Error exchanging code for token:', errorMessage);
    process.exit(1);
  }
}

async function main() {
  console.log('\n🎵 Spotify Token Helper for Portfolio Website\n');
  console.log('='.repeat(60));

  // Check if credentials are configured
  // Note: Update the placeholder strings below if you're using different credentials
  const placeholderClientId = 'YOUR_CLIENT_ID_HERE';
  const placeholderSecret = 'YOUR_CLIENT_SECRET_HERE';
  if (CLIENT_ID === placeholderClientId || CLIENT_SECRET === placeholderSecret) {
    console.log('\n⚠️  Please configure your Spotify credentials first!\n');
    console.log('1. Open this file: get-spotify-token.js');
    console.log('2. Replace CLIENT_ID with your Spotify App Client ID');
    console.log('3. Replace CLIENT_SECRET with your Spotify App Client Secret');
    console.log('\nGet these from: https://developer.spotify.com/dashboard\n');
    process.exit(1);
  }

  const code = process.argv[2];

  if (!code) {
    // Step 1: Generate authorization URL
    const authUrl = generateAuthUrl();

    console.log('\n📝 STEP 1: Get Authorization Code\n');
    console.log('Open this URL in your browser:\n');
    console.log('\x1b[36m%s\x1b[0m\n', authUrl);
    console.log('1. Log in with your Spotify account');
    console.log('2. Click "Agree" to authorize the app');
    console.log('3. You will be redirected to a URL like:');
    console.log('   http://127.0.0.1:3000/api/callback?code=XXXXXXX');
    console.log('\n4. Copy the "code" parameter from that URL\n');
    console.log('📝 STEP 2: Run this script again with the code:\n');
    console.log('\x1b[33m%s\x1b[0m\n', '   node get-spotify-token.js YOUR_CODE_HERE');
    console.log('='.repeat(60) + '\n');
  } else {
    // Step 2: Exchange code for tokens
    console.log('\n🔄 Exchanging authorization code for tokens...\n');

    const tokenData = await exchangeCodeForToken(code);

    console.log('✅ Success! Tokens obtained:\n');
    console.log('='.repeat(60));
    console.log('\n📋 Add these to your .env.local file:\n');
    console.log('\x1b[32m%s\x1b[0m', 'NEXT_PUBLIC_SPOTIFY_CLIENT_ID=' + CLIENT_ID);
    console.log('\x1b[32m%s\x1b[0m', 'NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=' + CLIENT_SECRET);
    console.log('\x1b[32m%s\x1b[0m', 'NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN=' + tokenData.refresh_token);
    console.log('\n='.repeat(60));
    console.log('\n💡 Next steps:\n');
    console.log('1. Create a file named ".env.local" in your project root');
    console.log('2. Copy the three lines above into that file');
    console.log('3. Restart your dev server: npm run dev');
    console.log('4. Play a song on Spotify and check your website!\n');
    console.log('🔒 IMPORTANT: Add .env.local to .gitignore to keep credentials private\n');
  }
}

main();
