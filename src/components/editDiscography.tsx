"use client";
import {
  deleteDocument,
  fetchCollection,
  updateDocument,
} from "@/lib/fetchData";
import { Album, Single } from "@/types/Discography";
import React, { useEffect, useState } from "react";
import SpotifyPlayer from "./spotifyPlayer";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function EditDiscography() {
  const [singles, setSingles] = useState<Single[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedSingle, setSelectedSingle] = useState<Single | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [showSingles, setShowSingles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const singleData = await fetchCollection("Singles");
      const albumData = await fetchCollection("Albums");

      setSingles(
        singleData
          .map((item: any) => ({
            id: item.id,
            releaseYear: item.releaseYear ?? "",
            spotify: item.spotify ?? "",
          }))
          .sort((a, b) => b.releaseYear - a.releaseYear)
      );
      setAlbums(
        albumData
          .map((item: any) => ({
            id: item.id,
            releaseYear: item.releaseYear ?? "",
            spotify: item.spotify ?? "",
          }))
          .sort((a, b) => b.releaseYear - a.releaseYear)
      );
    };

    loadData();
  }, []);

  const handleSubmitSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSingle || !selectedSingle) return;

    try {
      setLoading(true);
      await updateDocument("Singles", selectedSingle.id, {
        releaseYear: selectedSingle.releaseYear,
        spotify: selectedSingle.spotify,
      });
      setMessage("Single updated successfully.");
      setSelectedSingle(null);
    } catch (err) {
      console.error("Failed to update single:", err);
      setMessage("Failed to update single.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbum || !selectedAlbum.id) return;

    try {
      setLoading(true);
      await updateDocument("Albums", selectedAlbum.id, {
        releaseYear: selectedAlbum.releaseYear,
        spotify: selectedAlbum.spotify,
      });
      setMessage("Album updated successfully.");
      setSelectedAlbum(null);
    } catch (err) {
      console.error("Failed to update album:", err);
      setMessage("Failed to update album.");
    } finally {
      setLoading(false);
    }
  };

  async function handleDeleteSingle(id: string) {
    try {
      await deleteDocument("Singles", id); // Delete from Firestore or your DB
      const updated = singles.filter((single) => single.id !== id);
      setSingles(updated);
      setSelectedSingle(null);
    } catch (error) {
      console.error("Failed to delete single:", error);
    }
  }

  async function handleDeleteAlbum(id: string) {
    try {
      await deleteDocument("Albums", id); // Delete from Firestore or your DB
      const updated = albums.filter((album) => album.id !== id);
      setAlbums(updated);
      setSelectedAlbum(null);
    } catch (error) {
      console.error("Failed to delete album:", error);
    }
  }

  return (
    <div>
      <div className="text-center py-4">
        <Button onClick={() => setShowSingles(!showSingles)}>
          {showSingles ? "Show Albums" : "Show Singles"}
        </Button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>

      {selectedSingle && (
        <form onSubmit={handleSubmitSingle}>
          <Card className="p-4 space-y-2">
            <CardTitle>Edit Single</CardTitle>

            <Input
              value={selectedSingle.releaseYear}
              onChange={(e) =>
                setSelectedSingle({
                  ...selectedSingle,
                  releaseYear: parseInt(e.target.value, 10),
                })
              }
              type="number"
              placeholder="Release Year"
            />

            <Input
              value={selectedSingle.spotify}
              onChange={(e) =>
                setSelectedSingle({
                  ...selectedSingle,
                  spotify: e.target.value,
                })
              }
              placeholder="Spotify Link"
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setSelectedSingle(null)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </form>
      )}

      {selectedAlbum && (
        <form onSubmit={handleSubmitAlbum}>
          <Card className="p-4 space-y-2">
            <CardTitle>Edit Album</CardTitle>
            <Input
              value={selectedAlbum.releaseYear}
              onChange={(e) =>
                setSelectedAlbum({
                  ...selectedAlbum,
                  releaseYear: parseInt(e.target.value, 10),
                })
              }
              placeholder="Release Year"
              type="number"
            />
            <Input
              value={selectedAlbum.spotify}
              onChange={(e) =>
                setSelectedAlbum({ ...selectedAlbum, spotify: e.target.value })
              }
              placeholder="Spotify Link"
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setSelectedAlbum(null)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </form>
      )}

      <ul className="grid gap-4 mt-6">
        {showSingles
          ? singles.map((single) => (
              <li key={single.id} className="pb-4 border-b">
                <SpotifyPlayer height={80} link={single.spotify} />
                <div className="flex gap-2 pt-2">
                  <Button onClick={() => setSelectedSingle(single)}>
                    Edit
                  </Button>

                  {/* AlertDialog for delete confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this album?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteSingle(single.id)}
                        >
                          Delete single
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))
          : albums.map((album) => (
              <li key={album.id} className="pb-4 border-b">
                <SpotifyPlayer height={160} link={album.spotify} />
                <div className="flex gap-2 pt-2">
                  <Button onClick={() => setSelectedAlbum(album)}>Edit</Button>
                  {/* AlertDialog for delete confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this album?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteAlbum(album.id)}
                        >
                          Delete album
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
}
