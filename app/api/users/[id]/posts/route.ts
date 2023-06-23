import { RequestParams } from "@interfaces/interfaces";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req: Request, { params }: RequestParams) => {
  try {
    await connectToDB();

    const { id } = params;
    if (!id || id === "undefined") {
      return new Response("Missing user id", { status: 400 });
    }

    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all user prompts", { status: 500 });
  }
};
