import { signUp, signIn } from "../../auth/authController";

export const authResolvers = {
  Mutation: {
    signUp: async (_, { email, password }) => {
      return await signUp(email, password); // Call the signUp function to register a new user and generate JWT
    },
    signIn: async (_, { email, password }) => {
      return await signIn(email, password); // Call the signIn function to log in and generate JWT
    },
  },
};
