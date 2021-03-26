const ErrorResponse = require("../utils/errorResponse");
const Whey = require("../model/whey");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------CREATE Student------------------

exports.search = asyncHandler(

 async (req,res,next)=>{
 
console.log(req.user )
console.log(req.params.name)
 Whey.find({ proteinname:{$regex:req.params.name,$options:'$i'}}).then((result)=>{
console.log(result)
  res.status(200).json({success:true,data:result})


 })
 }
)
exports.createWhey = asyncHandler(async (req, res, next) => {

  const whey = await Whey.create(req.body);

  if (!whey) {
    return next(new ErrorResponse("Error adding whey"), 404);
  }

  res.status(201).json({
    success: true,
    data: whey,
  });
});

//-------------------Display all students

exports.getWhey = asyncHandler(async (req, res, next) => {
    const whey = await Whey.find({});
  
    res.status(201).json({
      success: true,
      count: whey.length,
      data: whey,
    });
  });

  // -----------------FIND Student BY ID-------------------

exports.getWheyById = asyncHandler(async (req, res, next) => {
    const whey = await Whey.findById(req.params.id);
  
    if (!whey) {
      return next(new ErrorResponse("Whey not found"), 404);
    }
  
    res.status(200).json({
      success: true,
      data: whey,
    });
  });


  // ------------------UPLOAD IMAGE-----------------------

exports.WheyPhotoUpload = asyncHandler(async (req, res, next) => {
    const whey = await Whey.findById(req.params.id);
  
    console.log(whey);
    if (!whey) {
      return next(new ErrorResponse(`No whey found with ${req.params.id}`), 404);
    }
  
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    // Make sure the image is a photo and accept any extension of an image
    // if (!file.mimetype.startsWith("image")) {
    //   return next(new ErrorResponse(`Please upload an image`, 400));
    // }
  
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    file.name = `photo_${whey.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.err(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      //insert the filename into database
      await Whey.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
    });
  
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });