import { connection } from "./connexion.js";

class Compte {
  static selectComptes() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM compte", (error, results, fields) => {
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

  static insertCompte(solde, id_utilisateur) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO compte (solde, id_utilisateur) VALUES (?, ?)";
      const values = [solde, id_utilisateur];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Inserted compte with ID:", results.insertId);
          resolve(results);
        }
      });
    });
  }

  static updateCompte(id_compte, solde, id_utilisateur) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE compte SET solde = ?, id_utilisateur = ? WHERE id_compte = ?";
      const values = [solde, id_utilisateur, id_compte];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Updated compte with ID:", id_compte);
          resolve(results);
        }
      });
    });
  }

  static deleteCompte(id_compte) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM compte WHERE id_compte = ?";
      const values = [id_compte];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Deleted compte with ID:", id_compte);
          resolve(results);
        }
      });
    });
  }

  static getCompteById(id_compte) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM compte WHERE id_compte=?", [id_compte], (error, results, fields) => {
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

export { Compte };