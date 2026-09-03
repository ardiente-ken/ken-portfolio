import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiGuard";
import { updateDb } from "@/lib/db";
import type { Profile } from "@/lib/types";

export async function PUT(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const profile = (await req.json()) as Profile;
  const db = updateDb((db) => ({ ...db, profile }));
  return NextResponse.json(db.profile);
}
