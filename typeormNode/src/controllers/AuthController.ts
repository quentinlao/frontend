import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { AppDataSource } from '../data-source';

import { User } from '../entity/User';
import config from '../config/config';

class AuthController {
    static login = async (req: Request, res: Response) => {
        //Check if email and password are set
        let { email, password } = req.body;

        // check payload available
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
                message: 'Error : user not found',
            });
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send({
                accessToken: null,
                message: 'Error : invalid Password',
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
}
export default AuthController;
