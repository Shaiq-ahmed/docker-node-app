import request from "supertest";
import express, { Express} from "express";
import taskRoutes from "../routes";
import mongoose from "mongoose";
import Task, { ITask } from "../models/Task"; // Assuming you have an interface ITask

const app: Express = express();
app.use(express.json());
app.use("/tasks", taskRoutes);

beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect("mongodb://localhost:27017/testdb" as string);
});

afterAll(async () => {
    // Clean up and close the database connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("Task API", () => {
    it("should fetch all tasks", async () => {
        const response = await request(app).get("/tasks"); 
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });

    it("should create a new task", async () => {
        const newTask = { title: "Test Task" }; 
        const response = await request(app)
            .post("/tasks") 
            .send(newTask)
            .set('Content-Type', 'application/json'); 

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newTask.title);
        
    });

    it("should delete a task", async () => {
        const task: ITask = new Task({ title: "Task to delete" });
        const savedTask = await task.save(); 
        const response = await request(app).delete(`/tasks/${savedTask._id}`); 
        // console.log(response.body)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Task deleted");
        
    });
});