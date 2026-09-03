import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiGuard";
import { updateDb } from "@/lib/db";
import type { TechStackItem } from "@/lib/types";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await req.json()) as Omit<TechStackItem, "id">;
  const item: TechStackItem = { id: randomUUID(), ...body };

  const db = updateDb((db) => ({ ...db, techStacks: [...db.techStacks, item] }));
  return NextResponse.json(db.techStacks);
}
