import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {IContact, IContactFilters} from "./contact.interface";
import {contactSearchableFields} from "./contact.constant";
import {Contact} from "./contact.model";

const getAllContact = async (
  filters: IContactFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IContact[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: contactSearchableFields.map((field) => ({
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
  const result = await Contact.find(whereConditions)
    .sort({...sortConditions, createdAt: -1})
    .skip(skip)
    .limit(limit);
  const total = await Contact.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleContact = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findById({_id: id}).lean();
  return result;
};

const createContact = async (payload: IContact): Promise<IContact> => {
  const result = await Contact.create(payload);
  return result;
};
const updateContact = async (id: string, payload: Partial<IContact>): Promise<IContact | null> => {
  const result = await Contact.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteContact = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findByIdAndDelete({_id: id});
  return result;
};
export const ContactService = {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
