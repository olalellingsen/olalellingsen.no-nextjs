import React from "react";

import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datePicker";
import { Button } from "@/components/ui/button";
import {
  fetchCollection,
  writeDocument,
  deleteDocument,
} from "@/lib/fetchData";
import { useEffect, useState } from "react";
import { Concert } from "@/types/Concert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";

export default function EditConcerts() {
  const [concertData, setConcertData] = useState<any[]>([]);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const concertData = await fetchCollection("Concerts");

      if (!concertData || concertData.length === 0) {
        console.error("No data found");

        return;
      }
      setConcertData(concertData);
    };
    loadData();
  }, []);

  async function handleDelete(concertId: string) {
    try {
      await deleteDocument("Concerts", concertId); // Delete from Firestore or your DB
      const updated = concertData.filter((concert) => concert.id !== concertId);
      setConcertData(updated);
      setSelectedConcert(null);
    } catch (error) {
      console.error("Failed to delete concert:", error);
    }
  }

  return (
    <div>
      {selectedConcert && (
        <form className="py-2">
          <Card className="bg-gray-100">
            <CardTitle>Edit Concert</CardTitle>

            <Input
              type="text"
              placeholder="Title"
              value={selectedConcert.band || ""}
              onChange={(e) =>
                setSelectedConcert({
                  ...selectedConcert,
                  band: e.target.value,
                })
              }
            />
            <DatePicker
              date={selectedConcert.date?.toDate?.() || selectedConcert.date}
              onChange={(newDate) => {
                if (!newDate) return;
                setSelectedConcert({ ...selectedConcert, date: newDate });
              }}
            />

            <Input
              type="text"
              placeholder="Time"
              value={selectedConcert.time || ""}
              onChange={(e) =>
                setSelectedConcert({
                  ...selectedConcert,
                  time: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Venue"
              value={selectedConcert.venue || ""}
              onChange={(e) =>
                setSelectedConcert({
                  ...selectedConcert,
                  venue: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Venue Link"
              value={selectedConcert.venueLink || ""}
              onChange={(e) =>
                setSelectedConcert({
                  ...selectedConcert,
                  venueLink: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Ticket Link"
              value={selectedConcert.ticketLink || ""}
              onChange={(e) =>
                setSelectedConcert({
                  ...selectedConcert,
                  ticketLink: e.target.value,
                })
              }
            />

            <Button
              onClick={async () => {
                await writeDocument(
                  "Concerts",
                  {
                    band: selectedConcert.band,
                    date: selectedConcert.date,
                    time: selectedConcert.time,
                    venue: selectedConcert.venue,
                    venueLink: selectedConcert.venueLink,
                    ticketLink: selectedConcert.ticketLink,
                  },
                  selectedConcert.id
                ); // Use the concert ID to update the existing document
                setSelectedConcert(null);
                // Reload updated data
                const updated = await fetchCollection("Concerts");
                setConcertData(updated);
              }}
            >
              Save
            </Button>
            <Button variant="outline" onClick={() => setSelectedConcert(null)}>
              Cancel
            </Button>
          </Card>
        </form>
      )}

      <ScrollArea className="h-[80vh] w-full py-2">
        <ul className="space-y-4">
          {concertData
            .filter((concert) => concert.date.toDate() >= new Date())
            .sort((a, b) => a.date - b.date)
            .map((concert) => (
              <li key={concert.id}>
                <Card className="relative">
                  <CardTitle>{concert.band}</CardTitle>
                  <CardContent>
                    <p>{concert.date.toDate().toLocaleDateString()}</p>
                    <p>{concert.venue}</p>
                    <p>{concert.time}</p>
                  </CardContent>
                  <CardAction className="flex gap-2">
                    <Button onClick={() => setSelectedConcert(concert)}>
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
                            Are you sure you want to delete this concert?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(concert.id)}
                          >
                            Delete Concert
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardAction>
                </Card>
              </li>
            ))}
          {concertData.length === 0 && <p>No concerts found</p>}
        </ul>
      </ScrollArea>
    </div>
  );
}
