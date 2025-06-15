import { pool } from "../config/database";
import { tasks } from "../constants/constants";
import { status } from "../constants/reqStatus";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const createBoard = catchAsync(async (req, res, next) => {
    
    const createBoardQuery = `INSERT INTO board DEFAULT VALUES RETURNING *;`;
    const createBoardTasksQuery = `INSERT INTO todos  (name, description, boardId, icon, status) VALUES($1, $2, $3, $4, $5) RETURNING *`

    const createBoardQueryResult = await pool.query(createBoardQuery);

    if(!createBoardQueryResult?.rows?.[0]?.id) return next(new AppError("Board is nor created. Please try again later!", status.fail));
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

export const getBoard = catchAsync(async (req, res, next) => {
    const id = Number(req?.params?.id);

    if(!id) next(new AppError("Board id is not present in the Req", status.fail)) 

    // Simple query which will return the data in row base structure                NOTE: After query result also need map and format the data accordingly!
    // const query = `
    //     SELECT 
    //         b.id boardId
    //         b.name name
    //     FROM board b
    //     LEFT JOIN
    //         todos t on b.id = t.boardId
    //     Where b.id = $1;
    // `;

    // Advanced query which which will return the data in json formatter with aggregation functions
    const queryWithAggr = `
        SELECT 
            b.id,
            b.name,
            b.description,
            b.created_at,
            b.updated_at,

            COALESCE(
                Json_agg(
                    Json_build_object(
                        'id', t.id,
                        'name', t.name,
                        'description', t.description,
                        'status', t.status,
                        'icon', t.icon,
                        'boardId', t.boardId,
                        'created_at', t.created_at,
                        'updated_at', t.updated_at
                    )
                ) FILTER (WHERE t.id IS NOT NULL),
                '[]'
            ) as todos
        FROM board b
        LEFT JOIN
            todos t on b.id = t.boardId
        Where b.id = $1
        GROUP BY b.id;
    `;

    const queryResult = await pool.query(queryWithAggr, [id])

    res.status(status.success).json({
        status: "Success",
        message: queryResult.rows.length === 0 ? "No board found with the id!" : 'Retrieved the board data.',
        data: queryResult.rows[0]
    })

})