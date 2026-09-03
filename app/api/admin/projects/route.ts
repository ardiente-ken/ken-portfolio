import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiGuard";
import { updateDb } from "@/lib/db";
import type { Project } from "@/lib/types";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await req.json()) as Omit<Project, "id">;
  const item: Project = { id: randomUUID(), ...body };

  const db = updateDb((db) => ({ ...db, projects: [...db.projects, item] }));
  return NextResponse.json(db.projects);
}
