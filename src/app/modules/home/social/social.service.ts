import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {socialSearchableFields} from "./social.constant";

import {ISocial, ISocialFilters} from "./social.interface";
import {Social} from "./social.model";

const getAllSocial = async (
  filters: ISocialFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISocial[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: socialSearchableFields.map((field) => ({
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
  const result = await Social.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);
  const total = await Social.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSocial = async (id: string): Promise<ISocial | null> => {
  const result = await Social.findById({_id: id}).lean();
  return result;
};

const createSocial = async (payload: ISocial): Promise<ISocial> => {
  const result = await Social.create(payload);
  return result;
};
const updateSocial = async (id: string, payload: Partial<ISocial>): Promise<ISocial | null> => {
  const result = await Social.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteSocial = async (id: string): Promise<ISocial | null> => {
  const result = await Social.findByIdAndDelete({_id: id});
  return result;
};
export const SocialService = {
  createSocial,
  getAllSocial,
  getSingleSocial,
  updateSocial,
  deleteSocial,
};
