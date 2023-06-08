import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", false);

  if (isConnected) {
    console.log("already connected to database");
    return;
  }

  const connectOptions = {
    dbName: "share_prompt",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions;

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", connectOptions);

    isConnected = true;
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

export { connectToDB };
