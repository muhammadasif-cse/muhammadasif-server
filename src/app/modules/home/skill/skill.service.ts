import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";

import {skillSearchableFields} from "./skill.constant";
import {ISkill, ISkillFilters} from "./skill.interface";
import {Skill} from "./skill.model";

const getAllSkill = async (
  filters: ISkillFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISkill[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: skillSearchableFields.map((field) => ({
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
  const result = await Skill.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);
  const total = await Skill.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSkill = async (id: string): Promise<ISkill | null> => {
  const result = await Skill.findById({_id: id}).lean();
  return result;
};

const createSkill = async (payload: ISkill): Promise<ISkill> => {
  const result = await Skill.create(payload);
  return result;
};
const updateSkill = async (id: string, payload: Partial<ISkill>): Promise<ISkill | null> => {
  const result = await Skill.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteSkill = async (id: string): Promise<ISkill | null> => {
  const result = await Skill.findByIdAndDelete({_id: id});
  return result;
};
export const SkillService = {
  createSkill,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
