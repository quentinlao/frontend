import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';

import { User } from '../entity/User';

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;

        //Get user role from the database
        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneByOrFail({ id });
        } catch (error) {
            res.status(401).send({
                error: error,
                message: 'Error user not found',
            });
            return;
        }

        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send({ message: 'Error not authorized' });
    };
};
