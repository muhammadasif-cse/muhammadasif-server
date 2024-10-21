import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {IAboutMe, IAboutMeFilters} from "./me.interface";
import {aboutMeSearchableFields} from "./me.constant";
import {AboutMe} from "./me.model";

const getAllAboutMe = async (
  filters: IAboutMeFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAboutMe[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: aboutMeSearchableFields.map((field) => ({
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
  const result = await AboutMe.find(whereConditions)
    .sort({...sortConditions, createdAt: 1})
    .skip(skip)
    .limit(limit);
  const total = await AboutMe.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAboutMe = async (id: string): Promise<IAboutMe | null> => {
  const result = await AboutMe.findById({_id: id}).lean();
  return result;
};

const createAboutMe = async (payload: IAboutMe): Promise<IAboutMe> => {
  const result = await AboutMe.create(payload);
  return result;
};
const updateAboutMe = async (id: string, payload: Partial<IAboutMe>): Promise<IAboutMe | null> => {
  const result = await AboutMe.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteAboutMe = async (id: string): Promise<IAboutMe | null> => {
  const result = await AboutMe.findByIdAndDelete({_id: id});
  return result;
};
export const aboutMeService = {
  createAboutMe,
  getAllAboutMe,
  getSingleAboutMe,
  updateAboutMe,
  deleteAboutMe,
};
