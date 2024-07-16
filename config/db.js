import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.dburl)
      .then(() => {
        console.log("db is conncted");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    // mongodb://localhost:27017/globalQr
  }
};
