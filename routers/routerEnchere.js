import { Router } from "express";
import { EnchereController } from "../controllers/enchereController.js";

const routerEncheres = Router();

// Get all encheres
routerEncheres.get("/", EnchereController.getEncheres);

// Get an enchere by ID
routerEncheres.get("/:id_enchere", EnchereController.getEnchereById);

// Add a new enchere
routerEncheres.post("/", EnchereController.createEnchere);

// Update information of an enchere
routerEncheres.put("/:id_enchere", EnchereController.updateEnchere);

// Delete an enchere
routerEncheres.delete("/:id_enchere", EnchereController.deleteEnchere);

export default routerEncheres;
