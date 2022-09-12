const multer=require('multer')

const path=require("path")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"src/images")
        
    },
    filename:(req,file,cb)=>{
        console.log(file );
        cb(null,Date.now() + path.extname(file.originalname))

    }
})
const upload= multer({ storage:storage})
   const multipalImage=upload.array("photo",10)
  const singleImage=upload.single("photo")

module.exports={
    multipalImage,
    singleImage,
};

//  module.exports=upload