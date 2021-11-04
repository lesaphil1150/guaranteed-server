const { Router } = require("express");
const { Warranty } = require("../models/");
const validateSession = require("../middleware/validate-session");

const router = Router();

//User can add/create new warranty Item
router.post("/create", validateSession, (req, res) => {
  Warranty.create({
    name: req.body.name,
    date_purchased: req.body.date_purchased,
    warranty_expiration: req.body.warranty_expiration,
    model_number: req.body.model_number,
    serial_number: req.body.serial_number,
    receipt: req.body.receipt,
    notes: req.body.notes,
    userId: req.user.id,
  })
    .then((warranty) => {
      res.status(200).json({
        message: `Warranty item has been added to the Warranty Database`,
        log: warranty,
      });
    })
    .catch((err) => res.status(500).json({ err }));
});

//User can remove/delete an Itemfrom inventory via ID
router.delete("/delete/:id", validateSession, function (req, res) {
  let query;
  if (req.user.isAdmin == true) {
    query = { where: { id: req.params.id } };
  } else {
    query = { where: { id: req.params.id, userId: req.user.id } };
  }
  Warranty.destroy(query).then(() =>
    res
      .status(200)
      .json({ message: "Warranty item Removed from Warranty Database" })
  );
});

//get all
router.get("/mine", validateSession, (req, res) => {
  Warranty.findAll({
    where: { userId: req.user.id },
    include: "user",
  })
    .then((Warranty) => res.status(200).json(Warranty))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/getall", validateSession, (req, res) => {
  Warranty.findAll({})
    .then((Warranty) => res.status(200).json(Warranty))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, function (req, res) {
  const updateWarranty = {
    name: req.body.name,
    date_purchased: req.body.date_purchased,
    warranty_expiration: req.body.warranty_expiration,
    model_number: req.body.model_number,
    serial_number: req.body.serial_number,
    receipt: req.body.receipt,
    notes: req.body.notes,
    userId: req.user.id,
  };

  const query = { where: { id: req.params.entryId, userId: req.user.id } };

  Warranty.update(updateWarranty, query)
    .then((warranty) => res.status(200).json(warranty))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/admin/:entryId", validateSession, function (req, res) {
  const updateWarranty = {
    name: req.body.name,
    date_purchased: req.body.date_purchased,
    warranty_expiration: req.body.warranty_expiration,
    model_number: req.body.model_number,
    serial_number: req.body.serial_number,
    receipt: req.body.receipt,
    notes: req.body.notes,
    // userId: req.user.id,
  };

  const query = { where: { id: req.params.entryId } };

  Warranty.update(updateWarranty, query)
    .then((warranty) => res.status(200).json(warranty))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
