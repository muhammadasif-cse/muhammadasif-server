import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {navigationSearchableFields} from "./navigation.constant";

import {INavigation, INavigationFilters} from "./navigation.interface";
import {Navigation} from "./navigation.model";

const getAllNavigation = async (
  filters: INavigationFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<INavigation[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: navigationSearchableFields.map((field) => ({
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
  const result = await Navigation.find(whereConditions)
    .populate("submenu")
    .populate("social")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await Navigation.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleNavigation = async (id: string): Promise<INavigation | null> => {
  const result = await Navigation.findById({_id: id}).populate("submenu").populate("social").lean();
  return result;
};

const createNavigation = async (payload: INavigation): Promise<INavigation> => {
  const result = (await (await Navigation.create(payload)).populate("submenu")).populate("social");
  return result;
};
const updateNavigation = async (
  id: string,
  payload: Partial<INavigation>,
): Promise<INavigation | null> => {
  const result = await Navigation.findOneAndUpdate({_id: id}, payload, {
    new: true,
  })
    .populate("submenu")
    .populate("social");
  return result;
};
const deleteNavigation = async (id: string): Promise<INavigation | null> => {
  const result = await Navigation.findByIdAndDelete({_id: id});
  return result;
};
export const NavigationService = {
  createNavigation,
  getAllNavigation,
  getSingleNavigation,
  updateNavigation,
  deleteNavigation,
};
