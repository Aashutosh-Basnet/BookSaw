import router from "express.Router()";

router.get("/get-users", (req, res) => {
    res.send("user has been fetched!");
})

export default router;