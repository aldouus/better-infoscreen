import { Header } from "@/components/header";
import { LectureList } from "@/components/lectures-list";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 sm:p-6 p-3">
      <Header />
      <LectureList />
    </main>
  );
}
