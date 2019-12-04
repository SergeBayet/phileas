import { Router } from "express";
const router = Router();

import { user_create, user_details, user_update, user_delete, user_authenticate } from "../controllers/user.controller";

router.post("/create", user_create);
router.post("/authenticate", user_authenticate)
router.get("/:id", user_details);
router.put("/:id/update", user_update);
router.delete("/:id/delete", user_delete);

export default router;
