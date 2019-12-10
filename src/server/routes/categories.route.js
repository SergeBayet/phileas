import { Router } from "express";
import { validateUser } from "../middlewares/validateUser";
const router = Router();

import { create, getAll, test } from "../controllers/categories.controller";

router.post("/", validateUser, create);
router.get("/", getAll);
router.get("/test", test);
export default router;
