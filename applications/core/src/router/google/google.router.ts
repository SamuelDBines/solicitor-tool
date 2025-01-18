import { Router } from 'express';
import { oAuth2Client, SCOPES } from './google.client';

const authRouter = Router();

authRouter.get('/google', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.status(200).json({ url: authUrl });
});

authRouter.get('/google/callback', async (req, res) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // @ts-ignore
    req.session.tokens = tokens;

    res.status(200).send('Google Calendar connected successfully');
  } catch (error) {
    console.error('Error during Google OAuth:', error.message);
    res.status(500).send('Google OAuth failed');
  }
});

export default authRouter;
