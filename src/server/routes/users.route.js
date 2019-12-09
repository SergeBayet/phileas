import { Router } from "express";
const router = Router();

import {
  create, getById, updateById, deleteById,
  login, token, tokenReject
} from "../controllers/users.controller";


// CRUD routes

router.post("/", create);
router.get("/:id", getById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

// Auhtentication routes

router.post("/login", login);
router.post("/token", token);
router.post("/token/reject", tokenReject);

export default router;
