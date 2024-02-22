import { Offre } from "../models/offre.js";

class OffreController {
  static async getOffres(request, response) {
    try {
      const offres = await Offre.selectOffres();
      response.status(200).json(offres);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting offres.");
    }
  }

  static async createOffre(request, response) {
    const { montant, date_offre, id_utilisateur, id_enchere } = request.body;

    try {
      const result = await Offre.insertOffre(montant, date_offre, id_utilisateur, id_enchere);
      response.status(201).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error creating offre.");
    }
  }

  static async updateOffre(request, response) {
    const { id_offre } = request.params;
    const { montant, date_offre, id_utilisateur, id_enchere } = request.body;

    try {
      const result = await Offre.updateOffre(id_offre, montant, date_offre, id_utilisateur, id_enchere);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error updating offre.");
    }
  }

  static async deleteOffre(request, response) {
    const { id_offre } = request.params;

    try {
      const result = await Offre.deleteOffre(id_offre);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error deleting offre.");
    }
  }

  static async getOffreById(request, response) {
    const { id_offre } = request.params;

    try {
      const offre = await Offre.getOffreById(id_offre);
      response.status(200).json(offre);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting offre by ID.");
    }
  }
}

export { OffreController };
