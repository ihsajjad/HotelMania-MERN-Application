import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users";
import { generateToken } from "../shared/utils";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.cookies["auth_token"];

    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const userId = await (decoded as JwtPayload)?.userId;

    if (!userId)
      return res.status(401).json({ message: "Unauthorized access" });

    const user = await User.findById(userId).select("-password -_id -name");
    if (!user) return res.status(400).json({ message: "Something went wrong" });

    res.status(200).json(user);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail().trim(),
    check("password", "Password is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid credentials", data: result.array() });

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user._id);

      const data = {
        _id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile || "",
      };

      res
        .cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400000,
        })
        .json(data);
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/logout", async (req: Request, res: Response) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
});

export default router;
