import { Router } from "express";
import { CompteController } from "../controllers/compteController.js";

const routerCompte = Router();

// Route pour récupérer tous les comptes
routerCompte.get("/", CompteController.getComptes);

// Route pour récupérer un compte par ID
routerCompte.get("/:id_compte", CompteController.getCompteById);

// Route pour ajouter un nouveau compte
routerCompte.post("/", CompteController.createCompte);

// Route pour mettre à jour les informations d'un compte
routerCompte.put("/:id_compte", CompteController.updateCompte);

// Route pour supprimer un compte
routerCompte.delete("/:id_compte", CompteController.deleteCompte);

export default routerCompte;