import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Role = "ADMINISTRATOR" | "MANAGER" | "CUSTOMER";

export function useRoleGuard(allowedRoles: Role[]) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const userRole = session.user.role as Role;
    if (!allowedRoles.includes(userRole)) {
      router.push("/dashboard");
    }
  }, [session, status, router, allowedRoles]);

  return {
    isAllowed: session?.user?.role && allowedRoles.includes(session.user.role as Role),
    isLoading: status === "loading",
  };
}