import { Router } from 'express';
import { google } from 'googleapis';

const eventRouter = Router();

eventRouter.post('/google/create', async (req, res) => {
  const { summary, description, start, end } = req.body;

  // @ts-ignore
  const tokens = req.session.tokens;

  if (!tokens) {
    res.status(401).send('Google Calendar not connected');
    return;
  }

  const calendar = google.calendar({ version: 'v3', auth: tokens });

  try {
    const event = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary,
        description,
        start: { dateTime: start, timeZone: 'UTC' },
        end: { dateTime: end, timeZone: 'UTC' },
      },
    });

    res.status(201).json(event.data);
  } catch (error) {
    console.error('Error creating Google Calendar event:', error.message);
    res.status(500).send('Failed to create event');
  }
});

eventRouter.get('/google/events', async (req, res) => {
  // @ts-ignore
  const tokens = req.session.tokens;

  if (!tokens) {
    res.status(401).send('Google Calendar not connected');
    return;
  }

  const calendar = google.calendar({ version: 'v3', auth: tokens });

  try {
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.status(200).json(events.data.items);
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error.message);
    res.status(500).send('Failed to fetch events');
  }
});


export default eventRouter;