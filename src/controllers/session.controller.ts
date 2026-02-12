import { Request, Response } from "express";
import prisma from "../prisma";
import { CreateSessionBody, UpdateSessionBody, IdParam } from "../types";

// GET /api/sessions
export const getAllSessions = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sessions = await prisma.studySession.findMany({
      include: { subject: true },
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// GET /api/sessions/:id
export const getSessionById = async (req: Request<IdParam>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const session = await prisma.studySession.findUnique({
      where: { id: Number(id) },
      include: { subject: true },
    });
    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch session" });
  }
};

// POST /api/sessions
export const createSession = async (req: Request<{}, {}, CreateSessionBody>, res: Response): Promise<void> => {
  try {
    const { date, duration, notes, subjectId } = req.body;

    if (!date || !duration || !subjectId) {
      res.status(400).json({ error: "Date, duration and subjectId are required" });
      return;
    }

    const session = await prisma.studySession.create({
      data: { date: new Date(date), duration, notes, subjectId },
      include: { subject: true },
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to create session" });
  }
};

// PUT /api/sessions/:id
export const updateSession = async (req: Request<IdParam, {}, UpdateSessionBody>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { date, duration, notes, subjectId } = req.body;
    const session = await prisma.studySession.update({
      where: { id: Number(id) },
      data: {
        date: date ? new Date(date) : undefined,
        duration,
        notes,
        subjectId,
      },
      include: { subject: true },
    });
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Failed to update session" });
  }
};

// DELETE /api/sessions/:id
export const deleteSession = async (req: Request<IdParam>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.studySession.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete session" });
  }
};