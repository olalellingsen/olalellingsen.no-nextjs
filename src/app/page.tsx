import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Image
        src="/home.jpg"
        alt="Next.js Logo"
        width={500}
        height={500}
        priority
      />
    </div>
  );
}
