import {ICloudinary, ICloudinaryResponse} from "./cloudinary.interface";
import {Cloudinary} from "./cloudinary.model";
import cloudinary from "../../../config/cloudinary";

const getAllCloudinary = async (): Promise<ICloudinaryResponse[]> => {
  const result = await cloudinary.api.resources();
  return result.resources;
};

const getSingleCloudinary = async (id: string): Promise<ICloudinaryResponse | null> => {
  const result = await cloudinary.api.resource(id);
  return result;
};

const createCloudinary = async (payload: ICloudinary): Promise<ICloudinary> => {
  const isBase64 = payload.url.startsWith("data:image/");
  const imageUrl = isBase64 ? payload.url : `data:image/webp;base64,${payload.url}`;

  const result = await cloudinary.uploader.upload(imageUrl, {
    upload_preset: "ml_default",
  });

  const image = new Cloudinary({
    url: result.secure_url,
    public_id: result.public_id,
  });
  await image.save();

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};
const deleteCloudinary = async (id: string): Promise<ICloudinaryResponse | null> => {
  const result = await cloudinary.uploader.destroy(id);
  return result;
};

export const CloudinaryService = {
  createCloudinary,
  getAllCloudinary,
  getSingleCloudinary,
  deleteCloudinary,
};
