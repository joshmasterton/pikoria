import admin from "firebase-admin";
import { Response, NextFunction } from "express";
import { RequestWithUser } from "../types/request.type";
import "../config/firebase.config";

export const verifyToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  // Check idToken exists
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    throw new Error("Authentication token is missing");
  }

  try {
    // Assign decodedToken to user
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: "Error authenticating user" });
    }
  }
};

export const verifyTokenOptional = async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
) => {
  // Check idToken exists
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    next();
  } else {
    try {
      // Assign decodedToken to user
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;

      next();
    } catch {
      next();
    }
  }
};
