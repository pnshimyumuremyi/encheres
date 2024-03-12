import express, { json, urlencoded } from "express";
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import role from "./router/role.js";
import utilisateur from "./router/utilisateur.js";
import compte from "./router/compte.js";
import commentaire from "./router/commentaire.js";
import offre from "./router/offre.js";
import enchere from "./router/enchere.js";
import { authenticateToken } from "./model/auth.js";





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


app.use("/api/role",authenticateToken, role);
app.use("/api/utilisateur",utilisateur);
app.use("/api/compte",authenticateToken, compte);
app.use("/api/commentaire",authenticateToken, commentaire);
app.use("/api/offre",authenticateToken,  offre);
app.use("/api/enchere", authenticateToken, enchere);

app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
