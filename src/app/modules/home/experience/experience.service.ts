import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {IExperience, IExperienceFilters} from "./experience.interface";
import {experienceSearchableFields} from "./experience.constant";
import {Experience} from "./experience.model";

const getAllExperience = async (
  filters: IExperienceFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IExperience[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: experienceSearchableFields.map((field) => ({
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
  const result = await Experience.find(whereConditions)
    .sort({...sortConditions, createdAt: 1})
    .skip(skip)
    .limit(limit);
  const total = await Experience.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleExperience = async (id: string): Promise<IExperience | null> => {
  const result = await Experience.findById({_id: id}).lean();
  return result;
};

const createExperience = async (payload: IExperience): Promise<IExperience> => {
  const result = await Experience.create(payload);
  return result;
};
const updateExperience = async (
  id: string,
  payload: Partial<IExperience>,
): Promise<IExperience | null> => {
  const result = await Experience.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteExperience = async (id: string): Promise<IExperience | null> => {
  const result = await Experience.findByIdAndDelete({_id: id});
  return result;
};
export const ExperienceService = {
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
