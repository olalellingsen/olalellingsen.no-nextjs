"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuthRedirect(Component: React.FC) {
  return function ProtectedComponent() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/admin");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <div className="text-center py-10">Loading...</div>;
    }

    return <Component />;
  };
}
