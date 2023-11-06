
const router = require("express").Router()
const { verifyToken} = require("./verifyToken");
const getrisktolerance = require('../controllers/portfolioController');


router.get("/:risktolerance",verifyToken,getrisktolerance)

module.exports = router;
