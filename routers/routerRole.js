import { Router } from "express";
import { RoleController } from "../controllers/roleController.js";
 
const routerRoles = Router();
 
// Get all roles
routerRoles.get("/", RoleController.getRoles);
 
// Get a role by ID
routerRoles.get("/:id_role", RoleController.getRoleById);
 
// Add a new role
routerRoles.post("/", RoleController.createRole);
 
// Update information of a role
routerRoles.put("/:id_role", RoleController.updateRole);
 
// Delete a role
routerRoles.delete("/:id_role", RoleController.deleteRole);
 
export default routerRoles;