import { fetchCollection } from "@/lib/fetchData";
import { Project } from "@/types/Project";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Projects() {
  const projects: Project[] = await fetchCollection("Projects-new");

  return (
    <section>
      <h1>Projects</h1>
      <ul className="grid sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <li key={project.id} className="bg-accent group hover:cursor-pointer">
            <Link href={"/projects/" + project.artist}>
              <Image
                src={project.imageUrl || "/placeholder.png"}
                alt={project.artist || "Project Image"}
                width={300}
                height={300}
                className="w-full aspect-square object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{project.artist}</h2>
                <Button
                  variant={"link"}
                  className="underline group-hover:no-underline"
                >
                  Read more
                </Button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
