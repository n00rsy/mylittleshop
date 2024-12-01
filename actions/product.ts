'use server'

import { connectDB } from "@/lib/mongodb"
import Product, { VariationOption } from "@/models/Product"
import Shop from "@/models/Shop"
import User from "@/models/User"
import { createStripeProduct } from "./stripe"

export const createProduct = async (productInfo: any, s_id: string, u_id: string) => {
    console.log("createProduct got: ", productInfo, s_id, u_id)
    console.log(productInfo.variations[0].variationOptions)
    await connectDB();
    const user = await User.findById(u_id)
    if (!user) {
        return 'User not logged in.'
    }

    const shop = await Shop.findById(s_id)
    if (!shop) {
        return 'Shop does not exist.'
    }
    let newVariationOptions: VariationOption[] = []
    await productInfo.variations[0].variationOptions.forEach(async (variationOption: VariationOption) => {
        console.log("processing variation: ", variationOption)
        const stripeProduct = await createStripeProduct({
            _id: variationOption._id,
            name: `${productInfo.name} - ${variationOption.name}`,
            description: productInfo.description,
            active: variationOption.active,
            images: productInfo.images,
            price: variationOption.price,
            quantity: variationOption.quantity,
            url: productInfo.url
        })
        newVariationOptions.push({
            name: variationOption.name,
            price: variationOption.price,
            quantity: variationOption.quantity,
            primary: variationOption.primary,
            stripeId: stripeProduct.id,
            active: variationOption.active
        })
        console.log("added ", variationOption.name)
    })
    console.log("YEEEEEE", productInfo.variations[0].variationOptions[0])
    productInfo.variations[0].variationOptions = newVariationOptions
    console.log("YEEEEEE", productInfo.variations[0].variationOptions[0])
    let newProduct = new Product(productInfo)
    // newProduct.variations[0].variationOptions = newVariationOptions
    console.log(newProduct)
    const savedProduct = await newProduct.save();
    shop.products.push([savedProduct._id])
    await shop.save()
    console.log("saved product: ", savedProduct.toObject())
    return savedProduct.toObject()
}

export const createProductWithoutDb = async (productInfo: any) => {
    console.log("createProductWithoutDb", productInfo)
    await connectDB();
    const newProduct = new Product(productInfo)
    return newProduct.toObject()
}

export const getProduct = async (p_id: string, u_id: string) => {
    console.log("getProduct got: ", p_id, u_id)
    await connectDB();
    const product = await Product.findById(p_id)
    if (!product) {
        return 'Shop does not exist.'
    }
    return product.toObject()
}

export const deleteProduct = async (p_id: string, s_id: string, u_id: string) => {
    console.log("getProduct got: ", p_id, u_id)
    await connectDB();

    await Product.deleteOne({ "_id": p_id })
    const shop = await Shop.findById(s_id)
    if (!shop) {
        return 'Shop does not exist.'
    }

    shop.products = shop.products.filter((p) => p != p_id)
    await shop.save()
}
