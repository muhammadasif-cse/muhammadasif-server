import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {submenuSearchableFields} from "./submenu.constant";

import {ISubmenu, ISubmenuFilters} from "./submenu.interface";
import {Submenu} from "./submenu.model";

const getAllSubmenu = async (
  filters: ISubmenuFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISubmenu[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: submenuSearchableFields.map((field) => ({
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
  const result = await Submenu.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);
  const total = await Submenu.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSubmenu = async (id: string): Promise<ISubmenu | null> => {
  const result = await Submenu.findById({_id: id}).lean();
  return result;
};

const createSubmenu = async (payload: ISubmenu): Promise<ISubmenu> => {
  const result = await Submenu.create(payload);
  return result;
};
const updateSubmenu = async (id: string, payload: Partial<ISubmenu>): Promise<ISubmenu | null> => {
  const result = await Submenu.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteSubmenu = async (id: string): Promise<ISubmenu | null> => {
  const result = await Submenu.findByIdAndDelete({_id: id});
  return result;
};
export const SubmenuService = {
  createSubmenu,
  getAllSubmenu,
  getSingleSubmenu,
  updateSubmenu,
  deleteSubmenu,
};
