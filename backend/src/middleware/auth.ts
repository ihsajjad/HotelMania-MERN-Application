import { NextFunction, Request, Response } from "express";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import User from "../models/users";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      role: string;
    }
  }
}

type VerifyError = JsonWebTokenError | NotBeforeError | TokenExpiredError;

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];

  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      async (
        error: VerifyError | null,
        decoded: JwtPayload | string | undefined
      ) => {
        if (error)
          return res.status(401).json({ message: "Unauthorized access" });

        const userId = await (decoded as JwtPayload)?.userId;

        req.userId = userId;
        const user = await User.findById(userId);
        if (!user)
          return res.status(401).json({ message: "Unauthorized access" });
        req.role = user.role;

        next();
      }
    );
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyHotelOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== "Hotel")
    return res.status(401).json({ message: "Unauthorized access" });

  next();
};
