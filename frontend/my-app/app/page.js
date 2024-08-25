import PhotoUploader from "@/components/photoUploader";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      <PhotoUploader/>
    </main>
  );
}
