import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {IGallery, IGalleryFilters} from "./gallery.interface";
import {gallerySearchableFields} from "./gallery.constant";
import {Gallery} from "./gallery.model";

const getAllGallery = async (
  filters: IGalleryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IGallery[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: gallerySearchableFields.map((field) => ({
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
  const result = await Gallery.find(whereConditions)
    .sort({...sortConditions, createdAt: 1})
    .skip(skip)
    .limit(limit);
  const total = await Gallery.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleGallery = async (id: string): Promise<IGallery | null> => {
  const result = await Gallery.findById({_id: id}).lean();
  return result;
};

const createGallery = async (payload: IGallery): Promise<IGallery> => {
  const result = await Gallery.create(payload);
  return result;
};
const updateGallery = async (id: string, payload: Partial<IGallery>): Promise<IGallery | null> => {
  const result = await Gallery.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteGallery = async (id: string): Promise<IGallery | null> => {
  const result = await Gallery.findByIdAndDelete({_id: id});
  return result;
};
export const GalleryService = {
  createGallery,
  getAllGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
};
