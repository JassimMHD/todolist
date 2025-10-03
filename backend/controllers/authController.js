import bcrypt from "bcryptjs";
import { Router } from "express";
import { User } from "../models/userModel.js";
import { authService } from "../services/authService.js";
import { authMiddleware as auth } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // validate
  const result = await new authService().signup(name, email, password);
  res.json(result);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const match = await bcrypt.compare(req.body.password, user.password);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ user });
});

export default router;
