import { pool } from "../config/database";
import { tasks } from "../constants/constants";
import { status } from "../constants/reqStatus";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const createBoard = catchAsync(async (req, res, next) => {
    
    const createBoardQuery = `INSERT INTO board DEFAULT VALUES RETURNING *;`;
    const createBoardTasksQuery = `INSERT INTO todos  (name, description, boardId, icon, status) VALUES($1, $2, $3, $4, $5) RETURNING *`

    const createBoardQueryResult = await pool.query(createBoardQuery);

    if(!createBoardQueryResult?.rows?.[0]?.id) return new AppError("Board is nor created. Please try again later!", status.fail)
    const boardId = createBoardQueryResult?.rows?.[0]?.id;
    const createBoardTasksQueryResult = await Promise.all(
        tasks.map((item) => {
            return pool
                .query(createBoardTasksQuery, [
                    item.name,
                    item.description,
                    boardId,
                    item.icon,
                    item.status
                ])
                .then(res => res.rows[0] || {});
        })
    );

    res.status(status.success).json({
        status: "Board created!",
        data: {
            board: {
                ...createBoardQueryResult.rows?.[0],
                todos: createBoardTasksQueryResult
            }
        }
    })
})

