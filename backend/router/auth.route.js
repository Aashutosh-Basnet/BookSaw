import {register, login} from "./controller/auth.controller.js";
import router from "express.Router()";

router.post("/register", register);
router.post("/loigin", login);

export default router;