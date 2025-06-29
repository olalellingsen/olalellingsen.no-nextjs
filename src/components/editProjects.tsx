import { fetchCollection } from "@/lib/fetchData";
import { Project } from "@/types/Project";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { updateDocument } from "@/lib/fetchData"; // add this
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import ImageInput from "./ui/imageInput";
import Link from "next/link";

export default function EditProjects() {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const projectData = await fetchCollection("Projects-new");
      if (!projectData || projectData.length === 0) {
        console.error("No project data found");
        return;
      }
      setProjectData(
        projectData.map((item: any) => ({
          id: item.id,
          artist: item.artist ?? "",
          bio: item.bio ?? "",
          imageUrl: item.imageUrl ?? "",
          homepageUrl: item.homepageUrl ?? "",
          spotifyUrl: item.spotifyUrl ?? "",
          youtubeUrl: item.youtubeUrl ?? "",
        }))
      );
    };
    loadData();
  }, []);

  const uploadImage = async (file: File) => {
    const storageRef = ref(
      storage,
      `Project-Images/${Date.now()}-${file.name}`
    );
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    if (selectedProject) {
      setSelectedProject({ ...selectedProject, imageUrl: downloadUrl });
    }
  };

  const handleUpdate = async () => {
    if (!selectedProject) return;
    try {
      await updateDocument("Projects-new", selectedProject.id, {
        artist: selectedProject.artist,
        bio: selectedProject.bio,
        homepageUrl: selectedProject.homepageUrl,
        imageUrl: selectedProject.imageUrl,
        spotifyUrl: selectedProject.spotifyUrl,
        youtubeUrl: selectedProject.youtubeUrl,
      });
      const updated = projectData.map((proj) =>
        proj.id === selectedProject.id ? selectedProject : proj
      );
      setProjectData(updated);
      setSelectedProject(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div>
      {selectedProject ? (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <Input
            type="text"
            placeholder="Artist"
            value={selectedProject.artist}
            onChange={(e) =>
              setSelectedProject({
                ...selectedProject,
                artist: e.target.value,
              })
            }
          />
          <Textarea
            placeholder="Bio"
            className="h-32"
            value={selectedProject.bio}
            onChange={(e) =>
              setSelectedProject({
                ...selectedProject,
                bio: e.target.value,
              })
            }
          />
          <Input
            type="text"
            placeholder="Homepage URL"
            value={selectedProject.homepageUrl || ""}
            onChange={(e) =>
              setSelectedProject({
                ...selectedProject,
                homepageUrl: e.target.value,
              })
            }
          />
          <Input
            type="text"
            placeholder="Spotify URL"
            value={selectedProject.spotifyUrl || ""}
            onChange={(e) =>
              setSelectedProject({
                ...selectedProject,
                spotifyUrl: e.target.value,
              })
            }
          />
          <Input
            type="text"
            placeholder="YouTube URL"
            value={selectedProject.youtubeUrl || ""}
            onChange={(e) =>
              setSelectedProject({
                ...selectedProject,
                youtubeUrl: e.target.value,
              })
            }
          />

          <div>
            {selectedProject.imageUrl && (
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.artist || "Project Image"}
                width={200}
                height={200}
                className="size-40 mb-2"
              />
            )}
            <ImageInput onChange={(file: File) => uploadImage(file)} />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleUpdate}>Save Changes</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedProject(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <ul>
          {projectData.map((project) => (
            <li key={project.id} className="py-2">
              <div>
                <Image
                  src={project.imageUrl ? project.imageUrl : "/placeholder.png"}
                  alt={project.artist || "Project Image"}
                  width={100}
                  height={100}
                  className="w-auto h-auto object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{project.artist}</h3>
                  <p className="whitespace-pre-line text-sm text-gray-600">
                    {project.bio}
                  </p>
                </div>
                {project.homepageUrl && (
                  <Link
                    href={project.homepageUrl}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Homepage
                  </Link>
                )}
              </div>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => setSelectedProject(project)}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
