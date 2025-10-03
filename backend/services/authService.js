import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

class authService {
  signup = async (name, email, password) => {
    // Implement signup logic here
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashed,
    });
    await user.save();

    return { msg: "User registered", sucess: 1 };
  };
}

export { authService };
