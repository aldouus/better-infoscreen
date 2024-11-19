import { Header } from "@/components/header";
import { LectureList } from "@/components/lectures-list";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 sm:p-6 p-3 flex flex-col">
      <Header />
      <LectureList />
      <Footer />
    </main>
  );
}
