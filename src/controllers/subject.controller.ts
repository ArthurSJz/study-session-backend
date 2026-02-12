import { Request, Response } from "express";
import prisma from "../prisma";
import { CreateSubjectBody, UpdateSubjectBody, IdParam } from "../types";

// GET /api/subjects
export const getAllSubjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const subjects = await prisma.subject.findMany({
      include: { sessions: true },
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

// GET /api/subjects/:id
export const getSubjectById = async (req: Request<IdParam>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const subject = await prisma.subject.findUnique({
      where: { id: Number(id) },
      include: { sessions: true },
    });
    if (!subject) {
      res.status(404).json({ error: "Subject not found" });
      return;
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subject" });
  }
};

// POST /api/subjects
export const createSubject = async (req: Request<{}, {}, CreateSubjectBody>, res: Response): Promise<void> => {
  try {
    const { name, description, color } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const subject = await prisma.subject.create({
      data: { name, description, color },
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subject" });
  }
};

// PUT /api/subjects/:id
export const updateSubject = async (req: Request<IdParam, {}, UpdateSubjectBody>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, color } = req.body;
    const subject = await prisma.subject.update({
      where: { id: Number(id) },
      data: { name, description, color },
    });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subject" });
  }
};

// DELETE /api/subjects/:id
export const deleteSubject = async (req: Request<IdParam>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.subject.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
};