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
    active: boolean;
}

export const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 0 },
    images: [String],
    active: { type: Boolean, default: true}
}, { timestamps: true });

const Product = mongoose.models?.Product || model<ProductDocument>('Product', ProductSchema);
export default Product;
