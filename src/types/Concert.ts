import { Timestamp } from "firebase/firestore";

export type Concert = {
  id: string;
  band: string;
  date: Timestamp;
  time: string;
  venue: string;
  venueLink: string;
  description?: string;
  imageUrl?: string;
  ticketLink: string;
};
