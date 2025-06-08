import { status } from "../constants/reqStatus";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const createBoard = catchAsync(async (req, res, next) => {
    res.status(status.success).json({
        status: "Board created!"
    })
})

