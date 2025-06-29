"use client";

import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { fetchCollection } from "@/lib/fetchData";
import React, { Suspense, useEffect, useState } from "react";

export default function Concerts() {
  const [concertData, setConcertData] = useState<any[]>([]);

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

  return (
    <section>
      <h1>Upcoming concerts</h1>

      <ul className="space-y-4">
        {concertData
          .filter((concert) => concert.date.toDate() >= new Date())
          .sort((a, b) => a.date - b.date)
          .map((concert) => (
            <li key={concert.id}>
              <Card>
                <CardTitle>{concert.band}</CardTitle>
                <CardContent>
                  <p>{concert.date.toDate().toLocaleDateString()}</p>
                  <p>{concert.venue}</p>
                  <p>{concert.time}</p>
                </CardContent>
              </Card>
            </li>
          ))}
      </ul>

      {concertData.length === 0 && <p>Loading concerts...</p>}
    </section>
  );
}
