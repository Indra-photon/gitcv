import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAdmin extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

const AdminModel: Model<IAdmin> =
    mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default AdminModel;
