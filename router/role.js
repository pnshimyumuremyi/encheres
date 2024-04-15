// Updated route file (role.js)

import { Router } from 'express';
import { body, param } from 'express-validator';
import { roleList, getRoleById, createRole, updateRole, deleteRole } from '../controller/role.js';
import { authenticateToken } from "../model/auth.js";

const role = Router();

// Validation middleware for createRole
const createRoleValidation = [
  body('nom_role').notEmpty().withMessage('Role name cannot be empty'),
];

// Validation middleware for updateRole
const updateRoleValidation = [
  param('id').isInt().withMessage('Invalid role ID'),
  body('nom_role').notEmpty().withMessage('Role name cannot be empty'),
];

role
  .get('/', authenticateToken,roleList)
  .get('/:id', authenticateToken,getRoleById)
  .post('/', createRoleValidation,authenticateToken, createRole)
  .put('/:id', updateRoleValidation, authenticateToken,updateRole)
  .delete('/:id', authenticateToken,deleteRole);

export default role;
