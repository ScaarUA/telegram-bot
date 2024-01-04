import mongoose from 'mongoose';

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@bot-cluster.ylaxgtu.mongodb.net/russ-bot?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

export async function connectDb() {
  try {
    await mongoose.connect(uri);

    console.log("Successfully connected to db");
  } catch (e) {
    console.log(e);
  }
}
