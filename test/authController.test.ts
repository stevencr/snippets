import { signUp } from "../src/auth/authController"; // Adjust the import based on your file structure
import { firestore } from "../src/firebase/firebaseAdmin"; // Import Firestore from your firebaseAdmin setup

describe("AuthController signUp", () => {
  it.skip("should successfully sign up a user and store in Firestore", async () => {
    const mockEmail = "test@example.com";
    const mockPassword = "password123";

    const result = await signUp(mockEmail, mockPassword);

    // Assert: Check that the result is correct
    expect(result).toHaveProperty("email", mockEmail);
    expect(result).toHaveProperty("id");

    // Check that user data exists in Firestore
    const userRef = firestore.collection("users").doc(result.id);
    const userDoc = await userRef.get();
    expect(userDoc.exists).toBe(true);

    const userData = userDoc.data();
    expect(userData).toHaveProperty("email", mockEmail);
    expect(userData).toHaveProperty("password", mockPassword);
  });

  it("should throw an error if sign up fails", async () => {
    const result = signUp("", "abcdef"); // Passing invalid data
    await expect(result).rejects.toThrow("Sign-up failed");
  });
});
