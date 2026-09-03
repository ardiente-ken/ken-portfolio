import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiGuard";
import { updateDb } from "@/lib/db";
import type { Project } from "@/lib/types";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;

  const body = (await req.json()) as Partial<Project>;
  const db = updateDb((db) => ({
    ...db,
    projects: db.projects.map((p) => (p.id === id ? { ...p, ...body, id } : p)),
  }));
  return NextResponse.json(db.projects);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;

  const db = updateDb((db) => ({
    ...db,
    projects: db.projects.filter((p) => p.id !== id),
  }));
  return NextResponse.json(db.projects);
}
