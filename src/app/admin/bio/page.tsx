"use client";

import { Textarea } from "@/components/ui/textarea";
import { fetchDocument, writeDocument } from "@/lib/fetchData";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import withAuthRedirect from "@/components/withAuthRedirect";

function BioPage() {
  const [bio, setBio] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBio = async () => {
      try {
        setLoading(true);
        const response = await fetchDocument("About", "Bio");

        const bioText = (response as any)?.Bio;

        if (bioText) {
          setBio(bioText);
        } else {
          setError("Bio not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load bio.");
      } finally {
        setLoading(false);
      }
    };

    loadBio();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await writeDocument("About", { Bio: bio }, "Bio");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to save bio.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href={"/admin"}>
        <Button className="my-2" variant="outline">
          <ArrowLeft />
        </Button>
      </Link>
      <Textarea
        value={bio || ""}
        onChange={(e) => setBio(e.target.value)}
        className="min-h-[40vh]"
        disabled={loading}
      />
      <div className="flex justify-center py-2">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Bio"}
        </Button>
      </div>
    </div>
  );
}

export default withAuthRedirect(BioPage);
