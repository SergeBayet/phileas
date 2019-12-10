import { Router } from "express";
import { validateUser } from "../middlewares/validateUser";
const router = Router();

import { create, getAll, test, importCategories } from "../controllers/categories.controller";

router.post("/", validateUser, create);
router.get("/", getAll);
router.get("/test", test);
router.get("/import", importCategories)
export default router;
