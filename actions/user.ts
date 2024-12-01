'use server'
import { connectDB } from "@/lib/mongodb";
import User, { UserDocument } from "@/models/User";
import Shop, { ShopDocument } from "@/models/Shop";
import bcrypt from "bcryptjs";
import { createStripeAccount } from "./stripe";

export const register = async (values: any) => {
  const { email, password, name } = values;
  await connectDB();
  const userFound = await User.findOne({ email });
  if (userFound) {
    return {
      error: 'Email Taken! Please sign in.'
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  const stripeAccount = await createStripeAccount(user)
  user.stripe.accountId = stripeAccount.id
  await user.save()
}

export const getUserByEmail = async (email: string) => {
  await connectDB();
  return await User.findOne({ email }).populate({
    path: 'shops',
    populate: {
      path: 'products',
      model: 'Product'
    }
  }).lean();
}

export const updateUser = async (id: string, user: any) => {
  await connectDB();
  return await User.findByIdAndUpdate(id, user);
}

export const deleteUser = async (id: string, user: UserDocument) => {
  await connectDB();
  return await User.findByIdAndDelete(id);
}
