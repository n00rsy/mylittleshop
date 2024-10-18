import mongoose, { Schema, model } from "mongoose";
import { ProductSchema } from "./Product";

export interface ShopDocument {
    _id: string;
    name: string
    theme: string;
    colors: {
        primary: string,
        secondary: string,
        accent: string
    };
    products: Schema.Types.ObjectId[];
    url: {
        type: string,
        unique: true,
    }
    description: string
    createdAt: Date;
    updatedAt: Date;
}

export const ShopSchema = new Schema({
    name: String,
    theme: {
        type: String, enum: ['light', 'dark', 'minimal', 'modern'],
        default: 'minimal'
    },
    colors: {
        primary: {
            type: String,
            default: '#000000'
        },
        secondary: {
            type: String,
            default: '#FFFFFF'
        },
        accent: {
            type: String,
            default: '#FF0000'
        }
    },
    products: {
        type: [{type: Schema.Types.ObjectId, ref: 'Products'}],
        default: []
    },
}, { timestamps: true }
);

const Shop = mongoose.models?.Shop || model<ShopDocument>('Shop', ShopSchema);
export default Shop;
