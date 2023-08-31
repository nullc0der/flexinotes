import CreateNote from "@/components/CreateNote";
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
      <footer className="absolute bottom-0 flex h-16 w-full items-center justify-center">
        <p>
          Made with <i className="text-red-600">♥</i> by{" "}
          <a href="https://github.com/nullc0der" className="underline">
            Prasanta Kakati
          </a>
        </p>
      </footer>
    </div>
  );
}
