import { z } from "zod";
import { status } from "../constants/reqStatus";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { pool } from "../config/database";
import { TaskSchema } from "../constants/interface";
import { formatZodErrors } from "../utils/zodErrors";


export const createTask = catchAsync(async (req, res, next) => {
  
    const parsed = TaskSchema.safeParse(req.body); 
    if (!parsed.success) {
        const errors = formatZodErrors(parsed.error.format())
        return res.status(400).json({
            status: "fail",
            errors, // <-- clean field-wise error object
            message: "Validation error"
        });
    }

    const query = `INSERT INTO todos
        (name, description, boardId, icon, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const queryVariables = [
        parsed.data.name,
        parsed.data.description,
        parsed.data.boardId,
        parsed.data.icon,
        parsed.data.status || "",
    ];

    const queryResult = await pool.query(query, queryVariables);

    res.status(status.success).json({
        status: "Success",
        data: queryResult.rows[0]
    })
})

export const updateTask = catchAsync(async (req, res, next) => {
    const id = Number(req?.params?.id);

    if (!id) next(new AppError("Task id is not present in the Req", status.fail));

    const parsed = TaskSchema.partial().safeParse(req.body); 
    if (!parsed.success) {
        const errors = formatZodErrors(parsed.error.format())
        return res.status(400).json({
            status: "fail",
            errors, // <-- clean field-wise error object
            message: "Validation error"
        });
    }

    const query = `UPDATE todos
        SET
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            status = COALESCE($3, status),
            icon = COALESCE($4, icon)
        WHERE id = $5 RETURNING *;
    `
    const poolVariables = [
        req.body.name,
        req.body.description,
        req.body.status,
        req.body.icon,
        id,
    ];
    const queryResult = await pool.query(query, poolVariables);

    if (queryResult.rowCount === 0) return next(new AppError(`No task found with id ${id}`, status.notFound));

    res.status(status.success).json({
        status: "Success",
        data: queryResult.rows[0]
    })
        
})

export const deleteTask = catchAsync(async (req, res, next) => {
    const id = Number(req?.params?.id);

    if (!id) next(new AppError("Task id is not present in the Req", status.fail));

    const query = `DELETE FROM todos WHERE id = $1;`;

    const queryResult = await pool.query(query, [id]);
    if (queryResult.rowCount === 0) return next(new AppError(`No task found with id ${id}`, status.notFound));

    res.status(status.success).json({
        status: "Success",
        data: queryResult.rows[0]
    })
})

