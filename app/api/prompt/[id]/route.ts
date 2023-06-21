import { RequestParams } from "@interfaces/interfaces";
import Prompt from "@models/prompt";
import { PromptType } from "@types";
import { connectToDB } from "@utils/database";

// GET Prompt
export const GET = async (req: Request, { params }: RequestParams) => {
  try {
    await connectToDB();

    const { id } = params;

    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

// PATCH Prompt
export const PATCH = async (req: Request, { params }: RequestParams) => {
  try {
    await connectToDB();

    const { id } = params;

    const promptToBeUpdated = await Prompt.findById(id);

    if (!promptToBeUpdated) {
      return new Response("Prompt not found", { status: 404 });
    }

    const promptFromJSON: PromptType = await req.json();

    const { prompt, tag } = JSON.parse(JSON.stringify(promptFromJSON));

    promptToBeUpdated.prompt = prompt;
    promptToBeUpdated.tag = tag;

    await promptToBeUpdated.save();

    return new Response(JSON.stringify(promptToBeUpdated), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE Prompt
export const DELETE = async (req: Request, { params }: RequestParams) => {
  try {
    await connectToDB();

    const { id } = params;

    await Prompt.findByIdAndRemove(id);

    return new Response("Prompt deleted", { status: 200 });
  } catch (error: any) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
