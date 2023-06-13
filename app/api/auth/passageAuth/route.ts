import User from "@models/user";
import Passage from "@passageidentity/passage-node";
import { connectToDB } from "@utils/database";
import { cookies } from "next/dist/client/components/headers";

export const GET = async (req: Request, res: Response) => {
  console.log("called");
  const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID!,
    apiKey: process.env.PASSAGE_API_KEY!,
    authStrategy: "HEADER",
  });

  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("psg_auth_token");
    console.log("🚀 ~ file: route.ts:19 ~ authToken:", authToken);
    const req = {
      headers: {
        authorization: `Bearer ${authToken?.value}`,
      },
    };
    const userID = await passage.authenticateRequest(req);
    console.log("🚀 ~ file: route.ts:24 ~ GET ~ userID:", userID);

    if (userID) {
      const { email, phone, user_metadata } = await passage.user.get(userID);
      console.log(
        "🚀 ~ file: route.ts:26 ~ GET ~ user_metadata:",
        user_metadata
      );
      const { username } = user_metadata || ({} as any);

      const identifier = email ? email : phone;
      console.log("🚀 ~ file: route.ts:33 ~ GET ~ identifier:", identifier);

      await connectToDB();

      const userExists = await User.findOne({ email: identifier });
      console.log("🚀 ~ file: route.ts:34 ~ GET ~ userExists:", userExists);

      if (!userExists) {
        // Create user
        await User.create({
          email: email,
          username: username?.replace(" ", "").toLowerCase(),
          image: "/assets/images/user-profile.png",
        });
      }

      const result = {
        _id: userExists?._id,
        isAuthorized: true,
        email: email,
        username: username?.replace(" ", "").toLowerCase(),
        image: userExists?.image || "/assets/images/user-profile.png",
      };
      return new Response(JSON.stringify(result), { status: 200 });
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
