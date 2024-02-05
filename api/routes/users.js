const express = require("express");
const router = express.Router();
const tokenChecker = require("../../api/middleware/tokenChecker");

const UsersController = require("../controllers/users");

const logReq = (req) => {
    console.log(req);
}

router.post("/", UsersController.create);
router.get("/", tokenChecker, UsersController.getAllUserInfo);
router.patch("/",tokenChecker, UsersController.updateUserInfo);

module.exports = router;
