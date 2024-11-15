import mongoose, { Schema, model } from "mongoose";

export interface VariationOption {
    name: string;
    price?: number;
    quantity?: number;
    primary?: boolean
}

export interface Variation {
    name: string,
    variationOptions: VariationOption[]
}

export interface ProductDocument {
    _id: string;
    name: string;
    url: string;
    description: string;
    variations: [Variation]
    images: [string];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export const ProductSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: String,
    variations: [{
        name: {type: String, required: true},

        variationOptions: [{
            name: String,
            price: {type: Number, required: false},
            quantity: {type: Number, required: false},
            primary: {type: Boolean, required: false}
        }]
    }],
    images: [String],
    active: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.models?.Product || model<ProductDocument>('Product', ProductSchema);
export default Product;
