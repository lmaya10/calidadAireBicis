var express = require("express");
var router = express.Router();

const MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/data", (req, res) => {
	console.log("Get data");
	myMongoLib.getDocs()
	.then(docs => res.send(docs))
	.catch(err => res.send({err: true, msg: err}));
});


module.exports = router;
