import express from "express";
import { updateTask, deleteTask, createTask } from "../controller/task.controller";


const router = express.Router();

router.post("/", createTask)
router.route("/:id")
.patch(updateTask)
.delete(deleteTask);


export default router;