const { Router } = require("express");
const { Claim } = require("../models");
const validateSession = require("../middleware/validate-session");
const router = Router();

//User can add/create new warranty Item
router.post("/create", validateSession, (req, res) => {
  let claimItems = {
    name_of_item: req.body.name_of_item,
    date_of_claim: req.body.date_of_claim,
    resolution: req.body.resolution,
    notes: req.body.notes,
    userId: req.user.id,
  };
  Claim.create(claimItems)
    .then((claim) => {
      res.status(200).json({
        message: `Claim item has been added to the Warranty Database`,
        log: claim,
      });
    })
    .catch((err) => res.status(500).json({ err }));
});

//User can remove/delete an Item from inventory via ID
router.delete("/delete/:id", validateSession, function (req, res) {
  let query;
  if (req.user.isAdmin == true) {
    query = { where: { id: req.params.id } };
  } else {
    query = { where: { id: req.params.id, userId: req.user.id } };
  }
  Claim.destroy(query).then(() =>
    res
      .status(200)
      .json({ message: "Claim item Removed from Warranty Database" })
  );
});

//get all
router.get("/mine", validateSession, (req, res) => {
  Claim.findAll({
    where: { userId: req.user.id },
    include: "user",
  })
    .then((Claim) => res.status(200).json(Claim))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/getall", validateSession, (req, res) => {
  Claim.findAll({
    // where: { userId: req.user.id },
    // include: "user",
  })
    .then((Claim) => res.status(200).json(Claim))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, function (req, res) {
  const updateClaim = {
    name_of_item: req.body.name_of_item,
    date_of_claim: req.body.date_of_claim,
    resolution: req.body.resolution,
    notes: req.body.notes,
    userId: req.user.id,
  };

  const query = { where: { id: req.params.entryId, userId: req.user.id } };

  Claim.update(updateClaim, query)
    .then((claim) => res.status(200).json(claim))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/admin/:entryId", validateSession, function (req, res) {
  const updateClaim = {
    name_of_item: req.body.name_of_item,
    date_of_claim: req.body.date_of_claim,
    resolution: req.body.resolution,
    notes: req.body.notes,
    // userId: req.user.id,
  };

  const query = { where: { id: req.params.entryId } };

  Claim.update(updateClaim, query)
    .then((claim) => res.status(200).json(claim))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
