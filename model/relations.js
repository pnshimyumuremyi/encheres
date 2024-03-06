// Importer les modèles
import Utilisateur from "./utilisateur.js";
import Role from "./role.js";
import Compte from "./compte.js";
import Enchere from "./enchere.js";
import Offre from "./offre.js";
import Commentaire from "./commentaire.js";

// Définir les relations entre les modèles

// Un utilisateur peut avoir un rôle

Utilisateur.belongsTo(Role, { foreignKey: 'roleId', as: 'Role' });
Role.hasMany(Utilisateur);

// Un utilisateur peut avoir plusieurs comptes
Utilisateur.hasMany(Compte);
Compte.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });

// Une enchère appartient à un utilisateur
Enchere.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });
Utilisateur.hasMany(Enchere);

// Une offre appartient à un utilisateur et à une enchère
Offre.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });
Offre.belongsTo(Enchere, { foreignKey: 'enchereID' });
Utilisateur.hasMany(Offre);
Enchere.hasMany(Offre);

// Un commentaire appartient à un utilisateur et à une enchère
Commentaire.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });
Commentaire.belongsTo(Enchere, { foreignKey: 'enchereId' });
Utilisateur.hasMany(Commentaire);
Enchere.hasMany(Commentaire);

export { Utilisateur, Role, Compte, Enchere, Offre, Commentaire };
