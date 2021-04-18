const express = require("express");
const  router = express.Router();

const {
  createWhey,
  getWhey, 
  getWheyById,
  WheyPhotoUpload,
  search,
  deleteWhey
  } = require("../controllers/whey");

  const { protect } = require("../middleware/auth");
const whey = require("../model/whey");

  router
  .route("/")
  .get(protect,getWhey)
  .post(createWhey);

  router
  .route("/:id/photo")
  .put(protect, WheyPhotoUpload);

  router
  .route("/:id")
  .get(protect,getWheyById)
  .delete( deleteWhey);


 

router.route("/search/:name").post(search);


 


  module.exports = router