import { signUp, signIn } from "../../auth/authController"; // Adjust the import based on your file structure

export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
  Mutation: {
    signUp: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        console.log("This is the data", email, password);
        const authResponse = await signUp(email, password);
        console.log("Response", authResponse);
        return authResponse; // Return the response from signUp function
      } catch (error: unknown) {
        throw new Error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    },
    signIn: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const authResponse = await signIn(email, password);
        return authResponse; // Return the response from signIn function
      } catch (error: unknown) {
        throw new Error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    },
  },
};
