import { Router } from "express";
import { CommentaireController } from "../controllers/commentaireController.js";

const routerCommentaires = Router();

// Get all commentaires
routerCommentaires.get("/", CommentaireController.getCommentaires);

// Get a commentaire by ID
routerCommentaires.get("/:id_commentaire", CommentaireController.getCommentaireById);

// Add a new commentaire
routerCommentaires.post("/", CommentaireController.createCommentaire);

// Update information of a commentaire

// Delete a commentaire
routerCommentaires.delete("/:id_commentaire", CommentaireController.deleteCommentaire);

export default routerCommentaires;
