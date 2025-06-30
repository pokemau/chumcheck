"use server";

import { requireAccessTokenOrRedirect } from "@/lib/auth";
import { BACKEND_API_URL } from "@/lib/constants";
import { Startup } from "@/lib/types";

export async function getStartups(): Promise<Startup[]> {
  const access = await requireAccessTokenOrRedirect();

  const res = await fetch(`${BACKEND_API_URL}/startups/startups`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  const data = await res.json();

  return data;
}
