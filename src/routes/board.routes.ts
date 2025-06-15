import express from "express";
import { createBoard, deleteBoard, getBoard } from "../controller/board.controller";


const router = express.Router();

router.post("/", createBoard)
router.get("/:id", getBoard)
router.delete("/:id", deleteBoard)


export default router;