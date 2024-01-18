import express from "express";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";
import { DataTypes, Sequelize} from "sequelize";
import { CaractLieuModel } from "./model/Caract_lieu";
import { CaracteristiquesModel } from "./model/Caracteristiques";
import { FavorisModel } from "./model/Favoris";
import { ItineraireModel } from "./model/Itineraire";
import { LieuModel } from "./model/Lieu";
import { PointDePassageModel } from "./model/Point_de_passage";
import { PrefModel } from "./model/Pref";
import { UserModel } from "./model/User";
import { authRouter } from "./router/authentification";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000
const database = process.env.POSTGRES_DB as string
const username = process.env.POSTGRES_USER as string
const password = process.env.POSTGRES_PASSWORD
const host = process.env.POSTGRES_HOST
const portPostgres = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT as string) : 5432

let mySequelize: Sequelize

if( process.env.NODE_ENV === "production" ){
  mySequelize = new Sequelize(database, username, password, {
    host: host,
    port: portPostgres,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true, // Exemple d'une option spécifique à PostgreSQL (SSL activé)
      // Autres options spécifiques à PostgreSQL peuvent être ajoutées ici
    }
  });
  console.log('BDD Neon');
}
else {
  mySequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./BDD.sqlite",
  })
  // mySequelize.sync({ force: true })
  console.log('BDD local/sqlite');
}

export const CaractLieu = CaractLieuModel(mySequelize)
export const Caracteristiques = CaracteristiquesModel(mySequelize)
export const Favoris = FavorisModel(mySequelize)
export const Itineraire = ItineraireModel(mySequelize)
export const Lieu = LieuModel(mySequelize)
export const PointDePassage = PointDePassageModel(mySequelize)
export const Pref = PrefModel(mySequelize)
export const User = UserModel(mySequelize)

// Association des tables
Lieu.belongsToMany(Caracteristiques, { through: 'caractlieu'});
Caracteristiques.belongsToMany(Lieu, { through: 'caractlieu' });
Lieu.belongsToMany(Itineraire, { through: 'pointdepassage'});
Itineraire.belongsToMany(Lieu, { through: 'pointdepassage' });
Itineraire.belongsToMany(User, { through: 'favoris'});
User.belongsToMany(Itineraire, { through: 'favoris'});

mySequelize.sync()

function authentification_test() {
  try {
    mySequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
authentification_test()

const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log('serveur running on port : ' + port);
})