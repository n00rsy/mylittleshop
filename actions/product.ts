"use server"

import Product from "@/models/Product"
import Shop from "@/models/Shop"
import User from "@/models/User"

export const createProduct = async (productInfo: any, s_id: string, u_id: string) => {
    console.log("createProduct got: ", productInfo, s_id, u_id)
    const user = await User.findById(u_id)
    if (!user) {
        return 'User not logged in.'
    }

    const shop = await Shop.findById(s_id)
    if (!shop) {
        return 'Shop does not exist.'
    }
    const newProduct = new Product(productInfo)
    const savedProduct = await newProduct.save();
    shop.products.push([savedProduct._id])
    await shop.save()
    return savedProduct.toObject()
}

export const getProduct = async (p_id: string, u_id: string) => {
    console.log("getProduct got: ", p_id, u_id)

    const product = await Product.findById(p_id)
    if (!product) {
        return 'Shop does not exist.'
    }
    return product.toObject()
}

export const deleteProduct = async (p_id: string, s_id: string, u_id: string) => {
    console.log("getProduct got: ", p_id, u_id)

    await Product.deleteOne({"_id": p_id})
    const shop = await Shop.findById(s_id)
    if (!shop) {
        return 'Shop does not exist.'
    }

    shop.products = shop.products.filter((p) => p != p_id)
    await shop.save()
}
