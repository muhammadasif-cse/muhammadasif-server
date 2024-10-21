import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {INewsletter, INewsletterFilters} from "./newsletter.interface";
import {newsletterSearchableFields} from "./newsletter.constant";
import {Newsletter} from "./newsletter.model";

const getAllNewsletter = async (
  filters: INewsletterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<INewsletter[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: newsletterSearchableFields.map((field) => ({
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
  const result = await Newsletter.find(whereConditions)
    .sort({...sortConditions, createdAt: 1})
    .skip(skip)
    .limit(limit);
  const total = await Newsletter.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleNewsletter = async (id: string): Promise<INewsletter | null> => {
  const result = await Newsletter.findById({_id: id}).lean();
  return result;
};

const createNewsletter = async (payload: INewsletter): Promise<INewsletter> => {
  const result = await Newsletter.create(payload);
  return result;
};
const updateNewsletter = async (
  id: string,
  payload: Partial<INewsletter>,
): Promise<INewsletter | null> => {
  const result = await Newsletter.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteNewsletter = async (id: string): Promise<INewsletter | null> => {
  const result = await Newsletter.findByIdAndDelete({_id: id});
  return result;
};
export const newsletterService = {
  createNewsletter,
  getAllNewsletter,
  getSingleNewsletter,
  updateNewsletter,
  deleteNewsletter,
};
