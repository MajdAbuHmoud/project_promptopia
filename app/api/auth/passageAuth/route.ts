// import Prompt from "@models/prompt";
import Passage from "@passageidentity/passage-node";
// import { connectToDB } from "@utils/database";
import { cookies } from "next/dist/client/components/headers";

export const GET = async () => {
  console.log("called");
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
      const { email, phone } = await passage.user.get(userID);

      const identifier = email ? email : phone;
      const result = {
        isAuthorized: true,
        username: identifier,
        appID: passage.appID || "",
      };
      return new Response(JSON.stringify(result), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to authenticate", { status: 500 });
  }

  return new Response(
    JSON.stringify({
      isAuthorized: false,
      username: "",
      appID: passage.appID || "",
    }),
    { status: 200 }
  );
};
