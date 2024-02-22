import { Router } from "express";
import { OffreController } from "../controllers/offreController.js";

const routerOffres = Router();

// Get all offres
routerOffres.get("/", OffreController.getOffres);

// Get an offre by ID
routerOffres.get("/:id_offre", OffreController.getOffreById);

// Add a new offre
routerOffres.post("/", OffreController.createOffre);

// Update information of an offre
routerOffres.put("/:id_offre", OffreController.updateOffre);

// Delete an offre
routerOffres.delete("/:id_offre", OffreController.deleteOffre);

export default routerOffres;
