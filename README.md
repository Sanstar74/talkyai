# AI Talky

Black and light blue AI chat site. It uses OpenRouter's free-model router; model availability and rate limits can change.

## Deploy online without installing Node.js

1. Revoke any API key pasted into chat or shared publicly. Create a fresh key at https://openrouter.ai/settings/keys.
2. Upload this `ai-talky` folder to a GitHub repository (do not upload `.env` or any API key).
3. Import the repository at https://vercel.com/new and deploy. Vercel runs the small `/api/chat` server function; you do not need Node.js installed on your computer.
4. In Vercel, open **Project → Settings → Environment Variables**. Add `OPENROUTER_API_KEY` and paste the fresh key as its value. Save, then redeploy.
5. Open the Vercel URL. The API key remains on the server and is not sent to visitors' browsers.

OpenRouter API documentation: https://openrouter.ai/docs/api/api-reference/chat/send-chat-completion-request
Vercel environment variables: https://vercel.com/docs/environment-variables

## Optional local run

If you later install Node.js 18+, copy `.env.example` to `.env`, set `OPENROUTER_API_KEY`, then run `npm start`.
