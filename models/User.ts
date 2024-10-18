import  mongoose, { Schema, model, ObjectId } from  "mongoose";
import { ShopSchema } from "./Shop";
export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  tier: string
  shops: Schema.Types.ObjectId[]
}

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  tier: {
    type: String,
    enum: ['free', 'basic', 'premium'],
    default: 'free'
  },
  shops: {
    type:[{type: Schema.Types.ObjectId, ref: 'Shop'}],
    default: []
  },
},
{
  timestamps: true,
}
);

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);
export  default  User;
