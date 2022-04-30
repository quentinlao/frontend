import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';

import { User } from '../entity/User';

/**
 * User controller
 * route /user
 */
class UserController {
    // all content
    static all = async (req: Request, res: Response) => {
        res.status(200).send('Public Content.');
    };

    // admin content
    static admin = async (req: Request, res: Response) => {
        res.status(200).send('Admin Content.');
    };

    // findAll users object content
    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find({
            select: ['id', 'email', 'role'], //We dont want to send the passwords on response
        });
        res.status(200).send(users);
    };

    // find one user /:id
    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get the user from database
        const userRepository = AppDataSource.getRepository(User);
        try {
            const user = await userRepository.findOneByOrFail({ id });
            res.status(200).send(user);
        } catch (error) {
            res.status(404).send({
                error: error,
                message: 'Error : user not found',
            });
        }
    };

    // create new user
    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { email, password, role } = req.body;
        let user = new User();
        user.email = email;
        user.password = password;
        user.role = role;

        //valide if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send({
                errors: errors,
                message: 'Error : user parameters',
            });
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the username is already in use
        const userRepository = AppDataSource.getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send({ message: 'Error username already in use' });
            return;
        }

        //If all ok, send 201 response
        res.status(201).send('Success User created');
    };

    static editUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { email, role } = req.body;

        //Try to find user on database
        const userRepository = AppDataSource.getRepository(User);
        let user;
        try {
            user = await userRepository.findOneByOrFail({ id });
        } catch (error) {
            //If not found, send a 404 response
            res.status(400).send({
                errors: error,
                message: 'Error : user not found',
            });
            return;
        }

        //Validate the new values on model
        user.email = email;
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send({
                errors: errors,
                message: 'Error : Invalid payload email or role',
            });
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send('username already in use');
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send(user);
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneByOrFail({ id });
        } catch (error) {
            res.status(400).send({
                errors: error,
                message: 'Error : user not found',
            });
            return;
        }
        userRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
}

export default UserController;
