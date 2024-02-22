import { connection } from "./connexion.js";

class Commentaire {
  static selectCommentaires() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM commentaire", (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Query results:", results);
          resolve(results);
        }
      });
    });
  }

  static insertCommentaire(contenu, date_commentaire, id_utilisateur, id_enchere) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO commentaire (contenu, date_commentaire, id_utilisateur, id_enchere) VALUES (?, ?, ?, ?)";
      const values = [contenu, date_commentaire, id_utilisateur, id_enchere];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Inserted commentaire with ID:", results.insertId);
          resolve(results);
        }
      });
    });
  }

  static updateCommentaire(id_commentaire, contenu, date_commentaire, id_utilisateur, id_enchere) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE commentaire SET contenu = ?, date_commentaire = ?, id_utilisateur = ?, id_enchere = ? WHERE id_commentaire = ?";
      const values = [contenu, date_commentaire, id_utilisateur, id_enchere, id_commentaire];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Updated commentaire with ID:", id_commentaire);
          resolve(results);
        }
      });
    });
  }

  static deleteCommentaire(id_commentaire) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM commentaire WHERE id_commentaire = ?";
      const values = [id_commentaire];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Deleted commentaire with ID:", id_commentaire);
          resolve(results);
        }
      });
    });
  }

  static getCommentaireById(id_commentaire) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM commentaire WHERE id_commentaire=?", [id_commentaire], (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Query results:", results);
          resolve(results[0]);
        }
      });
    });
  }
}

export { Commentaire };
