import mongoose from "mongoose";
const { MONGO_URI } = process.env;
const options = {appName: 'devrel.article.nextauthjs'};
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI as string, options);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
