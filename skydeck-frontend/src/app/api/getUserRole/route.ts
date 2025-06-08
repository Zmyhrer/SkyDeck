import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
    });
  }

  const userRole = session.user.role;

  return new Response(JSON.stringify({ role: userRole }));
}
