"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import withAuthRedirect from "@/components/withAuthRedirect";
import AddProject from "@/components/addProject";
import EditProjects from "@/components/editProjects";

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
          <AccordionTrigger>Add project</AccordionTrigger>
          <AccordionContent>
            <AddProject />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Edit projects</AccordionTrigger>
          <AccordionContent>
            <EditProjects />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default withAuthRedirect(ConcertsPage);
