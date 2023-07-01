import { cookies } from "next/dist/client/components/headers";

// export const dynamic = "force-dynamic";

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
    return new Response(
      JSON.stringify({
        success: false,
        error,
      }),
      {
        status: 200,
        statusText: error,
      }
    );
  }
};
