import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {techstackSearchableFields} from "./techstack.constant";
import {ITechstack, ITechstackFilters} from "./techstack.interface";
import {Techstack} from "./techstack.model";

const getAllTechstack = async (
  filters: ITechstackFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITechstack[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: techstackSearchableFields.map((field) => ({
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
  const result = await Techstack.find(whereConditions)
    .sort({...sortConditions, createdAt: -1})
    .skip(skip)
    .limit(limit);
  const total = await Techstack.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTechstack = async (id: string): Promise<ITechstack | null> => {
  const result = await Techstack.findById({_id: id}).lean();
  return result;
};

const createTechstack = async (payload: ITechstack): Promise<ITechstack> => {
  const result = await Techstack.create(payload);
  return result;
};
const updateTechstack = async (
  id: string,
  payload: Partial<ITechstack>,
): Promise<ITechstack | null> => {
  const result = await Techstack.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteTechstack = async (id: string): Promise<ITechstack | null> => {
  const result = await Techstack.findByIdAndDelete({_id: id});
  return result;
};
export const TechstackService = {
  createTechstack,
  getAllTechstack,
  getSingleTechstack,
  updateTechstack,
  deleteTechstack,
};
