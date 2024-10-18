"use server"
import { connectDB } from "@/lib/mongodb";
import Shop from "@/models/Shop";
import  User from "@/models/User";

export const createShop = async (shop: any, u_id: string) => {
    await connectDB();
    const user = await User.findById(u_id)
    const shopFound = await Shop.findOne({url: shop.url});
    if (shopFound) {
      return {
        error: 'url already exists!'
      }
    }
    const newShop = new Shop(shop);
    const savedShop = await newShop.save();
    user.shops.push([savedShop._id])
    await user.save()

  }
