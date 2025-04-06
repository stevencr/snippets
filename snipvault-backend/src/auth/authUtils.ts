import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

/**
 * Generates a JWT token.
 * @param userId - The user ID to embed in the token.
 * @returns {string} - JWT Token.
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};

/**
 * Verifies the given JWT token.
 * @param token - The JWT token to verify.
 * @returns {object | null} - Returns the decoded token if valid, otherwise null.
 */
export const verifyToken = (token: string): object | null => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null; // Return null if the token is invalid
  }
};
