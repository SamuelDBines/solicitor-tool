import { Router } from 'express';
import prisma from '../../utils/prisma'; // Prisma client
import { auth } from '../../utils/auth'; // Authentication middleware
import { idParamCheck } from '../../utils/helpers'; // Helper for ID validation

const taskRouter = Router();

// Get all tasks for a specific person group (auth required)
taskRouter.get('/group/:groupId', auth, idParamCheck, async (req, res) => {
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
      include: {
        tasks: true, // Include all tasks for the group
      },
    });

    if (!personGroup) {
      res.status(404).json({ message: 'Person group not found or unauthorized' });
      return;
    }

    res.status(200).json(personGroup.tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Get a specific task by ID (auth required)
taskRouter.get('/:taskId', auth, idParamCheck, async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        personGroup: {
          members: {
            some: {
              userId: req.user.id,
            },
          },
        },
      },
      include: {
        member: true, // Include associated members
        events: true, // Include associated events
      },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error.message);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
});

// Create a new task for a specific person group (auth required)
taskRouter.post('/group/:groupId', auth, idParamCheck, async (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  const data: { name: string; description?: string; type: string; } = req.body;

  if (!data.name || !data.type) {
    res.status(400).json({ message: 'Task name and type are required' });
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

    const task = await prisma.task.create({
      data: {
        name: data.name,
        description: data.description || null,
        type: data.type,
        personGroupId: groupId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// Update a task by ID (auth required)
taskRouter.put('/:taskId', auth, idParamCheck, async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const data: { name?: string; description?: string; type?: string; } = req.body;

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        personGroup: {
          members: {
            some: {
              userId: req.user.id,
            },
          },
        },
      },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// Delete a task by ID (auth required)
taskRouter.delete('/:taskId', auth, idParamCheck, async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        personGroup: {
          members: {
            some: {
              userId: req.user.id,
            },
          },
        },
      },
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

export default taskRouter;
