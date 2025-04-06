import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./authUtils";

/**
 * Middleware to check if the request contains a valid JWT token.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call if token is valid.
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body?.operationName === "IntrospectionQuery") {
    // This is an introspection query (used by Apollo Playground to get schema information)
    return next();
  }

  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).send("Token is required"); // If no token is provided
  }

  const decoded = verifyToken(token); // Verify the token

  if (!decoded) {
    return res.status(401).send("Invalid or expired token"); // If token is invalid or expired
  }

  //req["userId"] = decoded.userId; // Attach the decoded user ID to the request object
  next(); // Proceed to the next middleware or route handler
};
