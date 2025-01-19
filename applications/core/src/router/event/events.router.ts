import { Router } from 'express';
import prisma from '../../utils/prisma'; // Prisma client
import { auth } from '../../utils/auth'; // Authentication middleware

const eventRouter = Router();

// Get all events for a specific person group (auth required)
eventRouter.get('/group/:groupId', auth, async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);

  try {
    const personGroup = await prisma.personGroup.findFirst({
      where: {
        id: groupId,
        members: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });

    const events = await prisma.event.findMany({
      // where: {
      //   members: {
      //     some: {
      //       personGroupId: groupId
      //     }
      //   }
      // }
    });

    if (!personGroup) {
      res.status(404).json({ message: 'Person group not found or unauthorized' });
      return;
    }
    // @ts-ignore
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Get a specific event by ID (auth required)
eventRouter.get('/:eventId', auth, async (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);

  try {
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        members: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        task: true, // Include associated task
        members: true, // Include associated members
      },
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found or unauthorized' });
      return;
    }

    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error.message);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
});

// Create a new event for a specific person group (auth required)
eventRouter.post('/group/:groupId', auth, async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const data: {
    name: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    taskId: string;
  } = req.body;

  const taskId: number = parseInt(data.taskId, 10);

  if (!data.name || !data.startTime || !data.endTime) {
    res.status(400).json({ message: 'Event name, start time, and end time are required' });
    return;
  }

  try {
    const personGroup = await prisma.personGroup.findFirst({
      where: {
        id: groupId,
        members: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });

    if (!personGroup) {
      res.status(404).json({ message: 'Person group not found or unauthorized' });
      return;
    }

    const event = await prisma.event.create({
      data: {
        name: data.name,
        description: data.description || null,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        taskId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// Update an event by ID (auth required)
eventRouter.put('/:eventId', auth, async (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  const data: {
    name?: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
    taskId?: number;
  } = req.body;

  try {
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        members: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found or unauthorized' });
      return;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data,
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error.message);
    res.status(500).json({ message: 'Failed to update event' });
  }
});

// Delete an event by ID (auth required)
eventRouter.delete('/:eventId', auth, async (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);

  try {
    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        members: {
          some: {
            userId: req.user.id,
          },
        },
      },
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found or unauthorized' });
      return;
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error.message);
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

export default eventRouter;
