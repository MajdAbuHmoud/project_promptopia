import { cookies } from "next/dist/client/components/headers";

export const GET = async () => {
  try {
    const cookieStore = cookies();
    cookieStore.delete("psg_auth_token");

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200, statusText: "Successfully signed out" }
    );
  } catch (error: any) {
    console.log("🚀 ~ file: route.ts:15 ~ GET ~ error:", error);
    return new Response(
      JSON.stringify({
        success: false,
      }),
      {
        status: 200,
        statusText: error,
      }
    );
  }
};
