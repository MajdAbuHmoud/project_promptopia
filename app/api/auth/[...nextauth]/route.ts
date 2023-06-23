import { ProfileModified } from "@interfaces/interfaces";
import User from "@models/user";
import { UserType } from "@types";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        const sessionUser = await User.findOne({ email: session.user.email });

        const user = {
          sessionId: sessionUser?._id.toString(),
          username: session.user.name,
          email: session.user.email,
          image: session.user.image,
        } as UserType;

        session.user = user;
      }

      return session;
    },
    async signIn({ profile }) {
      const { email, name, picture } = profile as ProfileModified;

      try {
        await connectToDB();

        if (profile) {
          // Check if user exists
          const userExists = await User.findOne({ email: profile.email });

          // Todo: Handle duplicate username

          if (!userExists) {
            // Create user
            await User.create({
              email: email,
              username: name?.replace(" ", "").toLowerCase(),
              image: picture,
            });
          }
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
