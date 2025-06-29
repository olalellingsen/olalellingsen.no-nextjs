import React from "react";
import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full p-4 mt-4">
      <ul className="flex justify-center items-center space-x-4 mb-4 *:hover:scale-105">
        <li>
          <Link href="mailto:ola.l.ellingsen@gmail.com">
            <Mail className="inline stroke-1 mr-2" />
          </Link>
        </li>
        <li>
          <Link href="phone:+4790197381">
            <Phone className="inline stroke-1 mr-2" />
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/olalellingsen/" target="_blank">
            <Instagram className="inline stroke-1 mr-2" />
          </Link>
        </li>
      </ul>

      <p className="text-center text-muted-foreground">
        © {new Date().getFullYear()} Ola Lømo Ellingsen
      </p>
    </footer>
  );
}
