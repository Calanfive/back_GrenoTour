import express from "express";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize} from "sequelize";
import { CaracteristiquesModel } from "./model/Caracteristiques";
import { ItineraireModel } from "./model/Itineraire";
import { LieuModel } from "./model/Lieu";
import { PrefModel } from "./model/Pref";
import { UserModel } from "./model/User";
import{TokenBlackListModel} from "./model/TokenBlackList";
import { authRouter } from "./router/route.authentification";
import { lieuRouter } from "./router/route.lieu";
import { userRouter } from "./router/route.user";
import { logger } from "./D_winston/winston";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000
const database = process.env.POSTGRES_DB as string
const username = process.env.POSTGRES_USER as string
const password = process.env.POSTGRES_PASSWORD
const host = process.env.POSTGRES_HOST
const portPostgres = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT as string) : 5432

logger.debug({
  level: "debug",
  message: "un bug dans le système " + port,
  color: "blue"
})

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
  logger.log({
    level: "http",
    message: "BDD sur Neon",
  })
  console.log('BDD Neon');
}
else {
  mySequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./BDD.sqlite",
  })

  logger.log({
    level: "http",
    message: "BDD en local BDD/sqlite sur le port:" + port,
  })

  console.log('BDD local/sqlite');
}


export const Caracteristiques = CaracteristiquesModel(mySequelize)
export const Itineraire = ItineraireModel(mySequelize)
export const Lieu = LieuModel(mySequelize)
export const Pref = PrefModel(mySequelize)
export const User = UserModel(mySequelize)
export const TokenBlackList = TokenBlackListModel(mySequelize);

// Association des tables
Lieu.belongsToMany(Caracteristiques, { through: 'caract_lieu', timestamps: false});
Caracteristiques.belongsToMany(Lieu, { through: 'caract_lieu', timestamps: false});
Lieu.belongsToMany(Itineraire, { through: 'point_de_passage', timestamps: false});
Itineraire.belongsToMany(Lieu, { through: 'point_de_passage', timestamps: false});
Itineraire.belongsToMany(User, { through: 'favoris', timestamps: false});
User.belongsToMany(Itineraire, { through: 'favoris', timestamps: false});
User.hasOne(Pref);
Pref.belongsTo(User);
Itineraire.hasMany(User, {foreignKey: "itineraire_id"});
User.belongsTo(Itineraire, {foreignKey: "itineraire_id"});

mySequelize.sync({force: true})
// mySequelize.sync()

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
apiRouter.use('/lieu', lieuRouter);
apiRouter.use('/user', userRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log('serveur running on port : ' + port);
})