"use client";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddConcert from "@/components/ui/addConcert";
import EditConcerts from "@/components/ui/editConcerts";
import AddAlbumSingle from "@/components/ui/addAlbumSingle";

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
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger>Add concert</AccordionTrigger>
          <AccordionContent>
            <AddConcert />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Edit concerts</AccordionTrigger>
          <AccordionContent>
            <EditConcerts />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Add album or single</AccordionTrigger>
          <AccordionContent>
            <AddAlbumSingle />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Edit discography</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Edit bio</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
      <br />
      <div className="flex justify-center">
        <Button onClick={handleLogout} variant={"destructive"}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
