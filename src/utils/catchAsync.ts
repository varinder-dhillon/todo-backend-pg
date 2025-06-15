import { Request, Response, NextFunction, RequestHandler  } from 'express';

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsync = (fn:Controller): RequestHandler => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

export default catchAsync;