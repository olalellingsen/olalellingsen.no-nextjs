import { writeDocument } from "@/lib/fetchData";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import { Concert } from "@/types/Concert";
import { Timestamp } from "firebase/firestore";

export default function AddConcert() {
  const [newConcert, setNewConcert] = useState<
    Omit<Concert, "id" | "date"> & { date: Date }
  >({
    band: "",
    date: new Date(),
    time: "",
    venue: "",
    venueLink: "",
    ticketLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await writeDocument("Concerts", {
        ...newConcert,
        date: Timestamp.fromDate(newConcert.date),
      });
      setNewConcert({
        band: "",
        date: new Date(),
        time: "",
        venue: "",
        venueLink: "",
        ticketLink: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add concert.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNewConcert({
      band: "",
      date: new Date(),
      time: "",
      venue: "",
      venueLink: "",
      ticketLink: "",
    });
    setError(null);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <Card>
          <Input
            type="text"
            placeholder="Title / band name"
            value={newConcert.band}
            onChange={(e) =>
              setNewConcert({ ...newConcert, band: e.target.value })
            }
          />

          <div className="*:w-full grid sm:grid-cols-2 gap-5">
            <DatePicker
              date={newConcert.date}
              onChange={(date) => {
                if (date) {
                  // If date is a Firestore Timestamp, convert to JS Date
                  const jsDate =
                    typeof (date as any).toDate === "function"
                      ? (date as any).toDate()
                      : date;
                  setNewConcert({ ...newConcert, date: jsDate });
                }
              }}
            />

            <Input
              type="text"
              placeholder="Time (00:00 / TBA)"
              value={newConcert.time}
              onChange={(e) =>
                setNewConcert({ ...newConcert, time: e.target.value })
              }
            />
          </div>

          <Input
            type="text"
            placeholder="Venue"
            value={newConcert.venue}
            onChange={(e) =>
              setNewConcert({ ...newConcert, venue: e.target.value })
            }
          />

          <Input
            type="text"
            placeholder="Link to Google Maps"
            value={newConcert.venueLink}
            onChange={(e) =>
              setNewConcert({ ...newConcert, venueLink: e.target.value })
            }
          />

          <Input
            type="text"
            placeholder="Ticket Link"
            value={newConcert.ticketLink}
            onChange={(e) =>
              setNewConcert({ ...newConcert, ticketLink: e.target.value })
            }
          />

          <div className="flex justify-between gap-2">
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Adding..." : "Add Concert"}
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
