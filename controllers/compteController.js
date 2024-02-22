import { Compte } from "../models/compte.js";

class CompteController {
  static async getComptes(request, response) {
    try {
      const comptes = await Compte.selectComptes();
      response.status(200).json(comptes);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting comptes.");
    }
  }

  static async createCompte(request, response) {
    const { solde, id_utilisateur } = request.body;

    try {
      const result = await Compte.insertCompte(solde, id_utilisateur);
      response.status(201).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error creating compte.");
    }
  }

  static async updateCompte(request, response) {
    const { id_compte } = request.params;
    const { solde, id_utilisateur } = request.body;

    try {
      const result = await Compte.updateCompte(id_compte, solde, id_utilisateur);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error updating compte.");
    }
  }

  static async deleteCompte(request, response) {
    const { id_compte } = request.params;

    try {
      const result = await Compte.deleteCompte(id_compte);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error deleting compte.");
    }
  }

  static async getCompteById(request, response) {
    const { id_compte } = request.params;

    try {
      const compte = await Compte.getCompteById(id_compte);
      response.status(200).json(compte);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting compte by ID.");
    }
  }
}

export { CompteController };