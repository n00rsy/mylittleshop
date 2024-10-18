import mongoose, { Schema, model } from "mongoose";

export interface ProductDocument {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: [string];
    createdAt: Date;
    updatedAt: Date;
}

export const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 0 },
    images: [String],
}, { timestamps: true });

const Product = mongoose.models?.Product || model<ProductDocument>('Product', ProductSchema);
export default Product;
