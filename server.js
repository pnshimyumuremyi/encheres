import express, { json, urlencoded } from "express";
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routerRoles from './routers/routerRole.js';
import routerUtilisateur from './routers/routerUtilisateur.js';
import routerCompte from './routers/routerCompte.js';
import routerCommentaires from './routers/routerCommentaire.js';
import routerOffres from './routers/routerOffre.js';
import routerEncheres from './routers/routerEnchere.js';



dotenv.config();


const PORT = process.env.PORT || 3000;

// Création du serveur
const app = express();
 
// Ajout de middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Node.js avec Express, CORS, Compression et Helmet !');
});


app.use("/api/role",routerRoles);
app.use("/api/utilisateur",routerUtilisateur);
app.use("/api/compte",routerCompte);
app.use("/api/commentaire",routerCommentaires);
app.use("/api/offre",routerOffres);
app.use("/api/enchere",routerEncheres);

app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
