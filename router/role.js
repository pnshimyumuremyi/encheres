// Updated route file (role.js)

import { Router } from 'express';
import { body, param } from 'express-validator';
import { roleList, getRoleById, createRole, updateRole, deleteRole } from '../controller/role.js';

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
  .get('/', roleList)
  .get('/:id', getRoleById)
  .post('/', createRoleValidation, createRole)
  .put('/:id', updateRoleValidation, updateRole)
  .delete('/:id', deleteRole);

export default role;
