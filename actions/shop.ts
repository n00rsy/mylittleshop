'use server'
import { connectDB } from "@/lib/mongodb";
import Shop from "@/models/Shop";
import  User from "@/models/User";

// TODO: switch to session for uid
export const createShop = async (shop: any, u_id: string) => {
    await connectDB();
    const user = await User.findById(u_id)
    const shopFound = await Shop.findOne({url: shop.url});
    if (shopFound) {
      return {error: `website url taken!`}
    }
    const newShop = new Shop(shop);
    const savedShop = await newShop.save();
    user.shops.push([savedShop._id])
    await user.save()
    return savedShop.lean()
  }

  export const updateShop = async (u_id: string, shop: any) => {
    console.log("updateShop user: ", u_id)
    console.log("updateShop shop: ", shop)
    await connectDB();
    const user = await User.findById(u_id)
    if (!user.shops.includes(shop._id)) {
      return {error: `unauthorized to edit ${shop.name}`}
    }

    const updatedShop = await Shop.findByIdAndUpdate(shop._id, shop);
    if (!updatedShop) {
      return {error:`shop does not exist: ${shop.name}`}
    }
    console.log("updated shop: ", updatedShop)
    // return updatedShop.lean()
  }


  export const getShopByUrl = async (url: string) => {
    console.log("getShopByUrl: ", url)
    await connectDB();
    const shop = await Shop.findOne({url: url}).populate('products')
    if (!shop) {
      return {error:`shop does not exist: ${url}`}
    }
    return shop.toObject()
    // return updatedShop.lean()
  }
