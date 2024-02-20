import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routerRoles from './routers/routerRole.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Gestion des requêtes CORS
app.use(compression()); // Compression des réponses
app.use(helmet()); // Sécurisation des en-têtes HTTP

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Node.js avec Express, CORS, Compression et Helmet !');
});


app.use("/api/role",routerRoles);


app.listen(PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
