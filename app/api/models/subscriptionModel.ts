// import mongoose, { Document, Schema, Model } from 'mongoose';
// import {
//   SUBSCRIPTION_TIERS,
//   SUBSCRIPTION_STATUS,
//   FREE_GENERATION_ATTEMPTS_LIMIT,
//   FREE_SAVED_RESUMES_LIMIT,
//   PAID_MONTHLY_RESUMES_LIMIT,
//   PAID_GENERATION_ATTEMPTS_LIMIT,
//   PAID_SAVED_RESUMES_LIMIT,
//   SubscriptionTier,
//   SubscriptionStatus
// } from '@/constants/limit';

// export interface ISubscription extends Document {
//   _id: mongoose.Types.ObjectId;
//   user_id: mongoose.Types.ObjectId;
  
//   // Subscription Details
//   tier: SubscriptionTier;
//   status: SubscriptionStatus;
  
//   // Free Tier Limits
//   generation_attempts_used: number;
//   generation_attempts_limit: number;
//   saved_resumes_count: number;
//   saved_resumes_limit: number;
  
//   // Paid Tier Limits (resets monthly)
//   monthly_resumes_created: number;
//   monthly_resumes_limit: number;
  
//   // Billing Information
//   current_period_start: Date | null;
//   current_period_end: Date | null;
  
//   createdAt: Date;
//   updatedAt: Date;
// }

// const SubscriptionSchema = new Schema<ISubscription>(
//   {
//     user_id: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//       unique: true
//     },
    
//     tier: {
//       type: String,
//       enum: Object.values(SUBSCRIPTION_TIERS),
//       default: SUBSCRIPTION_TIERS.FREE,
//       required: true
//     },
    
//     status: {
//       type: String,
//       enum: Object.values(SUBSCRIPTION_STATUS),
//       default: SUBSCRIPTION_STATUS.ACTIVE,
//       required: true
//     },
    
//     // Free Tier Tracking
//     generation_attempts_used: {
//       type: Number,
//       default: 0
//     },
//     generation_attempts_limit: {
//       type: Number,
//       default: FREE_GENERATION_ATTEMPTS_LIMIT
//     },
//     saved_resumes_count: {
//       type: Number,
//       default: 0
//     },
//     saved_resumes_limit: {
//       type: Number,
//       default: FREE_SAVED_RESUMES_LIMIT
//     },
    
//     // Paid Tier Tracking (monthly reset)
//     monthly_resumes_created: {
//       type: Number,
//       default: 0
//     },
//     monthly_resumes_limit: {
//       type: Number,
//       default: PAID_MONTHLY_RESUMES_LIMIT
//     },
    
//     // Billing
//     current_period_start: {
//       type: Date,
//       default: null
//     },
//     current_period_end: {
//       type: Date,
//       default: null
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// SubscriptionSchema.index({ user_id: 1 });
// SubscriptionSchema.index({ stripe_customer_id: 1 });
// SubscriptionSchema.index({ stripe_subscription_id: 1 });

// const SubscriptionModel: Model<ISubscription> = 
//   mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

// export default SubscriptionModel;


import mongoose, { Document, Schema, Model } from 'mongoose';
import {
  SUBSCRIPTION_TIERS,
  SUBSCRIPTION_STATUS,
  FREE_GENERATION_ATTEMPTS_LIMIT,
  FREE_SAVED_RESUMES_LIMIT,
  PAID_MONTHLY_RESUMES_LIMIT,
  PAID_GENERATION_ATTEMPTS_LIMIT,
  PAID_SAVED_RESUMES_LIMIT,
  SubscriptionTier,
  SubscriptionStatus
} from '@/constants/limit';

export interface ISubscription extends Document {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  
  // Subscription Details
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  
  // Free Tier Limits
  generation_attempts_used: number;
  generation_attempts_limit: number;
  saved_resumes_count: number;
  saved_resumes_limit: number;
  
  // Paid Tier Limits (resets monthly)
  monthly_resumes_created: number;
  monthly_resumes_limit: number;
  
  // Billing Information
  current_period_start: Date | null;
  current_period_end: Date | null;
  dodo_customer_id: string | null;
  dodo_subscription_id: string | null;
  dodo_payment_id: string | null;
  
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    
    tier: {
      type: String,
      enum: Object.values(SUBSCRIPTION_TIERS),
      default: SUBSCRIPTION_TIERS.FREE,
      required: true
    },
    
    status: {
      type: String,
      enum: Object.values(SUBSCRIPTION_STATUS),
      default: SUBSCRIPTION_STATUS.ACTIVE,
      required: true
    },
    
    // Free Tier Tracking
    generation_attempts_used: {
      type: Number,
      default: 0
    },
    generation_attempts_limit: {
      type: Number,
      default: FREE_GENERATION_ATTEMPTS_LIMIT
    },
    saved_resumes_count: {
      type: Number,
      default: 0
    },
    saved_resumes_limit: {
      type: Number,
      default: FREE_SAVED_RESUMES_LIMIT
    },
    
    // Paid Tier Tracking (monthly reset)
    monthly_resumes_created: {
      type: Number,
      default: 0
    },
    monthly_resumes_limit: {
      type: Number,
      default: PAID_MONTHLY_RESUMES_LIMIT
    },
    
    // Billing
    current_period_start: {
      type: Date,
      default: null
    },
    current_period_end: {
      type: Date,
      default: null
    },
    dodo_customer_id: {
      type: String,
      default: null
    },
    dodo_subscription_id: {
      type: String,
      default: null
    },
    dodo_payment_id: {
      type: String,
      default: null
    },
  },
  {
    timestamps: true
  }
);

const SubscriptionModel: Model<ISubscription> = 
  mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default SubscriptionModel;