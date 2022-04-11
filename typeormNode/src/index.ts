import { AppDataSource } from './data-source';
import { User } from './entity/User';
import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import * as cors from 'cors';
import routes from './routes';

AppDataSource.initialize()
    .then(async () => {
        // Create a new express application instance
        const app = express();

        // Call midlewares
        app.use(cors());
        app.use(bodyParser.json());
        app.use(helmet());
        app.use('/', routes);

        app.listen(3000, () => {
            console.log('Server started on port 3000!');
        });
        /* 
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.email = 'mod@mod.fr'
    user.role = 'ADMIN'
    user.password = bcrypt.hashSync('123456', 8) 
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")
 */
    })
    .catch((error) => console.log(error));
