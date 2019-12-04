import { Router } from "express";
const router = Router();

import { create } from "../controllers/resource.controller";

router.post("/create", create);

export default router;
