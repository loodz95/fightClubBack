import * as express from "express";
import * as dotenv from "dotenv";
import { HeroController } from "./controllers/HeroController";
import * as path from "path";
import heroRouter from "./routes/HeroRoute";
import { AppDataSource } from "./data-source";
import bodyParser = require("body-parser");
import * as cors from "cors";
// Pour des raisons de sécurité, les requêtes HTTP multi-origine émises depuis les scripts sont restreintes. 
// Ainsi, XMLHttpRequest et l'API Fetch respectent la règle d'origine unique. Cela signifie qu'une application 
// web qui utilise ces API peut uniquement émettre des requêtes vers la même origine que celle à partir de laquelle 
// l'application a été chargée, sauf si des en-têtes CORS sont utilisés.

// Init environment variables (see .env.local file if it doesn't exist go to README.md file)
dotenv.config({ path: ".env.local" });

AppDataSource.initialize()
  .then(async () => {
    // Express server creation
    const app = express();
    const port = process.env.PORT || 8080;
    app.use(cors());

    app.use(bodyParser.json());
    // Set a static folder for assets
    app.use(
      "/assets",
      express.static(path.join(__dirname, "../public/assets"))
    );

    /************************************************
     * Data's routes
     */
    app.use("/api/heros", heroRouter);

    // Bind express server on port 3004
    app.listen(port, () => {
      console.log(
        `Express server has started on port ${port}. Open http://localhost:${port} to see results`
      );
    });
  })
  .catch((error) => console.log(error));
