const express = require("express");
const  router = express.Router();

const {
  createWhey,
  getWhey, 
  getWheyById,
  WheyPhotoUpload,
  search
  } = require("../controllers/whey");

  const { protect } = require("../middleware/auth");

  router
  .route("/")
  .get(protect,getWhey)
  .post(protect,createWhey);

  router
  .route("/:id/photo")
  .put(protect, WheyPhotoUpload);

  router
  .route("/:id")
  .get(protect,getWheyById);
router.route("/search/:name").post(search);

  module.exports = router