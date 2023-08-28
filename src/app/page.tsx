import CreateNote from "@/components/CreateNote";
import Nav from "@/components/Nav";
import Notes from "@/components/Notes";

export default function HomePage() {
  return (
    <div className="relative flex flex-col">
      <Nav />
      <main className="container relative mx-auto">
        <CreateNote />
        <Notes />
      </main>
    </div>
  );
}
