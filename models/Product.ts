import mongoose, { Schema, model } from "mongoose";

export interface VariationOption {
    name: string;
    price?: number;
    quantity?: number;
}

export interface Variation {
    name: string,
    variationOptions: VariationOption[]
}

export interface ProductDocument {
    _id: string;
    name: string;
    urlName: string;
    description: string;
    price: number;
    variations: [Variation]
    images: [string];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export const ProductSchema = new Schema({
    name: { type: String, required: true },
    urlName: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    variations: [{
        name: String,
        variations: [{
            name: String,
            price: {type: Number, required: false},
            quantity: {type: Number, required: false},
        }]
    }],
    images: [String],
    active: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.models?.Product || model<ProductDocument>('Product', ProductSchema);
export default Product;
