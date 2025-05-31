"use client";

import EditConcerts from "@/components/editConcerts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddConcert from "@/components/ui/addConcert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import withAuthRedirect from "@/components/withAuthRedirect"; // ✅ Import the HOC

function ConcertsPage() {
  return (
    <div>
      <Link href={"/admin"}>
        <Button className="my-2" variant="outline">
          <ArrowLeft />
        </Button>
      </Link>
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
      </Accordion>
    </div>
  );
}

export default withAuthRedirect(ConcertsPage);
