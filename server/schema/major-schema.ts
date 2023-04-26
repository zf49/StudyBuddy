import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IMajorOption {
  faculty: string;
  major: string;
}

const majorSchema = new Schema<IMajorOption>({
  faculty: { type: String, required: true },
  major: { type: String, required: true },
});

const Major = mongoose.model("Major", majorSchema);

export { Major };
