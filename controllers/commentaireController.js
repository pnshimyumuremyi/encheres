import { Commentaire } from "../models/commentaire.js";

class CommentaireController {
  static async getCommentaires(request, response) {
    try {
      const commentaires = await Commentaire.selectCommentaires();
      response.status(200).json(commentaires);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting commentaires.");
    }
  }

  static async createCommentaire(request, response) {
    const { contenu, date_commentaire, id_utilisateur, id_enchere } = request.body;

    try {
      const result = await Commentaire.insertCommentaire(contenu, date_commentaire, id_utilisateur, id_enchere);
      response.status(201).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error creating commentaire.");
    }
  }

  static async updateCommentaire(request, response) {
    const { id_commentaire } = request.params;
    const { contenu, date_commentaire, id_utilisateur, id_enchere } = request.body;

    try {
      const result = await Commentaire.updateCommentaire(id_commentaire, contenu, date_commentaire, id_utilisateur, id_enchere);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error updating commentaire.");
    }
  }

  static async deleteCommentaire(request, response) {
    const { id_commentaire } = request.params;

    try {
      const result = await Commentaire.deleteCommentaire(id_commentaire);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error deleting commentaire.");
    }
  }

  static async getCommentaireById(request, response) {
    const { id_commentaire } = request.params;

    try {
      const commentaire = await Commentaire.getCommentaireById(id_commentaire);
      response.status(200).json(commentaire);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting commentaire by ID.");
    }
  }
}

export { CommentaireController };
