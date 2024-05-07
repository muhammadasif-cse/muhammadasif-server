import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {landingFilterableFields} from "./landing.constant";

import {ILanding, ILandingFilters} from "./landing.interface";
import {Landing} from "./landing.model";

const getAllLanding = async (
  filters: ILandingFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ILanding[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: landingFilterableFields.map((field) => ({
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
  const result = await Landing.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await Landing.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleLanding = async (id: string): Promise<ILanding | null> => {
  const result = await Landing.findById({_id: id}).lean();
  return result;
};

const createLanding = async (payload: ILanding): Promise<ILanding> => {
  const result = await Landing.create(payload);
  return result;
};
const updateLanding = async (id: string, payload: Partial<ILanding>): Promise<ILanding | null> => {
  const result = await Landing.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteLanding = async (id: string): Promise<ILanding | null> => {
  const result = await Landing.findByIdAndDelete({_id: id});
  return result;
};
export const LandingService = {
  createLanding,
  getAllLanding,
  getSingleLanding,
  updateLanding,
  deleteLanding,
};
