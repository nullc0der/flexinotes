import CreateNote from "@/components/CreateNote";
import Nav from "@/components/Nav";

export default function HomePage() {
  return (
    <div className="relative flex flex-col">
      <Nav />
      <main className="container relative mx-auto">
        <CreateNote />
      </main>
    </div>
  );
}
