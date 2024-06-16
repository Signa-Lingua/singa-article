"use server";

import { lucia } from "@/app/auth";
import { cookies } from "next/headers";
import { cache } from "react";

const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) return null;

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (error) {
    console.error(error);
  }

  return user;
});

export { getUser };
