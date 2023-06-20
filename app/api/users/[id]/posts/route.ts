import { RequestParams } from "@interfaces/interfaces";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req: Request, { params }: RequestParams) => {
  try {
    await connectToDB();

    const { id } = params;
    console.log("🚀 ~ file: route.ts:10 ~ GET ~ id:", id);
    if (!id || id === "undefined") {
      return new Response("Missing user id", { status: 400 });
    }

    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");
    console.log("🚀 ~ file: route.ts:15 ~ GET ~ prompts:", prompts);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all user prompts", { status: 500 });
  }
};
