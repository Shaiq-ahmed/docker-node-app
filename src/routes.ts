import express, { Request, Response } from "express";
import Task from "./models/Task";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

export default router;
