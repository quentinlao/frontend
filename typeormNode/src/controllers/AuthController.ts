import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';

class AuthController {
    static login = async (req: Request, res: Response) => {
        //Check if email and password are set
        let { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send();
        }

        //Get user from database
        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({
                where: { email: email },
            });
        } catch (error) {
            res.status(401).send({
                accessToken: null,
                message: 'Error user not found',
            });
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send({
                accessToken: null,
                message: 'Error invalid Password',
            });
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        //Send the jwt in the response
        res.status(200).send({
            accessToken: token,
            message: 'Valid user!',
        });
    };

    static changePassword = async (req: Request, res: Response) => {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        //Get user from the database
        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send();
            return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        //Hash the new password and save
        user.hashPassword();
        userRepository.save(user);

        res.status(204).send();
    };
}
export default AuthController;
