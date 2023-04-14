import mongoose from "mongoose";

const connect = async (url: string) => {
  await mongoose.connect(url);
  console.log("Connected to database!");
};

export default connect;
