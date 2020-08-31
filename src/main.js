import routes from './routes';
import express from 'express';
import mustacheExpress from 'mustache-express';
import path from "path";

const server = express();

async function startApp()  {
    try {
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // server.use(helmet());

        server.engine("html", mustacheExpress());
        server.set("view engine", "mustache");
        server.set("views", path.join(__dirname, "../build"));

        // setup routes
        server.use("/tiltak-refusjon", routes.setup());

        server.get('/test', (req, res) => {
            res.send('heihei fra main');
        });

        const port = 3000;
        server.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        console.error('Error during start-up', error);
    }
}

startApp().catch(err => console.log(err));
