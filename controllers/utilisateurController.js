import { Utilisateur } from "../models/utilisateur.js";

class UtilisateurController {
  static async getUtilisateurs(request, response) {
    try {
      const utilisateurs = await Utilisateur.selectUtilisateurs();
      response.status(200).json(utilisateurs);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting users.");
    }
  }

  static async createUtilisateur(request, response) {
    const { nom, prenom, email, mot_de_passe, id_role } = request.body;

    try {
      const result = await Utilisateur.insertUtilisateur(nom, prenom, email, mot_de_passe, id_role);
      response.status(201).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error creating user.");
    }
  }

  static async updateUtilisateur(request, response) {
    const { id_utilisateur } = request.params;
    const { nom, prenom, email, mot_de_passe, id_role } = request.body;

    try {
      const result = await Utilisateur.updateUtilisateur(id_utilisateur, nom, prenom, email, mot_de_passe, id_role);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error updating user.");
    }
  }

  static async deleteUtilisateur(request, response) {
    const { id_utilisateur } = request.params;

    try {
      const result = await Utilisateur.deleteUtilisateur(id_utilisateur);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error deleting user.");
    }
  }

  static async getUtilisateurById(request, response) {
    const { id_utilisateur } = request.params;

    try {
      const utilisateur = await Utilisateur.getUtilisateurById(id_utilisateur);
      response.status(200).json(utilisateur);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting user by ID.");
    }
  }
}

export { UtilisateurController };