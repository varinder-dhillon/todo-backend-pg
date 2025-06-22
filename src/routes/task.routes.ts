import express from "express";
import { updateTask, deleteTask } from "../controller/task.controller";


const router = express.Router();

router.route("/:id")
.patch(updateTask)
.delete(deleteTask);


export default router;