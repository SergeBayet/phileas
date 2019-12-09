import { Router } from "express";
import { validateUser } from "../middlewares/validateUser";
const router = Router();

import { create, getAll } from "../controllers/resources.controller";

router.post("/", validateUser, create);
router.get("/", getAll);

export default router;
