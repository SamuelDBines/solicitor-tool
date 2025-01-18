import { Router } from 'express';
import { Client } from '@microsoft/microsoft-graph-client';

const eventRouter = Router();

const getClient = (accessToken: string) => {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
};

eventRouter.get('/outlook/events', async (req, res) => {
  // @ts-ignore
  const accessToken = req.session.tokens;

  if (!accessToken) {
    res.status(401).send('Outlook Calendar not connected');
    return;
  }

  const client = getClient(accessToken);

  try {
    const events = await client.api('/me/events').get();
    res.status(200).json(events.value);
  } catch (error) {
    console.error('Error fetching Outlook events:', error.message);
    res.status(500).send('Failed to fetch events');
  }
});

eventRouter.post('/outlook/create', async (req, res) => {
  const { subject, start, end, body } = req.body;
  // @ts-ignore
  const accessToken = req.session.tokens;

  if (!accessToken) {
    res.status(401).send('Outlook Calendar not connected');
    return;
  }

  const client = getClient(accessToken);

  try {
    const event = await client.api('/me/events').post({
      subject,
      start: { dateTime: start, timeZone: 'UTC' },
      end: { dateTime: end, timeZone: 'UTC' },
      body: { contentType: 'HTML', content: body },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating Outlook event:', error.message);
    res.status(500).send('Failed to create event');
  }
});

eventRouter.delete('/outlook/:eventId', async (req, res) => {
  const { eventId } = req.params;
  // @ts-ignore
  const accessToken = req.session.tokens;

  if (!accessToken) {
    res.status(401).send('Outlook Calendar not connected');
    return;
  }

  const client = getClient(accessToken);

  try {
    await client.api(`/me/events/${eventId}`).delete();
    res.status(200).send({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting Outlook event:', error.message);
    res.status(500).send('Failed to delete event');
  }
});

export default eventRouter;

