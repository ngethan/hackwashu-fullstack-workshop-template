import { auth as betterAuth } from "~/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
  const session = await betterAuth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export { betterAuth as auth };
