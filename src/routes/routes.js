import Router from "express";
import generateAuthToken from "../controllers/auth.controller.js";
import authenticateToken from "../middlewre/authenticateToken.js";
import createStore from "../controllers/createStore.controller.js";
import createUser from "../controllers/createUser.controller.js";
import getAllusers from "../controllers/getAllUsers.controller.js";
import getAllStores from "../controllers/getAllStores.controller.js";

const router = Router();

router.post("/create-store", createStore)
router.post("/create-user", createUser)
router.post("/login", generateAuthToken)

router.get("/stores/:store_id/users", authenticateToken, getAllusers)
router.get("/stores", authenticateToken, getAllStores)


export default router;