import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/home.jpg"
        alt="Next.js Logo"
        width={1800}
        height={600}
        priority
        className="w-full sm:w-lg mx-auto object-cover h-screen sm:h-max"
      />
    </div>
  );
}
