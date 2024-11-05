import mongoose, { Schema, model } from "mongoose";

export const themes = ['modern', 'elegant', 'bold']
export const colorSchemes = ['light', 'dark']

export interface ContactLink {
    type: string;
    value: string;
}

export interface ShopDocument {
    _id: string;
    name: string;
    styles: {
        theme: string;
        primaryColor: string;
        mantineColor: string[];
        colorScheme: string;
    }
    products: Schema.Types.ObjectId[];
    url: string,
    tagline: string,
    about: string,
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    contactLinks: ContactLink[]
}

export const ShopSchema = new Schema({
    name: String,
    tagline: String,
    about: String,
    styles: {
        primaryColor: {
            type: String,
            default: '#4c5897'
        },
        mantineColor: {
            type: [String]
        },
        colorScheme: {
            type: String, enum: colorSchemes,
            default: 'light'
        },
        theme: {
            type: String, enum: themes,
            default: 'modern'
        }
    },
    products: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        default: []
    },
    active: { type: Boolean, default: false },
    url: {
        type: String,
        unique: true,
    },
    contactLinks: [
        {
            type: {
                type: String,
                enum: ['phone', 'address', 'email', 'instagram', 'website', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok', 'discord', 'whatsapp'],
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true }
);

const Shop = mongoose.models?.Shop || model<ShopDocument>('Shop', ShopSchema);
export default Shop;
