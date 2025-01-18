import { Router } from 'express';
import msalClient from '../../utils/microsoftClient';

const authRouter = Router();

authRouter.get('/outlook', (req, res) => {
  const authUrl = msalClient.getAuthCodeUrl({
    scopes: ['https://graph.microsoft.com/Calendars.ReadWrite'],
    redirectUri: process.env.MS_REDIRECT_URI,
  });

  res.status(200).json({ url: authUrl });
});

authRouter.get('/outlook/callback', async (req, res) => {
  const code = req.query.code as string;

  try {
    const tokenResponse = await msalClient.acquireTokenByCode({
      code,
      scopes: ['https://graph.microsoft.com/Calendars.ReadWrite'],
      redirectUri: process.env.MS_REDIRECT_URI,
    });

    // Save tokens to the user's session or database
    req.session.tokens = tokenResponse.accessToken;

    res.status(200).send('Outlook Calendar connected successfully');
  } catch (error) {
    console.error('Error during Microsoft OAuth:', error.message);
    res.status(500).send('Microsoft OAuth failed');
  }
});

export default authRouter;
