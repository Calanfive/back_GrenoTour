import express from "express";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";
import { DataTypes, Sequelize } from "sequelize";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
  })

// Conserver mes données
sequelize.sync()
// Reset des données
// sequelize.sync({ force: true })

app.get('/random-between/:min/:max', (req, res) => {
    const min = parseInt(req.params.min)
    const max = parseInt(req.params.max)
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    console.log('number' + random);
    res.send(random.toString())
})

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})