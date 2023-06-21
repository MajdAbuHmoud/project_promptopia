import Prompt from "@models/prompt";
import { PromptType } from "@types";
import { connectToDB } from "@utils/database";

export const POST = async (req: Request) => {
  const promptFromJSON: PromptType = await req.json();

  const { userId, prompt, tag } = JSON.parse(JSON.stringify(promptFromJSON));

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
