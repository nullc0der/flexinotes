import CreateNote from "@/components/CreateNote";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Notes from "@/components/Notes";
// TODO: Add firebase login and storage

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Nav />
      <main className="container relative mx-auto">
        <CreateNote />
        <Notes />
      </main>
      <Footer />
    </div>
  );
}
