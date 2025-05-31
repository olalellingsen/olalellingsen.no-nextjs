"use client";
import { writeDocument } from "@/lib/fetchData";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Single, Album } from "@/types/Discography";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AddAlbumSingle() {
  const [isSingle, setIsSingle] = useState(false);

  const [newSingle, setNewSingle] = useState<
    Omit<Single, "id"> & { releaseYear: number }
  >({
    releaseYear: new Date().getFullYear(),
    spotify: "",
  });
  const [newAlbum, setNewAlbum] = useState<
    Omit<Album, "id"> & { releaseYear: number }
  >({
    releaseYear: new Date().getFullYear(),
    spotify: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (isSingle) {
      const formattedSingle = {
        ...newSingle,
        spotify: newSingle.spotify.replace(
          "open.spotify.com/",
          "open.spotify.com/embed/"
        ),
      };

      try {
        await writeDocument("Singles", formattedSingle);
        setNewSingle({
          ...formattedSingle,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to add single.");
      } finally {
        setLoading(false);
      }
    } else {
      const formattedAlbum = {
        ...newAlbum,
        spotify: newAlbum.spotify.replace(
          "open.spotify.com/",
          "open.spotify.com/embed/"
        ),
      };

      try {
        await writeDocument("Albums", formattedAlbum);
        setNewAlbum({
          ...formattedAlbum,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to add album.");
      } finally {
        setLoading(false);
      }
    }
    handleReset();
  };

  const handleReset = () => {
    setNewSingle({
      releaseYear: new Date().getFullYear(),
      spotify: "",
    });

    setNewAlbum({
      releaseYear: new Date().getFullYear(),
      spotify: "",
    });

    setError(null);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <Card>
          <div className="flex items-center space-x-2">
            <Switch onClick={() => setIsSingle(!isSingle)} />
            <Label>Add single</Label>
          </div>

          <Input
            type="number"
            placeholder="Release Year"
            value={isSingle ? newSingle.releaseYear : newAlbum.releaseYear}
            onChange={(e) =>
              isSingle
                ? setNewSingle({
                    ...newSingle,
                    releaseYear: parseInt(e.target.value, 10),
                  })
                : setNewAlbum({
                    ...newAlbum,
                    releaseYear: parseInt(e.target.value, 10),
                  })
            }
          />
          <Input
            type="text"
            placeholder="Spotify Link"
            value={isSingle ? newSingle.spotify : newAlbum.spotify}
            onChange={(e) =>
              isSingle
                ? setNewSingle({
                    ...newSingle,
                    spotify: e.target.value,
                  })
                : setNewAlbum({
                    ...newAlbum,
                    spotify: e.target.value,
                  })
            }
          />

          <div className="flex justify-between gap-2">
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Adding..." : isSingle ? "Add Single" : "Add Album"}
            </Button>
            <Button variant="outline" type="button" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </Card>
      </form>
    </div>
  );
}
