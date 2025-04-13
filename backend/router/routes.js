import router from "express.Router()";
import userRoutes from "./user.route.js"

const base = "/api/v1";

router.use(`${base}/users`, userRoutes);
router.use(`${base}/auth`, authRoutes);

export default router;