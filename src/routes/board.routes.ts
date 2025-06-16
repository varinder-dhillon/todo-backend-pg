import express from "express";
import { createBoard, deleteBoard, getBoard, updateBoard } from "../controller/board.controller";


const router = express.Router();

router.post("/", createBoard)
router.get("/:id", getBoard)
router.patch("/:id", updateBoard)
router.delete("/:id", deleteBoard)


export default router;