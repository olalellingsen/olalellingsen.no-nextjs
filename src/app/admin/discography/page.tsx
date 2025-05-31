"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EditDiscography from "@/components/editDiscography";
import AddAlbumSingle from "@/components/addAlbumSingle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import withAuthRedirect from "@/components/withAuthRedirect";

function DiscograpyPage() {
  return (
    <div>
      <Link href={"/admin"}>
        <Button className="my-2" variant="outline">
          <ArrowLeft />
        </Button>
      </Link>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger>Add album or single</AccordionTrigger>
          <AccordionContent>
            <AddAlbumSingle />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Edit discography</AccordionTrigger>
          <AccordionContent>
            <EditDiscography />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default withAuthRedirect(DiscograpyPage);
