// import mongoose, { Document, Schema, Model } from 'mongoose';

// export interface IEducation {
//   degree: string;
//   school: string;
//   start_year: number;
//   end_year: number | null;
//   gpa?: number | null;
// }

// export interface IWorkExperience {
//   job_title: string;
//   company: string;
//   start_date: Date;
//   end_date: Date | null;
//   description: string;
// }

// export interface IUser extends Document {
//   _id: mongoose.Types.ObjectId;
//   clerk_id: string;
//   github_username: string;
  
//   // Profile Information
//   phone: string | null;
//   location: string | null;
//   portfolio_url: string | null;
//   linkedin_url: string | null;
//   professional_headline: string | null;
  
//   // Education (array)
//   education: IEducation[];
  
//   // Work Experience (array)
//   work_experience: IWorkExperience[];
  
//   // Additional (optional) Information
//   certifications?: string[];
//   languages?: string[];
//   custom_skills?: string[];

//   createdAt: Date;
//   updatedAt: Date;
// }

// const EducationSchema = new Schema<IEducation>(
//   {
//     degree: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     school: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     start_year: {
//       type: Number,
//       required: true
//     },
//     end_year: {
//       type: Number,
//       default: null
//     },
//     gpa: {
//       type: Number,
//       default: null
//     }
//   },
//   { _id: false }
// );

// const WorkExperienceSchema = new Schema<IWorkExperience>(
//   {
//     job_title: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     company: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     start_date: {
//       type: Date,
//       required: true
//     },
//     end_date: {
//       type: Date,
//       default: null
//     },
//     description: {
//       type: String,
//       required: true
//     }
//   },
//   { _id: false }
// );

// const UserSchema = new Schema<IUser>(
//   {
//     clerk_id: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     github_username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },
    
//     // Profile Information
//     phone: {
//       type: String,
//       default: null,
//       trim: true
//     },
//     location: {
//       type: String,
//       default: null,
//       trim: true
//     },
//     portfolio_url: {
//       type: String,
//       default: null,
//       trim: true
//     },
//     linkedin_url: {
//       type: String,
//       default: null,
//       trim: true
//     },
//     professional_headline: {
//       type: String,
//       default: null,
//       trim: true
//     },
    
//     // Education array
//     education: {
//       type: [EducationSchema],
//       default: []
//     },
    
//     // Work Experience array
//     work_experience: {
//       type: [WorkExperienceSchema],
//       default: []
//     },
    
//     // Additional Information
//     certifications: {
//       type: [String],
//       default: []
//     },
//     languages: {
//       type: [String],
//       default: []
//     },
//     custom_skills: {
//       type: [String],
//       default: []
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// UserSchema.index({ clerk_id: 1 });
// UserSchema.index({ github_username: 1 });

// const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// export default UserModel;


import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IEducation {
  degree: string;
  school: string;
  start_year: number;
  end_year: number | null;
  gpa?: number | null;
}

export interface IWorkExperience {
  job_title: string;
  company: string;
  start_date: Date;
  end_date: Date | null;
  description: string;
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  clerk_id: string;
  github_username: string;
  
  // Profile Information
  full_name?: string | null;
  phone: string | null;
  location: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  professional_headline: string | null;
  
  // Education (array)
  education: IEducation[];
  
  // Work Experience (array)
  work_experience: IWorkExperience[];
  
  // Additional
  certifications: string[];
  languages: string[];
  custom_skills: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: {
      type: String,
      required: true,
      trim: true
    },
    school: {
      type: String,
      required: true,
      trim: true
    },
    start_year: {
      type: Number,
      required: true
    },
    end_year: {
      type: Number,
      default: null
    },
    gpa: {
      type: Number,
      default: null
    }
  },
  { _id: false }
);

const WorkExperienceSchema = new Schema<IWorkExperience>(
  {
    job_title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      default: null
    },
    description: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    clerk_id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    github_username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    
    // Profile Information
    full_name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      default: null,
      trim: true
    },
    location: {
      type: String,
      default: null,
      trim: true
    },
    portfolio_url: {
      type: String,
      default: null,
      trim: true
    },
    linkedin_url: {
      type: String,
      default: null,
      trim: true
    },
    professional_headline: {
      type: String,
      default: null,
      trim: true
    },
    
    // Education array
    education: {
      type: [EducationSchema],
      default: []
    },
    
    // Work Experience array
    work_experience: {
      type: [WorkExperienceSchema],
      default: []
    },
    
    // Additional Information
    certifications: {
      type: [String],
      default: []
    },
    languages: {
      type: [String],
      default: []
    },
    custom_skills: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;