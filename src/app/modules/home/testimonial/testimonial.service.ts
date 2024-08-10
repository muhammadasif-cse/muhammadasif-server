import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {ITestimonial, ITestimonialFilters} from "./testimonial.interface";
import {testimonialSearchableFields} from "./testimonial.constant";
import {Testimonial} from "./testimonial.model";

const getAllTestimonial = async (
  filters: ITestimonialFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITestimonial[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: testimonialSearchableFields.map((field) => ({
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
  const result = await Testimonial.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Testimonial.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTestimonial = async (id: string): Promise<ITestimonial | null> => {
  const result = await Testimonial.findById({_id: id}).lean();
  return result;
};

const createTestimonial = async (payload: ITestimonial): Promise<ITestimonial> => {
  const result = await Testimonial.create(payload);
  return result;
};
const updateTestimonial = async (
  id: string,
  payload: Partial<ITestimonial>,
): Promise<ITestimonial | null> => {
  const result = await Testimonial.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteTestimonial = async (id: string): Promise<ITestimonial | null> => {
  const result = await Testimonial.findByIdAndDelete({_id: id});
  return result;
};
export const TestimonialService = {
  createTestimonial,
  getAllTestimonial,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
