import { Router } from "express";
import { UtilisateurController } from "../controllers/utilisateurController.js";

const routerUtilisateur = Router();

// Get all utilisateurs
routerUtilisateur.get("/", UtilisateurController.getUtilisateurs);

// Get an utilisateur by ID
routerUtilisateur.get("/:id_utilisateur", UtilisateurController.getUtilisateurById);

// Add a new utilisateur
routerUtilisateur.post("/", UtilisateurController.createUtilisateur);

// Update information of an utilisateur
routerUtilisateur.put("/:id_utilisateur", UtilisateurController.updateUtilisateur);

// Delete an utilisateur
routerUtilisateur.delete("/:id_utilisateur", UtilisateurController.deleteUtilisateur);

export default routerUtilisateur;