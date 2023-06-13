export const GET = async () => {
  return new Response(
    JSON.stringify({
      appID: process.env.PASSAGE_APP_ID!,
      apiKey: process.env.PASSAGE_API_KEY!,
    }),
    { status: 200 }
  );
};
