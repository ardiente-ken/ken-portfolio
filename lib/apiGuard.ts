import { NextResponse } from "next/server";
import { getIsAuthenticated } from "./auth";

export async function requireAdmin() {
  const ok = await getIsAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  return null;
}
