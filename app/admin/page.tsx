import { redirect } from "next/navigation";
import { getIsAuthenticated } from "@/lib/auth";

export default async function AdminIndex() {
  const authed = await getIsAuthenticated();
  redirect(authed ? "/admin/dashboard" : "/admin/login");
}
