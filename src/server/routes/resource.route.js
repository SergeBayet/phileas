import { Router } from "express";
import { validateUser } from "../middlewares/validateUser";
const router = Router();

import { create } from "../controllers/resource.controller";

router.post("/create", validateUser, create);

export default router;
