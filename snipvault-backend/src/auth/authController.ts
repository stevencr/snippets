import bcrypt from "bcryptjs";
import { generateToken } from "./authUtils";
import { firestore } from "../firebase/firebaseAdmin"; // Assuming you're using Firestore for storage

/**
 * Registers a new user by hashing their password and saving their details.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns {string} - The generated JWT token.
 */
export const signUp = async (
  email: string,
  password: string
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 salt rounds
  const userRef = firestore.collection("users").doc(email); // Save the user in Firestore

  await userRef.set({
    email,
    password: hashedPassword,
  });

  const token = generateToken(email); // Generate JWT token for the user
  return token;
};

/**
 * Logs in an existing user by comparing passwords and generating a JWT.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns {string} - The generated JWT token.
 */
export const signIn = async (
  email: string,
  password: string
): Promise<string> => {
  const userRef = firestore.collection("users").doc(email); // Check if the user exists in Firestore
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  const user = userDoc.data();
  const isValidPassword = await bcrypt.compare(password, user?.password || ""); // Compare provided password with stored hash

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(email); // Generate JWT token
  return token;
};
