import { firestore } from "../firebase/firebaseAdmin"; // Firestore configuration import
import bcrypt from "bcryptjs"; // For password hashing and comparison
import { generateToken } from "../auth/authUtils";

export const signUp = async (
  email: string,
  password: string
): Promise<{ email: string; token: string }> => {
  const userRef = firestore.collection("users").doc(email);
  const userDoc = await userRef.get();
  if (userDoc.exists) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userRef.set({
    email,
    password: hashedPassword,
  });
  const token = generateToken(email);
  return { email, token };
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ email: string; token: string }> => {
  const userRef = firestore.collection("users").doc(email);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }
  const user = userDoc.data();
  const isValidPassword = await bcrypt.compare(password, user?.password || "");
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(email);
  return { email, token };
};
