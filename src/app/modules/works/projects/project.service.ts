import {SortOrder} from "mongoose";
import {paginationHelper} from "../../../../helpers/paginationHelper";
import {IGenericResponse} from "../../../interfaces/common";
import {IPaginationOptions} from "../../../interfaces/pagination";
import {projectSearchableFields} from "./project.constant";
import {IProject, IProjectFilters} from "./project.interface";
import {Project} from "./project.model";

const getAllProject = async (
  filters: IProjectFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IProject[]>> => {
  const {searchTerm, ...filtersData} = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: projectSearchableFields.map((field) => ({
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
  const result = await Project.find(whereConditions)
    .sort({...sortConditions, createdAt: 1})
    .skip(skip)
    .limit(limit);
  const total = await Project.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },

    data: result,
  };
};

const getSingleProject = async (id: string): Promise<IProject | null> => {
  const result = await Project.findById({_id: id}).lean();
  return result;
};

const createProject = async (payload: IProject): Promise<IProject> => {
  const result = await Project.create(payload);
  return result;
};
const updateProject = async (id: string, payload: Partial<IProject>): Promise<IProject | null> => {
  const result = await Project.findOneAndUpdate({_id: id}, payload, {
    new: true,
  });
  return result;
};
const deleteProject = async (id: string): Promise<IProject | null> => {
  const result = await Project.findByIdAndDelete({_id: id});
  return result;
};
export const ProjectService = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
