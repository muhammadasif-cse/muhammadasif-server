import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {IAchievement, IAchievementFilters} from "./achievement.interface";
import {achievementSearchableFields} from "./achievement.constant";
import {Achievement} from "./achievement.model";

const getAllAchievement = async (
  filters: IAchievementFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAchievement[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: achievementSearchableFields.map((field) => ({
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
  const result = await Achievement.find(whereConditions)
    .sort({...sortConditions, createdAt: 1})
    .skip(skip)
    .limit(limit);
  const total = await Achievement.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAchievement = async (id: string): Promise<IAchievement | null> => {
  const result = await Achievement.findById({_id: id}).lean();
  return result;
};

const createAchievement = async (payload: IAchievement): Promise<IAchievement> => {
  const result = await Achievement.create(payload);
  return result;
};
const updateAchievement = async (
  id: string,
  payload: Partial<IAchievement>,
): Promise<IAchievement | null> => {
  const result = await Achievement.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteAchievement = async (id: string): Promise<IAchievement | null> => {
  const result = await Achievement.findByIdAndDelete({_id: id});
  return result;
};
export const achievementService = {
  createAchievement,
  getAllAchievement,
  getSingleAchievement,
  updateAchievement,
  deleteAchievement,
};
