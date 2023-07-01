import User from "@models/user";
import Passage from "@passageidentity/passage-node";
import { connectToDB } from "@utils/database";
import { cookies } from "next/dist/client/components/headers";

export const GET = async (req: Request, res: Response) => {
  const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID!,
    apiKey: process.env.PASSAGE_API_KEY!,
    authStrategy: "HEADER",
  });

  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("psg_auth_token");
    const req = {
      headers: {
        authorization: `Bearer ${authToken?.value}`,
      },
    };

    const userID = await passage.authenticateRequest(req);

    if (userID) {
      const { email, phone, user_metadata } = await passage.user.get(userID);

      const { username } = user_metadata || ({} as any);

      const identifier = email ? email : phone;

      await connectToDB();

      const userExists = await User.findOne({ email: identifier });

      let user = null;

      if (!userExists) {
        // Create user
        await User.create({
          email: email,
          username: username?.replace(" ", "").toLowerCase(),
          image: "/assets/images/user-profile.png",
        });

        // Get new user ID
        const newUser = await User.findOne({ email: email });

        user = {
          _id: newUser._id,
          isAuthorized: true,
          email: newUser.email,
          username: newUser.username?.replace(" ", "").toLowerCase(),
          image: "/assets/images/user-profile.png",
        };
      } else {
        user = {
          _id: userExists._id,
          isAuthorized: true,
          email: email,
          username: username?.replace(" ", "").toLowerCase(),
          image: userExists.image || "/assets/images/user-profile.png",
        };
      }

      return new Response(JSON.stringify(user), { status: 200 });
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        isAuthorized: false,
      }),
      { status: 500, statusText: error || "Failed to authenticate" }
    );
  }

  return new Response(
    JSON.stringify({
      isAuthorized: false,
    }),
    { status: 200, statusText: "Failed to authenticate" }
  );
};
