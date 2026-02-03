import mongoose, { Document, Schema, Model } from 'mongoose';
import {
  RESUME_STATUS,
  RESUME_ROLES,
  TEMPLATE_TYPES,
  ResumeStatus,
  ResumeRole,
  TemplateType
} from '@/constants/limit';

export interface IProject {
  repo_name: string;
  repo_url: string;
  description: string;
  bullets: string[];
  technologies: string[];
  live_url?: string;
}

export interface IResumeContent {
  projects: IProject[];
  skills: {
    frontend?: string[];
    backend?: string[];
    databases?: string[];
    tools?: string[];
    other?: string[];
  };
  problems_solved?: string[];
}

export interface IAIMetadata {
  model: string;
  tokens_used: number;
  generation_time_seconds: number;
  cost: number;
  generated_at: Date;
}

export interface IResume extends Document {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  job_description_id?: mongoose.Types.ObjectId; // Optional reference to JobDescription

  // Resume Details
  title: string;
  role: ResumeRole;
  template: TemplateType;

  // Repository Selection
  selected_repos: string[]; // Array of GitHub repo URLs

  // Generated Content
  content: IResumeContent;

  // Status
  status: ResumeStatus;

  // AI Metadata
  ai_metadata: IAIMetadata;

  // PDF Storage
  pdf_url: string | null;
  pdf_expires_at: Date | null; // null for paid users (never expires)

  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    repo_name: {
      type: String,
      required: true
    },
    repo_url: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    bullets: {
      type: [String],
      required: true
    },
    technologies: {
      type: [String],
      default: []
    },
    live_url: {
      type: String,
      default: ''
    }
  },
  { _id: false }
);

const AIMetadataSchema = new Schema<IAIMetadata>(
  {
    model: {
      type: String,
      required: true
    },
    tokens_used: {
      type: Number,
      required: true
    },
    generation_time_seconds: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    generated_at: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  { _id: false }
);

const ResumeSchema = new Schema<IResume>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    job_description_id: {
      type: Schema.Types.ObjectId,
      ref: 'JobDescription',
      default: null
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      enum: Object.values(RESUME_ROLES),
      required: true
    },

    template: {
      type: String,
      enum: Object.values(TEMPLATE_TYPES),
      default: TEMPLATE_TYPES.DEFAULT,
      required: true
    },

    selected_repos: {
      type: [String],
      required: true,
      validate: {
        validator: function (v: string[]) {
          return v.length >= 3;
        },
        message: 'At least 3 repositories must be selected'
      }
    },

    content: {
      type: Schema.Types.Mixed,
      required: true
    },

    status: {
      type: String,
      enum: Object.values(RESUME_STATUS),
      default: RESUME_STATUS.SAVED,
      required: true
    },

    ai_metadata: {
      type: AIMetadataSchema,
      required: true
    },

    pdf_url: {
      type: String,
      default: null
    },

    pdf_expires_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

ResumeSchema.index({ user_id: 1, createdAt: -1 });
ResumeSchema.index({ pdf_expires_at: 1 }); // For cleanup cron job

const ResumeModel: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);

export default ResumeModel;