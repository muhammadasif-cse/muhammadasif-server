import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import path from "path";

//configure dotenv
dotenv.config({path: path.join(process.cwd(), ".env")});

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_environment_variable: process.env.CLOUDINARY_API_Environment_VARIABLE,
});

export default cloudinary;
