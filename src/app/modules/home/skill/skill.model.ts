import {Schema, model} from "mongoose";
import {ISkill, SkillModel} from "./skill.interface";

const SkillSchema = new Schema<ISkill, SkillModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Skill = model<ISkill, SkillModel>("Skill", SkillSchema);
