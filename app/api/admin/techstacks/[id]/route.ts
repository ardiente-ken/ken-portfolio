import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiGuard";
import { updateDb } from "@/lib/db";
import type { TechStackItem } from "@/lib/types";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;

  const body = (await req.json()) as Partial<TechStackItem>;
  const db = updateDb((db) => ({
    ...db,
    techStacks: db.techStacks.map((t) => (t.id === id ? { ...t, ...body, id } : t)),
  }));
  return NextResponse.json(db.techStacks);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;

  const db = updateDb((db) => ({
    ...db,
    techStacks: db.techStacks.filter((t) => t.id !== id),
    projects: db.projects.map((p) => ({
      ...p,
      techStack: p.techStack.filter((tid) => tid !== id),
    })),
  }));
  return NextResponse.json(db.techStacks);
}
