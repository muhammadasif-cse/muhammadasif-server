import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {eventSearchableFields} from "./event.constant";
import {IEvent, IEventFilters} from "./event.interface";
import {Event} from "./event.model";

const getAllEvent = async (
  filters: IEventFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IEvent[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: eventSearchableFields.map((field) => ({
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
  const result = await Event.find(whereConditions)
    .sort({...sortConditions, createdAt: 1})
    .skip(skip)
    .limit(limit);
  const total = await Event.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },

    data: result,
  };
};

const getSingleEvent = async (id: string): Promise<IEvent | null> => {
  const result = await Event.findById({_id: id}).lean();
  return result;
};

const createEvent = async (payload: IEvent): Promise<IEvent> => {
  const result = await Event.create(payload);
  return result;
};
const updateEvent = async (id: string, payload: Partial<IEvent>): Promise<IEvent | null> => {
  const result = await Event.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteEvent = async (id: string): Promise<IEvent | null> => {
  const result = await Event.findByIdAndDelete({_id: id});
  return result;
};
export const EventService = {
  createEvent,
  getAllEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
