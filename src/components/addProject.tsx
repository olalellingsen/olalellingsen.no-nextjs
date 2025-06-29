import { writeDocument } from "@/lib/fetchData";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Project } from "@/types/Project";
import { Textarea } from "./ui/textarea";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import ImageInput from "./ui/imageInput";

export default function AddProject() {
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    artist: "",
    bio: "",
    homepageUrl: "",
    imageUrl: "",
    spotifyUrl: "",
    youtubeUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async () => {
    if (!file) return null;

    const storageRef = ref(
      storage,
      `Project-Images/${Date.now()}-${file.name}`
    );
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      let imageUrl = newProject.imageUrl;

      if (file) {
        imageUrl = (await handleImageUpload()) ?? "";
      }

      await writeDocument("Projects-new", {
        ...newProject,
        imageUrl,
      });

      setNewProject({
        artist: "",
        bio: "",
        homepageUrl: "",
        imageUrl: "",
        spotifyUrl: "",
        youtubeUrl: "",
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add project.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNewProject({
      artist: "",
      bio: "",
      homepageUrl: "",
      imageUrl: "",
      spotifyUrl: "",
      youtubeUrl: "",
    });
    setFile(null);
    setError(null);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="text"
          placeholder="Artist"
          value={newProject.artist}
          onChange={(e) =>
            setNewProject({ ...newProject, artist: e.target.value })
          }
        />

        <Textarea
          placeholder="Bio"
          className="h-32"
          value={newProject.bio}
          onChange={(e) =>
            setNewProject({ ...newProject, bio: e.target.value })
          }
        />

        <ImageInput onChange={(file) => setFile(file)} />

        <Input
          type="text"
          placeholder="Homepage URL"
          value={newProject.homepageUrl}
          onChange={(e) =>
            setNewProject({ ...newProject, homepageUrl: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Spotify URL"
          value={newProject.spotifyUrl}
          onChange={(e) =>
            setNewProject({ ...newProject, spotifyUrl: e.target.value })
          }
        />

        <Input
          type="text"
          placeholder="YouTube URL"
          value={newProject.youtubeUrl}
          onChange={(e) =>
            setNewProject({ ...newProject, youtubeUrl: e.target.value })
          }
        />

        <div className="flex justify-between gap-2">
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Project"}
          </Button>
          <Button variant="outline" type="button" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
