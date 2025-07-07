import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";
import User from "./models/User.js";

const userRegister = async () => {
    await connectToDatabase(); // <--- Don't forget await
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        });
        await newUser.save();
        console.log("✅ Admin user created successfully!");
        process.exit(); // <-- exit after done
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

userRegister();


/*PS F:\Simplilearn Journey\PROJECT4\server> node userSeed.js
✅ Connected to MongoDB*/