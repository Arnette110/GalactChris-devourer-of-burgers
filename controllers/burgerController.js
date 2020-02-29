let express = require("express");

let router = express.Router();

let burger = require("../models/burger");

router.get("/", function(req, res) {
  burger.all(data => {
    let hbsObject = {
      burgers: data,
    };
    
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    
    function(result) {
    
      res.json({ id: result.insertId });
    },
  );
});

router.put("/api/burgers/id/:id/isdevoured/:isdevoured", (req, res) => {
  let condition = "id = " + req.params.id;
  
  let isdevoured = req.params.isdevoured;
  burger.update(
    {
      devoured: isdevoured,
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    },
  );
});

router.delete("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
