import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJobDescription extends Document {
  user_id: mongoose.Types.ObjectId;
  description: string;
  last_used_at?: Date;
  usage_count: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobDescriptionSchema = new Schema<IJobDescription>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    last_used_at: {
      type: Date,
      default: null
    },
    usage_count: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const JobDescriptionModel: Model<IJobDescription> = 
  mongoose.models.JobDescription || mongoose.model<IJobDescription>('JobDescription', JobDescriptionSchema);

export default JobDescriptionModel;