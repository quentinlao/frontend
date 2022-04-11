import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const authorization = req.headers['authorization'];

    if (!authorization) {
        return res.status(403).send({
            message: 'No token provided!',
        });
    }
    // bearer token
    const token = authorization.split(' ')[1];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).send({
            error: error,
            message: 'Unauthorized!',
        });
    }
    next();
};
