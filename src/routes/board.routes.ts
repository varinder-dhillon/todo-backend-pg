import express from "express";
import { createBoard, getBoard } from "../controller/board.controller";


const router = express.Router();

router.post("/", createBoard)
router.get("/:id", getBoard)


export default router;