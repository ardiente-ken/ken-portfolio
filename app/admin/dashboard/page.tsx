import { redirect } from "next/navigation";
import { getIsAuthenticated } from "@/lib/auth";
import { readDb } from "@/lib/db";
import Dashboard from "@/components/admin/Dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const authed = await getIsAuthenticated();
  if (!authed) redirect("/admin/login");

  const db = readDb();
  return <Dashboard initialData={db} />;
}
