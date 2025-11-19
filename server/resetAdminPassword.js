import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";

dotenv.config({ path: "./.env" });

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🔌 Connected to DB");

    const hashedPassword = await bcrypt.hash("Admin123", 10);

    const admin = await User.findOneAndUpdate(
      { email: "admin@portfolio.com" },
      {
        fullName: "Admin Account",
        email: "admin@portfolio.com",
        password: hashedPassword,
        role: "admin"
      },
      { upsert: true, new: true }
    );

    console.log(" Admin updated successfully:");
    console.log("Email:", admin.email);
    console.log("Password:", "Admin123");
    console.log("Role:", admin.role);
  } catch (err) {
    console.error(" Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

resetAdmin();
