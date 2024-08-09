import {Request, Response} from "express";
import httpStatus from "http-status";
import {paginationFields} from "../../../../constants/pagination";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import {ISkill} from "./skill.interface";
import {skillFilterableFields} from "./skill.constant";
import {SkillService} from "./skill.service";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const {...Skill} = req.body;
  // create Skill
  const result = await SkillService.createSkill(Skill);

  //  send response
  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill create successfully.",
    data: result,
  });
});
const getAllSkill = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, skillFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SkillService.getAllSkill(filters, paginationOptions);
  //  send response
  sendResponse<ISkill[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await SkillService.getSingleSkill(id);

  // send response
  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Skill fetch successfully",
    data: result,
  });
});
const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const {...academicFaculty} = req.body;
  const result = await SkillService.updateSkill(id, academicFaculty);

  // send response
  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill updated successfully.",
    data: result,
  });
});
const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await SkillService.deleteSkill(id);

  // send response
  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill deleted successfully.",
    data: result,
  });
});

export const SkillController = {
  createSkill,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
