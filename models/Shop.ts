import mongoose, { Schema, model } from "mongoose";
import { ProductSchema } from "./Product";

export const themes = ['modern', 'elegant', 'bold']

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
    url: string,
    tagline: string,
    about: string,
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const ShopSchema = new Schema({
    name: String,
    tagline: String,
    about: String,
    theme: {
        type: String, enum: themes,
        default: 'modern'
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
        type: [{type: Schema.Types.ObjectId, ref: 'Product'}],
        default: []
    },
    active: { type: Boolean, default: true},
    url: {
        type: String,
        unique: true,
    }
}, { timestamps: true }
);

const Shop = mongoose.models?.Shop || model<ShopDocument>('Shop', ShopSchema);
export default Shop;
