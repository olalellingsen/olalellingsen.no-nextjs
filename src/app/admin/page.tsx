"use client";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function AdminPage() {
  const [user, setUser] = useState(null as any);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-end sm:items-start h-[80vh]">
        <Button onClick={handleLogin}>Sign in with Google</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 **:w-50 sm:**:h-30">
        <Link href="/admin/concerts">
          <Button variant={"outline"}>Edit concerts</Button>
        </Link>
        <Link href="/admin/discography">
          <Button variant={"outline"}>Edit discography</Button>
        </Link>
        <Link href="/admin/projects">
          <Button variant={"outline"}>Edit projects</Button>
        </Link>
        <Link href="/admin/bio">
          <Button variant={"outline"}>Edit bio</Button>
        </Link>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Button onClick={handleLogout} variant={"destructive"}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
