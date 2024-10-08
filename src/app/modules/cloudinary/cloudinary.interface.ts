import {Model} from "mongoose";

export interface ICloudinary {
  asset_id?: string;
  public_id: string;
  format?: string;
  version?: number;
  resource_type?: string;
  type?: string;
  created_at?: string;
  bytes?: number;
  width?: number;
  height?: number;
  folder?: string;
  url: string;
  secure_url?: string;
}

export type CloudinaryModel = Model<ICloudinary, Record<string, unknown>>;

export interface ICloudinaryFilters {
  searchTerm?: string;
  url?: string;
  public_id?: string;
}
