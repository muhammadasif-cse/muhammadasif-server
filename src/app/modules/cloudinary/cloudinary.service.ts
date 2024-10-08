import {ICloudinary, ICloudinaryFilters} from "./cloudinary.interface";
import {Cloudinary} from "./cloudinary.model";
import cloudinary from "../../../config/cloudinary";
import {IPaginationOptions} from "../../interfaces/pagination";
import {IGenericResponse} from "../../interfaces/common";
import {cloudinarySearchableFields} from "./cloudinary.constant";
import {paginationHelper} from "../../../helpers/paginationHelper";
import {SortOrder} from "mongoose";

const getAllCloudinary = async (
  filters: ICloudinaryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICloudinary[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cloudinarySearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const {page, limit, sortBy, sortOrder, skip} =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: {[key: string]: SortOrder} = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions = andConditions.length > 0 ? {$and: andConditions} : {};
  const result = await Cloudinary.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cloudinary.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCloudinary = async (id: string): Promise<ICloudinary | null> => {
  const result = await Cloudinary.findById({_id: id}).lean();
  return result;
};
const createCloudinary = async (payload: {file: string}): Promise<ICloudinary> => {
  if (!payload.file) {
    throw new Error("file is required to update Cloudinary asset");
  }
  const isBase64 = payload.file.startsWith("data:image/");
  const imageUrl = isBase64 ? payload.file : `data:image/webp;base64,${payload.file}`;

  const cloudinaryResult = await cloudinary.uploader.upload(imageUrl, {
    upload_preset: "ml_default",
  });
  const cloudinaryAssets = {
    url: cloudinaryResult.secure_url,
    public_id: cloudinaryResult.public_id,
    resource_type: cloudinaryResult.resource_type,
    type: cloudinaryResult.type,
    created_at: cloudinaryResult.created_at,
  };
  const image = new Cloudinary(cloudinaryAssets);
  const result = await image.save();
  return result;
};

const updateCloudinary = async (
  id: string,
  payload: Partial<{file: string; public_id: string}>,
): Promise<ICloudinary | null> => {
  if (!payload.public_id) {
    throw new Error("public_id is required to update Cloudinary asset");
  }
  // NOTE:=> Delete the previous asset from Cloudinary
  const cloudinaryDelete = await cloudinary.uploader.destroy(payload.public_id);
  // NOTE:=> If asset not found in Cloudinary
  if (cloudinaryDelete.result !== "ok") {
    throw new Error("This asset not found");
  } else {
    // NOTE:=> Check if file is provided to update the asset
    if (!payload.file) {
      throw new Error("file is required to update Cloudinary asset");
    }
    const isBase64 = payload.file.startsWith("data:image/");
    const imageUrl = isBase64 ? payload.file : `data:image/webp;base64,${payload.file}`;

    // NOTE:=> Upload the new asset to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(imageUrl, {
      upload_preset: "ml_default",
    });

    // NOTE:=> Update the asset in the database
    const cloudinaryAssets = {
      url: cloudinaryResult.secure_url,
      public_id: cloudinaryResult.public_id,
      resource_type: cloudinaryResult.resource_type,
      type: cloudinaryResult.type,
      created_at: cloudinaryResult.created_at,
    };

    // NOTE:=> Update the asset in the database
    const result = await Cloudinary.findOneAndUpdate({_id: id}, cloudinaryAssets, {
      new: true,
    });
    return result;
  }
};

const deleteCloudinary = async (payload: {
  id: string;
  public_id: string;
}): Promise<ICloudinary | null> => {
  const cloudinaryDelete = await cloudinary.uploader.destroy(payload.public_id);
  if (cloudinaryDelete.result !== "ok") {
    throw new Error("This asset not found");
  } else {
    const result = await Cloudinary.findByIdAndDelete({_id: payload.id});
    if (!result) {
      throw new Error("This image is not found in the database");
    }
    return result;
  }
};

export const CloudinaryService = {
  createCloudinary,
  getAllCloudinary,
  getSingleCloudinary,
  updateCloudinary,
  deleteCloudinary,
};
